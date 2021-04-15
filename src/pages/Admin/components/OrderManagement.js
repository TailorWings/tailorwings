import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../../../components/Button/MediumButton';
import Popup from '../../../components/Popup';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import RequiremmentSummary from '../../../components/RequirementSummary';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import { ONLINE_MEASUREMENTS, STANDARD_SIZES } from '../../../constants';
import Picker from '../../../components/Picker';
import RqmtNoteForm from '../../../components/Form/RqmtNoteForm';
import ManualOffer from './ManualOffer';

OrderManagement.propTypes = {
	orders: PropTypes.object,
};

OrderManagement.defaultProps = {
	orders: null,
};

const TABLE_HEAD_FINDING = ['image', 'customer', 'order date', 'offers', 'picked'];
const TABLE_HEAD_TAILORING = [
	'image',
	'customer',
	'order date',
	'tailor',
	'duration',
	'fabric number',
	'wage',
	'price',
];
const TABLE_HEAD_FINISH = [
	'image',
	'customer',
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
	const [popShow, setPopupShow] = useState(false);

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
	/*********************************
	 *  Description: handle status change
	 */
	function handleTableRender() {
		let currentStatus = orderStatus.find((order) => order.active).status || '';
		let render = <Fragment />;
		if (orders) {
			switch (currentStatus) {
				case 'finding':
					let rowContent =
						orders?.finding.length > 0
							? orders.finding.map((order) => {
									const { designFiles, customer, orderDate, offers } = order;
									return {
										image: designFiles[0],
										customer: customer.displayName || customer.displayName,
										orderDate,
										offers: offers.length,
										picked: offers.length > 0 ? !!offers.find((offer) => offer.picked) : false,
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
											{rowContent.map((row, index) => (
												<TableRow key={index} onClick={() => onRowClick(index, 'finding')}>
													<TableCell align="center">{row.customer}</TableCell>
													<TableCell align="center">
														<div className="image-wraper">
															<img src={row.image} alt="design file" />
														</div>
													</TableCell>
													<TableCell align="center">{row.orderDate}</TableCell>
													<TableCell align="center">{row.offers}</TableCell>
													<TableCell align="center">{row.picked}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</div>
					);
					break;
				// case 'finding':
				// 	break;
				// case 'finding':
				// 	break;

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
	function onRowClick(clickedIndex, clickedStatus) {
		let clickedStatusOrders = orders[clickedStatus] ? [...orders[clickedStatus]] : [];
		let clickedOrder = clickedStatusOrders[clickedIndex] && {
			...clickedStatusOrders[clickedIndex],
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
							{clickedOrder.offers.length < 1 && (
								<div className="--wrapper" onClick={() => setPopupShow(true)}>
									<MediumButton text="Manual Offer" isActive />
								</div>
							)}
							<div className="--wrapper">
								<MediumButton text="start tailor" isActive />
							</div>
						</div>
					);
					break;

				case 'tailoring':
					btnRender = (
						<div className="c-admin-order__info --btn">
							<div className="--wrapper">
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
									<MeasurementForm disabled measurements={onlineMsmt} />
								</div>
							) : (
								<Fragment />
							)}
							{clickedOrder.notes ? (
								<div className="c-admin-order__info --notes">
									<p>Requirement Note</p>
									<RqmtNoteForm notes={clickedOrder.notes} />
								</div>
							) : (
								<Fragment />
							)}
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
		console.log('offers :>> ', offers);
		let updateOffers = offers.filter((offer) => offer.name);
		console.log('updateOffers :>> ', updateOffers);
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
			<Popup show={popShow} setPopupShow={setPopupShow}>
				<ManualOffer onConfirm={handleManualOffer} onCancel={() => setPopupShow(false)} />
			</Popup>
		</div>
	);
}

export default OrderManagement;
