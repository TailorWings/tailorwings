import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Accordion from '../../../components/Accordion';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton2 from '../../../components/Button/SmallButton2';
import ComponentLoader from '../../../components/ComponentLoader';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import RqmtNoteForm from '../../../components/Form/RqmtNoteForm';
import ShippingForm from '../../../components/Form/ShippingForm';
import MaterialAlert from '../../../components/MaterialAlert';
import PageLoader from '../../../components/PageLoader';
import PaymentInfo from '../../../components/PaymentInfo';
import Picker from '../../../components/Picker';
import RequirementSummary from '../../../components/RequirementSummary';
import { ONLINE_MEASUREMENTS, SHIPPING_INFO, STANDARD_SIZES } from '../../../constants';
import { fetchCondition, setDocument, updateDocument } from '../../../services/API/firebaseAPI';
import TailorOffer from './TailorOffer';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { modifyPrice } from '../../../services/Functions/commonFunctions';

OrderDetail.propTypes = {
	orderList: PropTypes.array,
	onPopupStatusChange: PropTypes.func,
};

OrderDetail.defaultProps = {
	orderList: null,
	onPopupStatusChange: null,
};

function OrderDetail(props) {
	const { orderList, onPopupStatusChange } = props;
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const { t, i18n } = useTranslation();
	/*--------------*/
	const history = useHistory();
	const location = useLocation();
	const orderID = queryString.parse(location.search);
	const [currentOrderDetail, setCurrentOrderDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return { name: size, active: false };
		})
	);
	const [shippingInfo, setShippingInfo] = useState(
		SHIPPING_INFO.map((info) => {
			return info;
		})
	);
	const [offers, setOffers] = useState([]);
	const [tailorOrder, setTailorOrder] = useState(null);
	const [alertOpen, setAlertOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [isPageLoad, setIsPageLoad] = useState(false);
	const [pickedOffer, setPickedOffer] = useState(null);
	/*--------------*/
	const alertUser = (e) => {
		e.preventDefault();
		e.returnValue = '';
	};
	useEffect(() => {
		window.addEventListener('beforeunload', alertUser);
		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, []);
	useEffect(() => {
		/*--------------*/
		let myTimeout = setTimeout(() => {
			setLoading(false);
		}, 500);
		/*--------------*/
		return () => {
			clearTimeout(myTimeout);
		};
	}, []);
	/*--------------*/
	useEffect(() => {
		if (orderList) {
			let newOrderDetail = {
				...orderList.find((order) => {
					return order.id.toString() === orderID.id.toString();
				}),
			};
			if (newOrderDetail) {
				if (newOrderDetail.status !== 'finding') {
					newOrderDetail.offer =
						newOrderDetail?.offer?.find((offer) => {
							return offer.picked;
						}) || null;
				}
				/*--------------*/
				let msmtOfStyle = ONLINE_MEASUREMENTS.find(
					(msmtInfo) => msmtInfo.style === newOrderDetail.designStyle
				);
				if (newOrderDetail.msmt) {
					let modifiedMsmt = msmtOfStyle
						? msmtOfStyle.msmts.map((msmtInfo) => {
								return {
									...msmtInfo,
									value:
										newOrderDetail.msmt[msmtInfo.id] ||
										// newOrderDetail.msmt.find((elem) => elem.id === msmtInfo.id)?.value ||
										'',
								};
						  })
						: [];
					newOrderDetail.msmt = [...modifiedMsmt];
				}
				/*--------------*/
				if (newOrderDetail.stdSize) {
					setStandardSizes(
						standardSizes.map((size) => {
							return { ...size, active: size.name === newOrderDetail.stdSize };
						})
					);
				}
				/*--------------*/
			}
			newOrderDetail && setCurrentOrderDetail(newOrderDetail);
			/*--------------*/
		}
	}, [orderID.id, orderList]);

	useEffect(() => {
		if (currentCustomer?.shippingInfo) {
			setShippingInfo(currentCustomer.shippingInfo);
		}
	}, [currentCustomer]);

	useEffect(() => {
		async function fetchOffers() {
			try {
				let tailorOrder = await fetchCondition('tailorOrders', 'orderID', '==', orderID.id);
				console.log(`tailorOrder`, tailorOrder)
				if (tailorOrder?.length === 1) {
					setOffers(tailorOrder[0]?.offers || []);
					setTailorOrder(tailorOrder[0]);
				}
			} catch (error) {}
		}
		if (orderID?.id) {
			fetchOffers();
		}
	}, [orderID?.id]);

	// if (!orderList || !currentOrderDetail)
	// 	return (
	// 		<div className="c-order-detail">
	// 			<div className="c-order-detail__header">
	// 				<Link to="/account">
	// 					<MediumButton text="back" />
	// 				</Link>
	// 				<p className="c-order-detail__title">Order Detail</p>
	// 			</div>
	// 		</div>
	// 	);
	/*--------------*/
	/*********************************
	 *  Description: handle tailor picked
	 */
	function onOfferPicked(pickedIndex) {
		// let updatedOffers = currentOrderDetail.offers.map((order, index) => {
		// 	return { ...order, picked: index === pickedIndex };
		// });
		// if (updatedOffers) {
		// 	setCurrentOrderDetail({ ...currentOrderDetail, offers: [...updatedOffers] });
		// }
		setPickedOffer(offers[pickedIndex]);
		let updatedOffers = offers?.map((offer, index) => {
			return { ...offer, picked: index === pickedIndex };
		});


		if (updatedOffers.length > 0) {
			setOffers(updatedOffers);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle shipping info change
	 */
	function handleShippingInfoChange(id, e) {
		let value = e.target.value;
		let updatedShippingInfo = shippingInfo.map((info) => {
			return { ...info, value: id === info.id ? value : info.value };
		});
		setShippingInfo(updatedShippingInfo);
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle order confirm
	 */
	function handleOrderConfirm() {
		// let offerVerify = !!currentOrderDetail.offers.find((offer) => offer.picked);
		let offerVerify = !!offers?.find((offer) => offer.picked);
		if (offerVerify && shippingInfo[0].value && shippingInfo[1].value && shippingInfo[2].value) {
			setLoading(true);
			/*------------------------------*/
			let updatedCustomer = {
				...currentCustomer,
				shippingInfo,
				orders: currentCustomer.orders.map((order) => {
					if (order.id === currentOrderDetail.id) {
						return {
							...currentOrderDetail,
							shippingInfo,
							status: 'tailoring',
							offers: [...offers],
						};
					} else {
						return { ...order };
					}
				}),
			};
			/*------------------------------*/
			if (updatedCustomer) {
				setDocument('customers', updatedCustomer, updatedCustomer.id);
			}
			/*------------------------------*/
			let updatedTailorOrder = tailorOrder && JSON.parse(JSON.stringify(tailorOrder));
			if (updatedTailorOrder) {
				updatedTailorOrder.pickedTailor = offers?.find((offer) => offer.picked)?.tailor?.id || null;
				updatedTailorOrder.status = 'tailoring';
				updatedTailorOrder.offers = [...offers];

				setDocument('tailorOrders', updatedTailorOrder, updatedTailorOrder.id)
					.then(() => {
						setLoading(false);
						onPopupStatusChange && onPopupStatusChange(true);
					})
					.catch((error) => {
						setLoading(false);
					});
			}
			/*------------------------------*/
		} else {
			setAlertOpen(true);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle order delete
	 */
	function handleOrderDelete() {
		setIsPageLoad(true);
		let updatedCustomerData = { ...currentCustomer };
		let updatedOrders = updatedCustomerData.orders.filter(
			(order) => order.id !== currentOrderDetail.id
		);
		if (updatedOrders) {
			updatedCustomerData.orders = [...updatedOrders];
			updateDocument('customers', updatedCustomerData.id, 'orders', updatedCustomerData.orders)
				.then(() => {
					setIsPageLoad(false);
					history.push('/account/order');
				})
				.catch(() => {
					setIsPageLoad(false);
				});
		}
	}
	/************_END_****************/

	if (isPageLoad) return <PageLoader />;
	/*--------------*/
	if (loading || !orderList)
		return (
			<div className="c-order-detail">
				<ComponentLoader />
			</div>
		);
	/*--------------*/
	if (!currentOrderDetail) {
		return <Redirect to="/account" />;
	}
	const { designFiles, designStyle, fabric, msmt, notes, status } = currentOrderDetail;
	console.log('offers :>> ', offers);
	return (
		<div className="c-order-detail">
			<div className="c-order-detail__header">
				<Link to="/account">
					<MediumButton text={t('account.viewAllOrders')} />
				</Link>
				<p className="c-order-detail__title">{t('account.orderDetail')}</p>
			</div>
			<div className="c-order-detail__offer">
				<TailorOffer
					// offerInfo={
					// 	currentOrderDetail?.status !== 'finding'
					// 		? currentOrderDetail?.offers?.filter((elem) => elem.picked)
					// 		: currentOrderDetail?.offers
					// }
					offerInfo={
						currentOrderDetail?.status !== 'finding'
							? offers?.filter((elem) => elem.picked)
							: offers
					}
					onTailorPick={status === 'finding' ? onOfferPicked : null}
				/>
			</div>
			{pickedOffer && <div className="c-order-detail-bill">
				<div className="c-order-detail-bill__item">
					<span>Price</span>
					<span>{modifyPrice(pickedOffer.price)} vnd</span>
				</div>
				<div className="c-order-detail-bill__item">
					<span>Shipping fee</span>
					<span>{modifyPrice(20000)} vnd</span>
				</div>
				<div className="c-order-detail-bill__item">
					<span>Total</span>
					<span>{modifyPrice(pickedOffer.price + 20000)} vnd</span>
				</div>
				<div className="c-order-detail-bill__item">
					<span>Payment method</span>
					<span>COD</span>
				</div>
				<div className="c-order-detail-bill__item">
					<span>Estimated Delivery Date</span>
					<span>{Number(pickedOffer.duration) + 3} days</span>
				</div>
			</div>}
			<div className="c-order-detail-summary">
				<Accordion title={t('account.summary')} isActive={false}>
					<div className="c-order-detail-summary__rqmt">
						<RequirementSummary
							designFiles={designFiles || null}
							designStyle={designStyle || null}
							fabricPattern={fabric?.pattern || null}
							fabricType={fabric?.type || null}
						/>
					</div>
					<div className="c-order-detail-summary__msmt">
						{msmt ? (
							<MeasurementForm measurements={msmt} title="Your Measurements" disabled />
						) : (
							<Picker list={standardSizes} />
						)}
					</div>
					<div className="c-order-detail-summary__note">
						<p className="c-order-detail-summary__note-title">{t('account.requirementNote')}</p>
						<RqmtNoteForm notes={notes} />
					</div>
				</Accordion>
			</div>
			<div className="c-order-detail-shipping-info">
				<Accordion title={t('account.shippingInformation')} isActive={false}>
					<div className="c-order-detail-shipping-info__form">
						<ShippingForm
							shippingInfo={shippingInfo}
							onInputChange={handleShippingInfoChange}
							disabled={currentOrderDetail.status !== 'finding'}
						/>
					</div>
					<div className="c-order-detail-shipping-info__payment">
						<PaymentInfo buttonText="Choose" />
					</div>
				</Accordion>
			</div>
			{currentOrderDetail.status === 'finding' && (
				<div className="c-order-detail__button">
					<div className="-wrapper" onClick={() => setDeleteOpen(true)}>
						<MediumButton text={t('delete')} />
					</div>
					{offers?.find((offer) => offer.picked) ? (
						<div className="-wrapper" onClick={handleOrderConfirm}>
							<MediumButton text={t('account.placeOrder')} isActive />
						</div>
					) : (
						<div className="-wrapper disabled" onClick={handleOrderConfirm}>
							<MediumButton text={t('account.placeOrder')} isActive />
						</div>
					)}
				</div>
			)}
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content="Please pick a tailor and provide your shipping information (in Shipping Information tag)"
				serverity="error"
			/>
			<Dialog
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Do you want delete this order?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Warning: All data of this order will be delete.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<div className="-delete-disagree" onClick={() => setDeleteOpen(false)}>
						<SmallButton2 text="Disagree" isActive />
					</div>
					<div className="-delete-agree" onClick={handleOrderDelete}>
						<SmallButton2 text="Agree" />
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default OrderDetail;
