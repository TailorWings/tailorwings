import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import OrderManagement from './OrderManagement';
import OrderDetail from './OrderDetail';
import { TEST_ORDER_INFO } from '../../../constants';
import ProfileContent from './ProfileContent';
import MeasurementContent from './MeasurementContent';

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
	/*--------------*/
	const findingOrders = TEST_ORDER_INFO.filter((info) => {
		return info.status === 'finding';
	});
	const tailoringOrders = TEST_ORDER_INFO.filter((info) => {
		return info.status === 'tailoring';
	});
	const historyOrders = TEST_ORDER_INFO.filter((info) => {
		return info.status === 'finish';
	});
	/*--------------*/

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
							historyOrders={historyOrders}
						/>
					)}
				/>
				<Route
					path={`${match.path}/detail`}
					component={() => (
						<OrderDetail orderList={TEST_ORDER_INFO} onPopupStatusChange={onPopupStatusChange} />
					)}
				/>
				<Route path={`${match.path}/profile`} component={() => <ProfileContent />} />
				<Route path={`${match.path}/measurement`} component={() => <MeasurementContent />} />
			</Switch>
		</div>
	);
}

export default AccountContent;
