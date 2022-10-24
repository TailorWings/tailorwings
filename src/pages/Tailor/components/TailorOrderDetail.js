import { Fragment, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import ListLoader from '../../../components/ComponentLoader';
import TailorRoundTag from '../../../components/Tag/TailorRoundTag';
import TailorSquareTag from '../../../components/Tag/TailorSquareTag';
import { FABRIC_BUY_TYPES, FABRIC_TYPES, ONLINE_MEASUREMENTS } from '../../../constants';
import TailorHeader from './TailorHeader';
import Flickity from 'react-flickity-component';
import TextInput from '../../../components/Input/TextInput';
import MaterialAlert from '../../../components/MaterialAlert';
import { fetchCondition, findOne, updateDocument } from '../../../services/API/firebaseAPI';
import { finalPriceCalc } from '../../../services/Functions/commonFunctions';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { MEASUREMENT_UNIT_MAP } from '../../Measurement/constants/measurement';

function TailorOrderDetail() {
	/*------------------------------*/
	const BUFFER_TIME = 3; // days
	const { params } = useRouteMatch();
	const { search } = useLocation();
	const type = queryString.parse(search)?.t;
	const history = useHistory();
	/*------------------------------*/
	const tailorState = useSelector((state) => state.tailor);
	
	const [currentCustomer, setCurrentCustomer] = useState(null);
	const [bodyMeasurement, setBodyMeasurement] = useState(null);
	const [currentOrder, setCurrentOrder] = useState(null);
	const [currentOffer, setCurrentOffer] = useState({
		duration: '',
		wage: '',
		fabricNumber: '',
	});
	const [currentOfferError, setCurrentOfferError] = useState({});
	const [offerAlready, setOfferAlready] = useState(true);
	const [alertOpen, setAlertOpen] = useState(false);
	const {t} = useTranslation();
	
	/*------------------------------*/
	const sliderRef = useRef();
	/*------------------------------*/
	useEffect(() => {
		async function fetchCustomerDetail() {
			let customer = await findOne('customers', 'email', '==', currentOrder.customer.email);
			console.assert(customer != null, "customer must not be null");
			setCurrentCustomer(customer);
			const bodyMeasurement = currentOrder.rqmt.bodyMeasurement || getCustomerBodyMeasurement(customer);
			setBodyMeasurement(bodyMeasurement);
		}
		if (currentOrder) {
			fetchCustomerDetail();
		}
	}, [currentOrder]);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	/*------------------------------*/
	useEffect(() => {
		if (type && params?.orderID) {
			let order = null;
			switch (type) {
				case 'f':
					order = tailorState?.findingOrders.find((order) => order.id === params.orderID);
					order && setCurrentOrder(order);
					break;

				case 't':
					order = tailorState?.pickedOrders.find((order) => order.id === params.orderID);
					order && setCurrentOrder(order);
					break;

				case 'd':
					order = tailorState?.pickedOrders.find((order) => order.id === params.orderID);
					order && setCurrentOrder(order);
					break;

				default:
					break;
			}
		}
	}, [params, type]);
	useEffect(() => {
		let currentOffer = currentOrder?.offers?.find(
			(offer) => offer?.tailor?.id === tailorState?.tailor?.id
		);
		if (currentOffer) {
			setCurrentOffer(currentOffer);
			setOfferAlready(true);
		} else {
			setOfferAlready(false);
		}
	}, [currentOrder?.offers]);
	/*------------------------------*/
	function onInputChange(e) {
		let id = e.target.id;
		let value = e.target.value;
		/*------------------------------*/
		setCurrentOffer({ ...currentOffer, [id]: value });
	}
	function formCheck() {
		let errorObj = {};
		for (const key in currentOffer) {
			const offer = currentOffer[key];
			if (!offer) {
				errorObj[key] = 'Vui lòng không để trống!';
			} else if (isNaN(offer)) {
				errorObj[key] = 'Vui lòng nhập chữ số (vd: 1, 2, 1.5,...)';
			}
		}
		setCurrentOfferError(errorObj);
		return errorObj;
	}
	function onOffer() {
		let errorObj = formCheck();
		if (Object.keys(errorObj).length === 0) {
			const { avatar, id, nickName, stars } = tailorState.tailor;
			let newOffer = {
				...currentOffer,
				picked: false,
				tailor: {
					avatar,
					id,
					name: nickName,
					stars,
				},
			};
			/*------------------------------*/
			let price = handlePriceCalc(newOffer);
			if (!isNaN(price)) {
				newOffer.price = price;
			}
			/*------------------------------*/
			newOffer.customerDisplayDuration = Number(newOffer.duration) + BUFFER_TIME;

			let newOffers = currentOrder?.offers ? [...currentOrder?.offers, newOffer] : [newOffer];
			if (newOffers) {
				updateDocument('tailorOrders', currentOrder.id, 'offers', newOffers)
					.then(() => {
						/*---------*/
						sendMail();
						/*---------*/
						setAlertOpen(true);
						history.goBack();
					})
					.catch((error) => {});
			}
		}
	}
	function adjustOffer() {
		let adjustOffers = JSON.parse(JSON.stringify(currentOrder.offers));
		let adjustOfferIndex = adjustOffers.findIndex(
			(offer) => offer?.tailor?.id === currentOffer?.tailor?.id
		);
		let adjustOffer = adjustOffers.find((offer) => offer?.tailor?.id === currentOffer?.tailor?.id);
		adjustOffer = { ...currentOffer };
		/*------------------------------*/
		let price = handlePriceCalc(adjustOffer);
		if (!isNaN(price)) {
			adjustOffer.price = price;
		}
		/*------------------------------*/
		if (JSON.stringify(adjustOffer) !== JSON.stringify(adjustOffers[adjustOfferIndex])) {
			adjustOffer.customerDisplayDuration = Number(adjustOffer.duration) + BUFFER_TIME;
			if (adjustOffers) {
				adjustOffers[adjustOfferIndex] = { ...adjustOffer };
			} else {
				adjustOffers = [{ ...adjustOffer }];
			}
			updateDocument('tailorOrders', currentOrder.id, 'offers', adjustOffers)
				.then(() => {
					setAlertOpen(true);
					history.goBack();
				})
				.catch((error) => {});
		}
	}
	function handlePriceCalc(offer) {
		const { rqmt } = currentOrder;
		let wage = Number(offer?.wage) || 0;
		let fabricNumber = Number(offer?.fabricNumber) || 0;
		let customerHasFabric = rqmt?.fabric?.fabricBuyType === FABRIC_BUY_TYPES[1].id; // MY_OWN
		let fabricPrice = 0;
		if (rqmt?.fabric?.fabricBuyType === FABRIC_BUY_TYPES[2].id) {
			fabricPrice = 150000;
		} else if (rqmt.fabric.price != null) {
			fabricPrice = Number(rqmt.fabric.price);
		}
		return finalPriceCalc(wage, fabricPrice, fabricNumber, customerHasFabric);
	}
	function sendMail() {
		const { id, name, email } = currentOrder.customer;
		if (email) {
			emailjs
				.send(
					'service_gmail',
					'template_new_offer',
					{ cusName: name || id || '', email: email },
					'user_v3OrYsKqdHUnLHpgB4CgD'
				)
				.then(
					(result) => {
						console.log(result.text);
					},
					(error) => {
						console.log(error.text);
					}
				);
		} else {
			emailjs
				.send(
					'service_gmail',
					'template_new_offer',
					{ cusName: name || id || '', email: 'cham@tailorwings.com' },
					'user_v3OrYsKqdHUnLHpgB4CgD'
				)
				.then(
					(result) => {
						console.log(result.text);
					},
					(error) => {
						console.log(error.text);
					}
				);
		}
	}
	function getCustomerBodyMeasurement(customer) {
		// bodyMetric renamed to bodyMeasurement
        return customer.bodyMeasurement || customer.bodyMetric;
    }
	/*------------------------------*/
	if (!currentOrder) return <ListLoader />;
	const { customer, rqmt } = currentOrder;
	let fabricType = FABRIC_TYPES.find((type) => type.id === rqmt.fabric.type);
	let msmtArray = rqmt?.designStyle
		? ONLINE_MEASUREMENTS.find((msmt) => msmt.style === rqmt.designStyle)
		: null;
	msmtArray =
		msmtArray && rqmt?.msmt
			? msmtArray.msmts.map((elem) => {
					return { ...elem, value: rqmt.msmt[elem.id] };
			  })
			: null;
	let notes = rqmt?.notes ? rqmt.notes.filter((note) => note) : [];
	const productMeasurement = rqmt.productMeasurement || rqmt.msmt; // replace msmt by productMeasurement
	

	let photoNoteCount = 0;
	rqmt.sideDesignFiles?.forEach(d => photoNoteCount = photoNoteCount + (d.photoNotes?.length ?? 0));
	/*------------------------------*/
	return (
		<div className="tailor-order-detail">
			<TailorHeader title="Chi tiết đơn may" />
			<div className="tailor-order-detail__slider" ref={sliderRef}>
				<Flickity
					className={'flickity-carousel'} // default ''
					elementType={'div'} // default 'div'
					options={{
						wrapAround: false,
						prevNextButtons: true,
						pageDots: false,
						freeScroll: false,
						initialIndex: Math.min(3, photoNoteCount/2),
					}} // takes flickity options {}
					disableImagesLoaded={false} // default false
					reloadOnUpdate // default false
					static // default false
				>
					{
					rqmt.designFiles?.length > 0 ? rqmt.designFiles?.map((file, i) => {
						return (
							<img
								className="-image"
								src={file}
								data-flickity-lazyload={file}
								alt="design"
								key={i}
							/>
						);
					})
					: 
					rqmt.sideDesignFiles?.length > 0?
					rqmt.sideDesignFiles.map(
						d => d.photoNotes.map(
							(p, i) => <div key={i} className='design-item'>
								<span>{d.side}</span>
								<img
									className="-image"
									src={p.downloadUrl}
									data-flickity-lazyload={p.downloadUrl}
									alt="design"
									key={i}
								/>
								<div style={{'marginTop': '8px'}}>Note:</div>
								<textarea rows={5} disabled={true} defaultValue={p.note}>
								</textarea>
							</div>
						)
					).flat()
						:<Fragment/>
				
				}


				</Flickity>
			</div>
			<div className="tailor-order-detail__wrapper">
				<div className="tailor-order-detail__design">
					<p>{customer.name}</p>
					<div className="-wrapper">
						{fabricType ? <TailorRoundTag text={fabricType?.name || ''} /> : <Fragment />}
						{rqmt?.designStyle ? <TailorRoundTag text={rqmt?.designStyle} /> : <Fragment />}
					</div>
				</div>
				<div className="tailor-order-detail__fabric">
					<p className="tailor-order-detail__title">Thông tin vải</p>
					<div className="-wrapper">
						{fabricType && (
							<div className="fabric-type">
								<img src={fabricType?.image || ''} alt="fabric-type" />

								<div className="-overlay"></div>
								<span>{fabricType?.name || ''}</span>
							</div>
						)}
						{rqmt?.fabric?.pattern?.image?.normal && (
							<div className="fabric-pattern">
								<img src={rqmt?.fabric?.pattern?.image?.normal} alt="fabric-pattern" />
							</div>
						)}
						{!rqmt?.fabric?.pattern && <p>Vải được cung cấp bởi khách hàng</p>}
					</div>
				</div>
				{
					rqmt?.stdSize ?
					<div className="tailor-order-detail__msmt">
						<p className="tailor-order-detail__title">Số đo khách hàng</p>
						<div style={{ width: '120px' }}>
							<TailorRoundTag text={rqmt?.stdSize || ''} />
						</div>
					</div>
					:
					(
						<Fragment>
							{
							bodyMeasurement ? 
							<div className="tailor-order-detail__msmt">
								<p className="tailor-order-detail__title">Số đo cơ thể khách hàng</p>
								<div className="-list">
									{Object.keys(bodyMeasurement).map((msmt) => {
											return (
												<div className="-item" key={msmt}>
													<TailorSquareTag title={t(msmt)} value={`${bodyMeasurement[msmt]} ${MEASUREMENT_UNIT_MAP[msmt] ?? 'cm'}`} />
												</div>
											);
										})}
								</div>
							</div> : <Fragment/>
							}
							{
							productMeasurement ?
								<div className="tailor-order-detail__msmt">
									<p className="tailor-order-detail__title">Số đo sản phẩm khách hàng</p>
									<div className="-list">
											{Object.keys(productMeasurement).map((msmt) => {
													return (
														<div className="-item" key={msmt}>
															<TailorSquareTag title={t(msmt)} value={`${productMeasurement[msmt]} ${MEASUREMENT_UNIT_MAP[msmt] ?? 'cm'}`} />
														</div>
													);
												})}
									</div>
								</div>
								: <Fragment/>
							}

						</Fragment>
						
						
					)


					
				}
				
				
				<div className="tailor-order-detail__notes">
					<p className="tailor-order-detail__title">Ghi chú từ khách hàng</p>
					{notes.length > 0 ? (
						rqmt.notes.map((note, i) => {
							return (
								<div key={i} className="-note">
									<TailorSquareTag title={`Ghi chú ${i + 1}`} value={note} isActive titleVN={rqmt.notesVN && rqmt.notesVN[i]}/>
								</div>
							);
						})
					) : (
						<p>Không có ghi chú từ khách hàng</p>
					)}
				</div>
				{type === 'f' && (
					<div className={`tailor-order-detail__form ${offerAlready ? 'disabled' : ''}`}>
						<p className="tailor-order-detail__title">Báo giá đơn may</p>
						<TextInput
							value={currentOffer.duration || ''}
							errors={currentOfferError.duration || ''}
							label="Thời gian may"
							suffix="Ngày"
							id="duration"
							onChange={onInputChange}
						/>
						<TextInput
							value={currentOffer.wage || ''}
							errors={currentOfferError.wage || ''}
							label="Giá may"
							suffix="Đồng"
							id="wage"
							onChange={onInputChange}
						/>
						<TextInput
							value={currentOffer.fabricNumber || ''}
							errors={currentOfferError.fabricNumber || ''}
							label="Lượng vải cần"
							suffix="Mét"
							id="fabricNumber"
							onChange={onInputChange}
						/>
						<div className="-btn" onClick={offerAlready ? adjustOffer : onOffer}>
							<span>{offerAlready ? 'Cập nhật' : 'Báo giá'}</span>
						</div>
					</div>
				)}
			</div>
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content="Báo giá thành công!"
				serverity="success"
			/>
		</div>
	);
}

export default TailorOrderDetail;
