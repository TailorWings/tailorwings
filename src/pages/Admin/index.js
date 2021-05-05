import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import AdminLayout from './components/AdminLayout';
import { fetchAllRealTime } from '../../services/API/firebaseAPI';
import { updateCustomers } from '../../app/ReduxSlices/adminSlice';

AdminPage.propTypes = {};

function AdminPage(props) {
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const [findingOrders, setFindingOrders] = useState([]);
	const [tailoringOrders, setTailoringOrders] = useState([]);
	const [finishOrders, setFinishOrders] = useState([]);
	const dispatch = useDispatch();
	/*--------------*/
	useEffect(() => {
		fetchAllRealTime('customers', (results) => {
			let customerWithOrder = results.filter((result) => result.orders) || [];
			let orders = [];
			if (customerWithOrder.length > 0) {
				customerWithOrder.forEach((customer) => {
					let thisCustomerOrders = customer.orders.map((order) => {
						return { ...order, customer: { id: customer.id, displayName: customer.displayName } };
					});
					orders = orders.concat(thisCustomerOrders);
				});
			}
			/*--------------*/
			if (orders.length > 0) {
				let findings = orders.filter((order) => order.status === 'finding') || [];
				let tailorings = orders.filter((order) => order.status === 'tailoring') || [];
				let finishs = orders.filter((order) => order.status === 'finish') || [];
				/*--------------*/
				setFindingOrders(findings);
				setTailoringOrders(tailorings);
				setFinishOrders(finishs);
			}
			/*--------------*/
			const action_updateCustomers = updateCustomers(customerWithOrder);
			dispatch(action_updateCustomers);
		});
		return () => {
			fetchAllRealTime('customers');
		};
	}, []);
	/*--------------*/
	if (!currentCustomer || currentCustomer.r !== 'ad') return <Redirect to="/" />;
	return (
		<div className="l-admin" style={{ width: '100%', height: 'auto' }}>
			<AdminLayout
				orders={{ finding: findingOrders, tailoring: tailoringOrders, finish: finishOrders }}
			/>
		</div>
	);
}

export default AdminPage;
