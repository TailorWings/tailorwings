import {
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
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
import { fetchAllRealTime, updateDocument } from '../../../services/API/firebaseAPI';
import { modifyPrice } from '../../../services/Functions/commonFunctions';
import TailorOffer from '../../Account/components/TailorOffer';
import ManualOffer from './ManualOffer';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

OrderManagement.propTypes = {
	orders: PropTypes.object,
};

OrderManagement.defaultProps = {
	orders: null,
};

const TABLE_HEAD_FINDING = ['customer', 'image', 'order date', 'offers'];
const TABLE_HEAD_TAILORING = [
	'customer',
	'image',
	'order date',
	'tailor',
	'duration',
	'fabric number',
	'wage',
	'price',
	'status',
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

const ORDER_STATUS = ['finding', 'quoted', 'tailoring', 'finish'];

function OrderManagement(props) {
	const { orders } = props;
	const customers = useSelector((state) => state.admin.customers);
	const tailors = useSelector((state) => state.admin.tailors);
	const { t, i18n } = useTranslation();
	/*--------------*/
	const [orderStatus, setOrderStatus] = useState(
		ORDER_STATUS.map((status, index) => {
			return { status, active: index === 0 };
		})
	);
	const [clickedOrder, setClickedOrder] = useState(null);
	const [clickedOrderCustomer, setClickedOrderCustomer] = useState(null);
	const [onlineMsmt, setOnlineMsmt] = useState(null);
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return { name: size, active: false };
		})
	);
	const [tailorFindingOrders, setTailorFindingOrders] = useState(null);
	const [tailorTailoringOrders, setTailorTailoringOrders] = useState(null);
	const [tailorFinishOrders, setTailorFinishOrders] = useState(null);
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
		fetchAllRealTime('tailorOrders', (result) => {
			if (result?.length > 0) {
				let tailorFindingOrders = result.filter((tailorOrder) => tailorOrder.status === 'finding');
				let tailorTailoringOrders = result.filter(
					(tailorOrder) => tailorOrder.status === 'tailoring'
				);
				let tailorFinishOrders = result.filter((tailorOrder) => tailorOrder.status === 'finish');
				setTailorFindingOrders(tailorFindingOrders);
				setTailorTailoringOrders(tailorTailoringOrders);
				setTailorFinishOrders(tailorFinishOrders);
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
						getFindingOrders(false);
					render = (
						renderFindingOrders(rowContentFinding)
					);
					break;
				case 'quoted':
					let quotedOrders =
						getFindingOrders(true);
					render = (
						renderFindingOrders(quotedOrders)
					);
					break;
				case 'tailoring':
					let rowContentTailoring =
						orders?.tailoring.length > 0
							? orders.tailoring.map((order) => {
									let tailorOrder = tailorTailoringOrders?.find(
										(tailorOrder) => tailorOrder.orderID === order.id
									);
									/*------------------------------*/
									let status = 'tailoring';
									if (tailorOrder?.status === 'tailoring') {
										if (tailorOrder?.isTailored) {
											status = 'tailored';
										}
									}
									/*------------------------------*/
									let pickedOffer = tailorOrder?.offers?.find((offer) => offer?.picked);
									const { designFiles, customer, orderDate, sideDesignFiles } = order;
									const photoNotes = sideDesignFiles?.find(s => s.side === 'front')?.photoNotes;
									let representImage;
									if (photoNotes?.length > 0) {
										// front side photo is mandatory
										representImage = photoNotes[0].downloadUrl;
									}
									if (representImage == null) {
										console.log('This order was created before applying the side images feature');
									} else {
										console.log(representImage);
									}
									return {
										id: order.id,
										image: representImage,
										customer: customer?.displayName || customer?.phone || 'none',
										orderDate,
										tailor: pickedOffer?.tailor?.name || '',
										duration: pickedOffer?.duration || '',
										fabricNumber: pickedOffer?.fabricNumber || '',
										wage: modifyPrice(pickedOffer?.wage) || 0,
										price: modifyPrice(pickedOffer?.price) || 0,
										status,
										tailorOrder,
										offers: tailorOrder?.offers,
										pickedOffer,
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
												rowContentTailoring.map((row, index) => {
													let background = 'white';
													if (row?.status === 'tailored') {
														background = 'greenyellow';
													}
													return (
														<TableRow
															key={index}
															onClick={() => onRowClick(row, 'tailoring')}
														>
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
															<TableCell align="center">
																<FormControl variant="outlined" className={classes.formControl}>
																	<InputLabel id="demo-simple-select-outlined-label">
																		Status
																	</InputLabel>
																	<Select
																		style={{ background: background }}
																		labelId="demo-simple-select-outlined-label"
																		id="demo-simple-select-outlined"
																		value={row?.status || ''}
																		onChange={
																			row?.tailorOrder
																				? (e) => handleTailorStatusChange(e, row?.tailorOrder)
																				: () => {}
																		}
																		label="Status"
																	>
																		<MenuItem value="">
																			<em>None</em>
																		</MenuItem>
																		<MenuItem value="tailoring">Tailoring</MenuItem>
																		<MenuItem value="tailored">Tailored</MenuItem>
																	</Select>
																</FormControl>
															</TableCell>
														</TableRow>
													);
												})
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
									let tailorOrder = tailorFinishOrders?.find(
										(tailorOrder) => tailorOrder.orderID === order.id
									);
									/*------------------------------*/
									let pickedOffer = tailorOrder?.offers?.find((offer) => offer?.picked);
									const { designFiles, customer, orderDate, finishDate } = order;
									return {
										id: order.id,
										image: designFiles[0],
										customer: customer.displayName || customer.phone,
										orderDate,
										finishDate,
										tailor: pickedOffer?.tailor?.name || '',
										duration: pickedOffer?.duration || 0,
										fabricNumber: pickedOffer?.fabricNumber || 0,
										wage: modifyPrice(pickedOffer?.wage) || 0,
										price: modifyPrice(pickedOffer?.price) || 0,
										tailorOrder,
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
													<TableRow
														key={index}
														onClick={() => onRowClick(row, 'finish')}
													>
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
	function renderFindingOrders(rowContentFinding) {
		return <div className="c-admin-order__table">
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
									<TableRow
										key={index}
										onClick={() => onRowClick(row, 'finding')}
									>
										<TableCell align="center">{row.customer}</TableCell>
										<TableCell align="center">
											<div className="image-wraper">
												<img src={row.image} alt="design file" />
											</div>
										</TableCell>
										<TableCell align="center">{row.orderDate}</TableCell>
										<TableCell align="center">{row.offers?.length || 0}</TableCell>
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
		</div>;
	}

	function getFindingOrders(isQuoted) {
		return (orders?.finding || []).map((order) => {
				const { designFiles, customer, orderDate } = order;
				let tailorOrder = tailorFindingOrders?.find(
					(tailorOrder) => tailorOrder.orderID === order.id
				);
				return {
					id: order.id,
					image: designFiles ? designFiles[0] : null,
					customer: customer.displayName || customer.phone,
					orderDate,
					offers: tailorOrder?.offers || [],
					picked: tailorOrder?.offers?.length > 0
						? !!tailorOrder?.offers?.find((offer) => offer.picked)
						: false,
					tailorOrder,
				};
			}).filter(o => (!isQuoted && o.offers.length == 0) || (isQuoted && o.offers.length > 0 && !o.picked))

	}

	/************_END_****************/
	/*********************************
	 *  Description: onRowClick
	 */
	function onRowClick(cOrder, clickedStatus) {
		let tailorOrder = cOrder.tailorOrder;
		let clickedStatusOrders = orders[clickedStatus] || [];
		let clickedOrder = clickedStatusOrders.find(o => o.id == cOrder.id);
		clickedOrder = {
			...clickedOrder,
			offers: tailorOrder?.offers && [...tailorOrder.offers],
			tailorOrder,
		};
		if (clickedOrder) {
			setClickedOrderCustomer(customers.find(c => c.id === clickedOrder.customer.id));
			let updatedOnlineMsmt =
				ONLINE_MEASUREMENTS.find((item) => item.style === clickedOrder.designStyle).msmts || null;
			setClickedOrder(clickedOrder);
			/*--------------*/
			if (updatedOnlineMsmt) {
				updatedOnlineMsmt.forEach((msmt) => {
					if (clickedOrder.msmt && clickedOrder.msmt[msmt.id]) {
						// msmt should be an object, not array
						msmt.value = clickedOrder.msmt[msmt.id];
					} else {
						// fallback for existing invalid data
						let val = '';
						try {
							val = clickedOrder.msmt?.find(_m => _m.id == msmt.id)?.value || '';
						} catch (error) {
							
						}
						msmt.value = val;
					}
					
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
					// btnRender = (
					// 	<div className="c-admin-order__info --btn">
					// 		<div className="--wrapper" onClick={() => setPopupShow(true)}>
					// 			<MediumButton text="Manual Offer" isActive />
					// 		</div>
					// 	</div>
					// );
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
									sideDesignFiles={clickedOrder.sideDesignFiles}
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
							{clickedOrder.designFiles != null && clickedOrder.msmt ? (
								<div className="c-admin-order__info --msmt">
									<MeasurementForm
										disabled
										measurements={Array.isArray(onlineMsmt) ? onlineMsmt : []}
									/>
								</div>
							) : (
								<Fragment />
							)}
							{/* NEW DESIGN */}
							{clickedOrder.sideDesignFiles != null && clickedOrder.msmt ? (
								<div className="c-admin-order__info --msmt">
									<p>Body Metrics</p>
									<div className="c-msmt-form">
										<div className='c-msmt-form__list c-msmt-form__display-one-item'>
										{Object.keys(clickedOrderCustomer.bodyMetric).map((metric, i) => 
											<div key={i} className="c-msmt-form__item">
												<div class="c-text-input">
													<label class="c-text-input__wrapper" for="text-input-Abdomen">
														<span class="c-text-input__suffix">(cm)</span>
														<input type="text" required="" class="c-text-input__field" id="" disabled="" maxlength="3" placeholder="" value={clickedOrderCustomer.bodyMetric[metric]}/>
													</label>
													<label for="text-input-Abdomen" class="c-text-input__label">{t(metric)}</label>
												</div>
											</div>)}
										</div>
									</div>
								</div>
							) : (
								<Fragment />
							)}
							{clickedOrder.sideDesignFiles != null && clickedOrder.msmt ? (
								<div className="c-admin-order__info --msmt">
									<p>Product Metrics</p>
									<div className="c-msmt-form">
										<div className='c-msmt-form__list c-msmt-form__display-one-item'>
										{Object.keys(clickedOrder.msmt).map((metric, i) => 
											<div key={i} className="c-msmt-form__item">
												<div class="c-text-input">
													<label class="c-text-input__wrapper" for="text-input-Abdomen">
														<span class="c-text-input__suffix">(cm)</span>
														<input type="text" required="" class="c-text-input__field" id="" disabled="" maxlength="3" placeholder="" value={clickedOrder.msmt[metric]}/>
													</label>
													<label for="text-input-Abdomen" class="c-text-input__label">{t(metric)}</label>
												</div>
											</div>)}
										</div>
									</div>
								</div>
							) : (
								<Fragment />
							)}

							{clickedOrder.sideDesignFiles != null && clickedOrder.msmt ? (
								<div className="c-admin-order__info --msmt">
									<p>Product Metrics</p>
									<div className="c-msmt-form">
										<div className='c-msmt-form__list c-msmt-form__display-one-item'>
										{Object.keys(clickedOrder.msmt).map((metric, i) => 
											<div key={i} className="c-msmt-form__item">
												<div class="c-text-input">
													<label class="c-text-input__wrapper" for="text-input-Abdomen">
														<span class="c-text-input__suffix">(cm)</span>
														<input type="text" required="" class="c-text-input__field" id="" disabled="" maxlength="3" placeholder="" value={clickedOrder.msmt[metric]}/>
													</label>
													<label for="text-input-Abdomen" class="c-text-input__label">{t(metric)}</label>
												</div>
											</div>)}
										</div>
									</div>
								</div>
							) : (
								<Fragment />
							)}

							{clickedOrder.notes ? (
								<div className="c-admin-order__info --notes">
									<p>{t('account.requirementNote')}</p>
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
						updateDocument('tailorOrders', clickedOrder?.tailorOrder?.id, 'status', 'finish').then(
							() => {
								alert('success');
							}
						);
					}
				);
			}
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle tailor status change
	 */
	function handleTailorStatusChange(e, tailorOrder) {
		let value = e.target.value;

		if (tailorOrder) {
			if (value === 'tailoring') {
				updateDocument('tailorOrders', tailorOrder.id, 'isTailored', false).catch(() =>
					alert('Update fail!')
				);
			} else if (value === 'tailored') {
				updateDocument('tailorOrders', tailorOrder.id, 'isTailored', true).catch(() =>
					alert('Update fail!')
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
