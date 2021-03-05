import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

OrderList.propTypes = {
	orderList: PropTypes.array,
};

OrderList.defaultProps = {
	orderList: null,
};

function OrderList(props) {
	const { orderList } = props;

	if (!orderList) return <Fragment />;
	return (
		<div className="c-order-list">
			{orderList.map((order, index) => {
				return <OrderItem key={index} info={order} />;
			})}
		</div>
	);
}

export default OrderList;
