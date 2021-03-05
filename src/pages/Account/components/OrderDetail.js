import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../../../components/Button/MediumButton';
import TailorOffer from './TailorOffer';
import Accordion from '../../../components/Accordion';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

OrderDetail.propTypes = {
	orderList: PropTypes.array,
	onPopupStatusChange: PropTypes.func,
};

OrderDetail.defaultProps = {
	orderList: null,
	onPopupStatusChange: null,
};

function OrderDetail(props) {
	const { orderList, onPopupStatusChange } = props;
	/*--------------*/
	const location = useLocation();
	const orderID = queryString.parse(location.search);
	const [orderDetail, setOrderDetail] = useState(null);
	/*--------------*/
	useEffect(() => {
		if (orderList) {
			let newOrderDetail = orderList.find((order) => {
				return order.id.toString() === orderID.id.toString();
			});
			if (newOrderDetail) {
				if (newOrderDetail.status !== 'finding') {
					newOrderDetail.offer = newOrderDetail.offer.filter((offer) => {
						return offer.picked;
					});
				}
			}
			newOrderDetail && setOrderDetail(newOrderDetail);
		}
	}, [orderID, orderList]);

	/*--------------*/
	if (!orderList || !orderDetail)
		return (
			<div className="c-order-detail">
				<div className="c-order-detail__header">
					<Link to="/account">
						<MediumButton text="back" />
					</Link>
					<p className="c-order-detail__title">Order Detail</p>
				</div>
			</div>
		);

	return (
		<div className="c-order-detail">
			<div className="c-order-detail__header">
				<Link to="/account">
					<MediumButton text="back" />
				</Link>
				<p className="c-order-detail__title">Order Detail</p>
			</div>
			<div className="c-order-detail__offer">
				<TailorOffer offerInfo={orderDetail && orderDetail.offer} />
			</div>
			<div className="c-order-detail__summary">
				<Accordion title="summary" />
			</div>
			<div className="c-order-detail__shipping-info">
				<Accordion title="Shipping Information" />
			</div>
			{orderDetail.status === 'finding' && (
				<div
					className="c-order-detail__button"
					onClick={onPopupStatusChange && (() => onPopupStatusChange(true))}
				>
					<MediumButton text="Place Order" isActive={true} />
				</div>
			)}
		</div>
	);
}

export default OrderDetail;
