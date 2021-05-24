import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MediumButton from '../../../components/Button/MediumButton';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import RqmtNoteForm from '../../../components/Form/RqmtNoteForm';
import MaterialAlert from '../../../components/MaterialAlert';
import Picker from '../../../components/Picker';
import Popup from '../../../components/Popup';
import RequiremmentSummary from '../../../components/RequirementSummary';
import { ONLINE_MEASUREMENTS, STANDARD_SIZES } from '../../../constants';
import { fetchAllRTCondition, updateDocument } from '../../../services/API/firebaseAPI';
import TailorOffer from '../../Account/components/TailorOffer';
import ManualOffer from './ManualOffer';

OrderManagement.propTypes = {
	orders: PropTypes.object,
};

OrderManagement.defaultProps = {
	orders: null,
};

const TABLE_HEAD_FINDING = ['customer', 'image', 'order date', 'offers', 'picked'];
const TABLE_HEAD_TAILORING = [
	'customer',
	'image',
	'order date',
	'tailor',
	'duration',
	'fabric number',
	'wage',
	'price',
];
const TABLE_HEAD_FINISH = [
	'customer',
	'image',
	'order date',
	'finish date',
	'tailor',
	'duration',
	'fabric number',
	'wage',
	'price',
];

const ORDER_STATUS = ['finding', 'tailoring', 'finish'];

