import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import OrderDetail from './OrderDetail';
import OrderManagement from './OrderManagement';

AccountContent.propTypes = {
	match: PropTypes.object,
	onPopupStatusChange: PropTypes.func,
};

AccountContent.defaultProps = {
	match: null,
	onPopupStatusChange: null,
};

function AccountContent(props) {
	const { match, onPopupStatusChange } = props;
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	/*--------------*/
	const [orders, setOrders] = useState([]);
	const [findingOrders, setFindingOrders] = useState([]);
	const [tailoringOrders, setTailoringOrders] = useState([]);
	const [finishOrders, setFinishOrders] = useState([]);
	/*--------------*/
	useEffect(() => {
		if (currentCustomer) {
			if (currentCustomer?.orders?.toString() !== orders.toString()) {
				setOrders(currentCustomer.orders || []);
			}
		}
	}, [currentCustomer]);

	useEffect(() => {
		if (orders) {
			const finding = orders.filter((info) => {
				return info.status === 'finding';
			});
			const tailoring = orders.filter((info) => {
				return info.status === 'tailoring';
			});
			const finish = orders.filter((info) => {
				return info.status === 'finish';
			});
			/*--------------*/
			setFindingOrders(finding);
			setTailoringOrders(tailoring);
			setFinishOrders(finish);
		}
	}, [orders]);

	if (!match) return <Fragment />;

	return (
		<div className="c-account-content">
			<Switch>
				<Route
					path={`${match.path}/order`}
					component={() => (
						<OrderManagement
							findingOrders={findingOrders}
							tailoringOrders={tailoringOrders}
							finishOrders={finishOrders}
						/>
					)}
				/>
				<Route
					path={`${match.path}/detail`}
					component={() => (
						<OrderDetail orderList={orders} onPopupStatusChange={onPopupStatusChange} />
					)}
				/>
				{/* <Route path={`${match.path}/profile`} component={() => <ProfileContent />} /> */}
				{/* <Route path={`${match.path}/measurement`} component={() => <MeasurementContent />} /> */}
			</Switch>
		</div>
	);
}

export default AccountContent;
