import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

OrderList.propTypes = {
	orderList: PropTypes.array,
	tailorFindingOrders: PropTypes.array,
};

OrderList.defaultProps = {
	orderList: null,
	tailorFindingOrders: null,
};

function OrderList(props) {
	const { orderList, tailorFindingOrders } = props;
	if (!orderList) return <Fragment />;
	return (
		<div className="c-order-list">
			{orderList.map((order, index) => {
				let offers = [];
				if (tailorFindingOrders?.length > 0) {
					offers =
						tailorFindingOrders?.filter((tailorOrder) => tailorOrder.orderID === order.id)[0]?.offers;
				}
				return <OrderItem key={index} info={order} offersLength={offers?.length || 0}/>;
			})}
		</div>
	);
}

export default OrderList;
