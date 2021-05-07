import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
import defaultUser from '../../../assets/icons/user.svg'

const TABLE_HEAD = ['avatar', 'phone', 'name', 'email', 'orders'];

function CustomerManagement(props) {
	const customers = useSelector((state) => state.admin.customers);
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
									<TableRow key={index}>
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
		</div>
	);
}

export default CustomerManagement;
