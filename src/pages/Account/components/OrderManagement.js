import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../../components/Accordion';
import OrderList from './OrderList';
import { TEST_ORDER_INFO } from '../../../constants';

OrderManagement.propTypes = {
	findingOrders: PropTypes.array,
	tailoringOrders: PropTypes.array,
	historyOrders: PropTypes.array,
};

OrderManagement.defaultProps = {
	findingOrders: null,
	tailoringOrders: null,
	historyOrders: null,
};

function OrderManagement(props) {
	const { findingOrders, tailoringOrders, historyOrders } = props;

	return (
		<div className="c-order-management">
			<div className="c-order-management__title">Orders</div>
			<div className="c-order-management__finding">
				<div className="c-order-management__dropdown">
					<Accordion title="finding">
						<OrderList orderList={findingOrders} />
					</Accordion>
				</div>
				<div className="c-order-management__dropdown">
					<Accordion title="tailoring">
						<OrderList orderList={tailoringOrders} />
					</Accordion>
				</div>
				<div className="c-order-management__dropdown">
					<Accordion title="history">
						<OrderList orderList={historyOrders} />
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export default OrderManagement;
