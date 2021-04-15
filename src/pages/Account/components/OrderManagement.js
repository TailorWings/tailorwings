import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Accordion from '../../../components/Accordion';
import ComponentLoader from '../../../components/ComponentLoader';
import OrderList from './OrderList';

OrderManagement.propTypes = {
	findingOrders: PropTypes.array,
	tailoringOrders: PropTypes.array,
	finishOrders: PropTypes.array,
};

OrderManagement.defaultProps = {
	findingOrders: null,
	tailoringOrders: null,
	finishOrders: null,
};

function OrderManagement(props) {
	const { findingOrders, tailoringOrders, finishOrders } = props;
	/*--------------*/
	const [loading, setLoading] = useState(true);
	/*--------------*/
	useEffect(() => {
		/*--------------*/
		let timer = setTimeout(() => {
			setLoading(false);
		}, 500);
		/*--------------*/
		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (loading)
		return (
			<div className="c-order-management">
				<ComponentLoader />
			</div>
		);
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
						<OrderList orderList={finishOrders} />
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export default OrderManagement;
