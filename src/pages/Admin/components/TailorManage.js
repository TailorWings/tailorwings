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

const TABLE_HEAD = ['avatar', 'name', 'email','stars', 'products'];

function TailorManage({tailors}) {
	const [clickedOrder, setClickedOrder] = useState({});
	/*--------------*/

    console.log(tailors);

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

	if (!tailors) return <Fragment />;
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
							{tailors.length > 0 ? (
								tailors.map((row, index) => (
									<TableRow key={index}>
										<TableCell align="center">
											<div className="image-wraper">
												<img src={row.avatar || defaultUser} alt="design file" />
											</div>
										</TableCell>
										<TableCell align="center">{row.name || row.id}</TableCell>
										<TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.stars}</TableCell>
										<TableCell align="center">{row.products ? row.products.length : 0}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell>
										<p style={{ textAlign: 'center' }}>No tailors</p>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{/* {handleShowCusInfo()} */}
		</div>
	);
}

export default TailorManage;
