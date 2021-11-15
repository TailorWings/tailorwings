import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MEASUREMENTS_STYLES } from '../../../constants';
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
import defaultUser from '../../../assets/icons/user.svg';

const TABLE_HEAD = ['avatar', 'phone', 'name', 'email', 'orders'];

function CustomerManagement(props) {
	const customers = useSelector((state) => state.admin.customers);
	const [clickedOrder, setClickedOrder] = useState({});
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
	/*--------------*/

	function onRowClick(clickedIndex) {
		setClickedOrder(customers[clickedIndex]);
	}

	if (!customers) return <Fragment />;
	return (
		<div className="c-admin-customer-mgmt">
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{TABLE_HEAD.map((header, index) => {
									return (
										<TableCell key={index} align="center">
											{header}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{customers.length > 0 ? (
								customers.map((row, index) => (
									<TableRow key={index} onClick={() => onRowClick(index)}>
										<TableCell align="center">
											<div className="image-wraper">
												<img src={row.photoURL || defaultUser} alt="design file" />
											</div>
										</TableCell>
										<TableCell align="center">{row.phoneNumber}</TableCell>
										<TableCell align="center">{row.displayName || row.id}</TableCell>
										<TableCell align="center">{row.email}</TableCell>
										<TableCell align="center">{row.orders ? row.orders.length : 0}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell>
										<p style={{ textAlign: 'center' }}>No customer</p>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{handleShowCusInfo()}
		</div>
	);
	function handleShowCusInfo() {
		if (Object.entries(clickedOrder).length > 0) {
			console.log(clickedOrder);
			return (
				<div className="c-admin-customer-mgmt__info">
					<p className="c-admin-customer-mgmt__info--title">CUSTOMER INFOMATION</p>
					<div className="c-admin-customer-mgmt__info-measurement">
						<p className="c-admin-customer-mgmt__info-measurement--title">Measurement</p>
						{Object.entries(clickedOrder.msmt).length > 0 ? (
							<div className="c-admin-customer-mgmt__info-measurement__list">
								{Object.keys(clickedOrder.msmt).map((msmt, index) => {
									return (
										<div className="c-admin-customer-mgmt__info-measurement__item" key={index}>
											<span className="c-admin-customer-mgmt__info-measurement__item--label">
												{replaceLabelMSMT(msmt) || msmt}
											</span>
											<span className="c-admin-customer-mgmt__info-measurement__item--msmt">
												{clickedOrder.msmt[msmt]}
											</span>
										</div>
									);
								})}
							</div>
						) : (
							<p className="">No Measurement</p>
						)}
					</div>
					<div className="c-admin-customer-mgmt__info-measurement">
						<p className="c-admin-customer-mgmt__info-measurement--title">Shipping Infomation</p>
						{clickedOrder.shippingInfo ? (
							<div className="c-admin-customer-mgmt__info-measurement__list">
								<div className="c-admin-customer-mgmt__info-ship__item">
									<span className="c-admin-customer-mgmt__info-measurement__item--label">Name</span>
									<span className="c-admin-customer-mgmt__info-ship__item--info">
										{clickedOrder.shippingInfo[0].value || '?'}
									</span>
								</div>
								<div className="c-admin-customer-mgmt__info-ship__item">
									<span className="c-admin-customer-mgmt__info-measurement__item--label">
										Phone
									</span>
									<span className="c-admin-customer-mgmt__info-ship__item--info">
										{clickedOrder.shippingInfo[1].value || '?'}
									</span>
								</div>
								<div className="c-admin-customer-mgmt__info-ship__item">
									<span className="c-admin-customer-mgmt__info-measurement__item--label">
										Address
									</span>
									<span className="c-admin-customer-mgmt__info-ship__item--info">
										{clickedOrder.shippingInfo[2].value || '?'}
									</span>
								</div>
								<div className="c-admin-customer-mgmt__info-ship__item">
									<span className="c-admin-customer-mgmt__info-measurement__item--label">Note</span>
									<span className="c-admin-customer-mgmt__info-ship__item--info">
										{clickedOrder.shippingInfo[3].value || '?'}
									</span>
								</div>
							</div>
						) : (
							<p className="">No Shipping Infomation</p>
						)}
					</div>
				</div>
			);
		}
	}
	function replaceLabelMSMT(string) {
		let styleMsmt = MEASUREMENTS_STYLES[string];
		if (styleMsmt) {
			return styleMsmt.label;
		}
		return null;
	}
}

export default CustomerManagement;