function OrderManagement(props) {
	const { orders } = props;
	const customers = useSelector((state) => state.admin.customers);
	const tailors = useSelector((state) => state.admin.tailors);
	/*--------------*/
	const [orderStatus, setOrderStatus] = useState(
		ORDER_STATUS.map((status, index) => {
			return { status, active: index === 0 };
		})
	);
	const [clickedOrder, setClickedOrder] = useState(null);
	const [onlineMsmt, setOnlineMsmt] = useState(null);
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return { name: size, active: false };
		})
	);
	const [tailorFindingOrders, setTailorFindingOrders] = useState(null);
	/*------------------------------*/
	const [popupShow, setPopupShow] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	/*-------------------------------------------------------ORDER STATUS------------------------------------------------------------*/
	/*--------------*/
	const useStyles = makeStyles({
		root: {
			width: '80%',
			margin: '0 auto',
		},
		container: {
			maxHeight: 400,
		},
	});
	const classes = useStyles();
	/*------------------------------*/
	useEffect(() => {
		fetchAllRTCondition('tailorOrders', 'status', '==', 'finding', (result) => {
			if (result?.length > 0) {
				setTailorFindingOrders(result);
			}
		});
	}, []);
	/*********************************
	 *  Description: handle status change
	 */
	function handleTableRender() {
		let currentStatus = orderStatus.find((order) => order.active).status || '';
		let render = <Fragment />;
		if (orders) {
			switch (currentStatus) {
				case 'finding':
					let rowContentFinding =
						orders?.finding.length > 0
							? orders.finding.map((order) => {
									const { designFiles, customer, orderDate } = order;
									let offers = tailorFindingOrders?.find(tailorOrder => tailorOrder.orderID === order.id)?.offers;
									return {
										image: designFiles[0],
										customer: customer.displayName || customer.phone,
										orderDate,
										offers,
										picked: offers?.length > 0 ? !!offers?.find((offer) => offer.picked) : false,
									};
							  })
							: [];
					render = (
						<div className="c-admin-order__table">
							<Paper className={classes.root}>
								<TableContainer className={classes.container}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{TABLE_HEAD_FINDING.map((header, index) => {
													return (
														<TableCell key={index} align="center">
															{header}
														</TableCell>
													);
												})}
											</TableRow>
										</TableHead>
										<TableBody>
											{rowContentFinding.length > 0 ? (
												rowContentFinding.map((row, index) => (
													<TableRow key={index} onClick={() => onRowClick(index, 'finding', row.offers)}>
														<TableCell align="center">{row.customer}</TableCell>
														<TableCell align="center">
															<div className="image-wraper">
																<img src={row.image} alt="design file" />
															</div>
														</TableCell>
														<TableCell align="center">{row.orderDate}</TableCell>
														<TableCell align="center">{row.offers?.length || 0}</TableCell>
														<TableCell align="center">{row.picked}</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell>
														<p style={{ textAlign: 'center' }}>No order</p>
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</div>
					);
					break;
				case 'tailoring':
					let rowContentTailoring =
						orders?.tailoring.length > 0
							? orders.tailoring.map((order) => {
									let pickedOffer = order.offers.find((offer) => offer.picked);
									const { designFiles, customer, orderDate } = order;
									return {
										image: designFiles[0],
										customer: customer.displayName || customer.phone,
										orderDate,
										tailor: pickedOffer.name,
										duration: pickedOffer.duration,
										fabricNumber: pickedOffer.fabricNumber,
										wage: pickedOffer.wage && pickedOffer.wage * 1000,
										price: pickedOffer.price && pickedOffer.price * 1000,
									};
							  })
							: [];

					render = (
						<div className="c-admin-order__table">
							<Paper className={classes.root}>
								<TableContainer className={classes.container}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{TABLE_HEAD_TAILORING.map((header, index) => {
													return (
														<TableCell key={index} align="center">
															{header}
														</TableCell>
													);
												})}
											</TableRow>
										</TableHead>
										<TableBody>
											{rowContentTailoring.length > 0 ? (
												rowContentTailoring.map((row, index) => (
													<TableRow key={index} onClick={() => onRowClick(index, 'tailoring')}>
														<TableCell align="center">{row.customer}</TableCell>
														<TableCell align="center">
															<div className="image-wraper">
																<img src={row.image} alt="design file" />
															</div>
														</TableCell>
														<TableCell align="center">{row.orderDate}</TableCell>
														<TableCell align="center">{row.tailor}</TableCell>
														<TableCell align="center">{row.duration}</TableCell>
														<TableCell align="center">{row.fabricNumber}</TableCell>
														<TableCell align="center">{row.wage}</TableCell>
														<TableCell align="center">{row.price}</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell>
														<p style={{ textAlign: 'center' }}>No order</p>
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</div>
					);
					break;

				case 'finish':
					let rowContentFinish =
						orders?.finish.length > 0
							? orders.finish.map((order) => {
									let pickedOffer = order.offers.find((offer) => offer.picked);
									const { designFiles, customer, orderDate, finishDate } = order;
									return {
										image: designFiles[0],
										customer: customer.displayName || customer.phone,
										orderDate,
										finishDate,
										tailor: pickedOffer.name || '',
										duration: pickedOffer.duration || 0,
										fabricNumber: pickedOffer.fabricNumber || 0,
										wage: pickedOffer.wage && pickedOffer.wage * 1000,
										price: pickedOffer.price && pickedOffer.price * 1000,
									};
							  })
							: [];
					render = (
						<div className="c-admin-order__table">
							<Paper className={classes.root}>
								<TableContainer className={classes.container}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{TABLE_HEAD_FINISH.map((header, index) => {
													return (
														<TableCell key={index} align="center">
															{header}
														</TableCell>
													);
												})}
											</TableRow>
										</TableHead>
										<TableBody>
											{rowContentFinish.length > 0 ? (
												rowContentFinish.map((row, index) => (
													<TableRow key={index} onClick={() => onRowClick(index, 'tailoring')}>
														<TableCell align="center">{row.customer}</TableCell>
														<TableCell align="center">
															<div className="image-wraper">
																<img src={row.image} alt="design file" />
															</div>
														</TableCell>
														<TableCell align="center">{row.orderDate}</TableCell>
														<TableCell align="center">{row.finishDate}</TableCell>
														<TableCell align="center">{row.tailor}</TableCell>
														<TableCell align="center">{row.duration}</TableCell>
														<TableCell align="center">{row.fabricNumber}</TableCell>
														<TableCell align="center">{row.wage}</TableCell>
														<TableCell align="center">{row.price}</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell>
														<p style={{ textAlign: 'center' }}>No order</p>
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</div>
					);
					break;

				default:
					break;
			}
		}
		return render;
	}
	/************_END_****************/
	/*********************************
	 *  Description: onRowClick
	 */
	function onRowClick(clickedIndex, clickedStatus, offers) {
		let clickedStatusOrders = orders[clickedStatus] ? [...orders[clickedStatus]] : [];
		let clickedOrder = clickedStatusOrders[clickedIndex] && {
			...clickedStatusOrders[clickedIndex],
			offers: [...offers]
		};
		if (clickedOrder) {
			let updatedOnlineMsmt =
				ONLINE_MEASUREMENTS.find((item) => item.style === clickedOrder.designStyle).msmts || null;
			setClickedOrder(clickedOrder);
			/*--------------*/
			if (updatedOnlineMsmt) {
				updatedOnlineMsmt.forEach((msmt) => {
					msmt.value = clickedOrder.msmt ? clickedOrder.msmt[msmt.id] : '';
				});

				setOnlineMsmt(updatedOnlineMsmt);
			}
			/*--------------*/
			if (clickedOrder.stdSize) {
				setStandardSizes(
					standardSizes.map((size) => {
						return { ...size, active: size.name === clickedOrder.stdSize };
					})
				);
			}
		}
	}
	/************_END_****************/

	/*-------------------------------------------------------ORDER INFO------------------------------------------------------------*/
	/*********************************
	 *  Description:
	 */
	function handleOrderInfoRender() {
		if (clickedOrder) {
			let currentStatus = orderStatus.find((order) => order.active)?.status || '';
			let btnRender = <Fragment />;
			switch (currentStatus) {
				case 'finding':
					btnRender = (
						<div className="c-admin-order__info --btn">
							<div className="--wrapper" onClick={() => setPopupShow(true)}>
								<MediumButton text="Manual Offer" isActive />
							</div>
						</div>
					);
					break;

				case 'tailoring':
					btnRender = (
						<div className="c-admin-order__info --btn">
							<div className="--wrapper" onClick={handleFinishOrder}>
								<MediumButton text="finish" isActive />
							</div>
						</div>
					);
					break;

				default:
					break;
			}
			/*--------------*/
			return (
				<div className="c-admin-order__info">
					<p className="c-admin-order__info --title">Order Information</p>
					{clickedOrder ? (
						<div className="c-admin-order__info --content">
							<div className="c-admin-order__info --rqmt">
								<RequiremmentSummary
									designFiles={clickedOrder.designFiles}
									designStyle={clickedOrder.designStyle}
									fabricPattern={clickedOrder.fabric.pattern}
									fabricType={clickedOrder.fabric.type}
								/>
							</div>

							{clickedOrder.stdSize ? (
								<div className="c-admin-order__info --stdsize">
									<Picker list={standardSizes} />
								</div>
							) : (
								<Fragment />
							)}
							{clickedOrder.msmt ? (
								<div className="c-admin-order__info --msmt">
									<MeasurementForm
										disabled
										measurements={Array.isArray(onlineMsmt) ? onlineMsmt : []}
									/>
								</div>
							) : (
								<Fragment />
							)}
							{clickedOrder.notes ? (
								<div className="c-admin-order__info --notes">
									<p>Requirement Note</p>
									<RqmtNoteForm notes={clickedOrder?.notes || []} />
								</div>
							) : (
								<Fragment />
							)}
							{clickedOrder.offers ? (
								<div className="c-order-detail__offer">
									<TailorOffer offerInfo={clickedOrder.offers} />
								</div>
							) : (
								<Fragment />
							)}
							{/* --- */}
							{btnRender}
						</div>
					) : (
						<Fragment />
					)}
				</div>
			);
		} else {
			return <Fragment />;
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle manual offer
	 */
	function handleManualOffer(offers) {
		let updatedOffers = offers.filter((offer) => offer.tailor);
		if (
			updatedOffers.filter(
				(offer) => isNaN(offer.wage) || isNaN(offer.duration) || isNaN(offer.price)
			).length > 0
		) {
			setAlertOpen(true);
		} else {
			if (clickedOrder) {
				/*------------------------------*/
				updatedOffers = updatedOffers.map((offer) => {
					let tailorInfo = tailors.find((tailor) => tailor.id === offer.tailor);
					if (tailorInfo) {
						return {
							...offer,
							tailor: {
								id: tailorInfo.id,
								name: tailorInfo.nickName,
								stars: tailorInfo.stars,
								avatar: tailorInfo.avatar || null,
							},
						};
					} else {
						return { ...offer, tailor: { id: offer.tailor, name: '', stars: 0, avatar: null } };
					}
				});
				/*------------------------------*/
				let updatedCustomer = {
					...customers.find((customer) => customer.id === clickedOrder.customer.id),
				};
				let updatedOrders = updatedCustomer.orders.map((order) => {
					if (order.id === clickedOrder.id) {
						return { ...order, offers: [...updatedOffers] };
					} else {
						return { ...order };
					}
				});

				if (updatedOrders) {
					updateDocument('customers', clickedOrder?.customer?.id, 'orders', updatedOrders)
						.then(() => {
							setPopupShow(false);
						})
						.catch((error) => {});
				}
			}
		}
	}
	/************_END_****************/

	/*********************************
	 *  Description: handle manual offer
	 */
	function handleFinishOrder() {
		if (clickedOrder) {
			let relatedCustomer = JSON.parse(
				JSON.stringify(customers.find((customer) => customer.id === clickedOrder.customer.id))
			);
			let indexOfClickedOrder = relatedCustomer.orders.findIndex(
				(order) => order.id === clickedOrder.id
			);
			if (indexOfClickedOrder > -1) {
				relatedCustomer.orders[indexOfClickedOrder].status = 'finish';
				relatedCustomer.orders[indexOfClickedOrder].finishDate = moment().format('L');
			}
			if (relatedCustomer) {
				updateDocument('customers', relatedCustomer.id, 'orders', relatedCustomer.orders).then(
					() => {
						alert('success');
					}
				);
			}
		}
	}
	/************_END_****************/

	/*-------------------------------------------------------MAIN RENDER------------------------------------------------------------*/
	return (
		<div className="c-admin-order">
			<div className="c-admin-order__status">
				{orderStatus ? (
					orderStatus.map((status, index) => {
						return (
							<div
								key={index}
								className="c-admin-order__status-item"
								onClick={() => {
									setOrderStatus(
										orderStatus.map((status, thisIndex) => {
											return { ...status, active: index === thisIndex };
										})
									);

									setClickedOrder(null);
								}}
							>
								<MediumButton key={index} isActive={status.active} text={status.status} />
							</div>
						);
					})
				) : (
					<Fragment />
				)}
			</div>
			{handleTableRender()}
			{handleOrderInfoRender()}
			<Popup show={popupShow} setPopupShow={setPopupShow}>
				<ManualOffer
					onConfirm={handleManualOffer}
					onCancel={() => setPopupShow(false)}
					isReset={!popupShow}
					tailors={tailors}
				/>
			</Popup>
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content="Xin hãy nhập số (Please input numbers)!"
				serverity="error"
			/>
		</div>
	);
}

export default OrderManagement;
