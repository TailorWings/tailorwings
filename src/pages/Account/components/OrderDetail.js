import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../../../components/Button/MediumButton';
import TailorOffer from './TailorOffer';
import Accordion from '../../../components/Accordion';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ComponentLoader from '../../../components/ComponentLoader';
import ShippingForm from '../../../components/Form/ShippingForm';
import PaymentInfo from '../../../components/PaymentInfo';
import RequirementSummary from '../../../components/RequirementSummary';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import RqmtNoteForm from '../../../components/Form/RqmtNoteForm';
import { ONLINE_MEASUREMENTS, STANDARD_SIZES } from '../../../constants';
import Picker from '../../../components/Picker';

OrderDetail.propTypes = {
	orderList: PropTypes.array,
	shippingInfo: PropTypes.array,
	onPopupStatusChange: PropTypes.func,
};

OrderDetail.defaultProps = {
	orderList: null,
	shippingInfo: null,
	onPopupStatusChange: null,
};

function OrderDetail(props) {
	const { orderList, shippingInfo, onPopupStatusChange } = props;
	/*--------------*/
	const location = useLocation();
	const orderID = queryString.parse(location.search);
	const [currentOrderDetail, setCurrentOrderDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return { name: size, active: false };
		})
	);
	/*--------------*/
	useEffect(() => {
		/*--------------*/
		let myTimeout = setTimeout(() => {
			setLoading(false);
		}, 500);
		/*--------------*/
		return () => {
			clearTimeout(myTimeout);
		};
	}, []);
	/*--------------*/
	useEffect(() => {
		if (orderList) {
			let newOrderDetail =
				{
					...orderList.find((order) => {
						return order.id.toString() === orderID.id.toString();
					}),
				} || null;

			if (newOrderDetail) {
				if (newOrderDetail.status !== 'finding') {
					newOrderDetail.offer =
						newOrderDetail?.offer?.find((offer) => {
							return offer.picked;
						}) || null;
				}
				/*--------------*/
				let msmtOfStyle = ONLINE_MEASUREMENTS.find(
					(msmtInfo) => msmtInfo.style === newOrderDetail.designStyle
				);
				console.log('obnewOrderDetail.msmtject :>> ', newOrderDetail.msmt);
				if (newOrderDetail.msmt) {
					newOrderDetail.msmt = msmtOfStyle
						? msmtOfStyle.msmts.map((msmtInfo) => {
								return {
									...msmtInfo,
									value:
										newOrderDetail.msmt[msmtInfo.id] ||
										newOrderDetail.msmt.find((elem) => elem.id === msmtInfo.id)?.value ||
										'',
								};
						  })
						: [];
				}
				/*--------------*/
				if (newOrderDetail.stdSize) {
					setStandardSizes(
						standardSizes.map((size) => {
							return { ...size, active: size.name === newOrderDetail.stdSize };
						})
					);
				}
			}
			newOrderDetail && setCurrentOrderDetail(newOrderDetail);
			/*--------------*/
		}
	}, [orderID.id, orderList]);

	/*--------------*/
	if (loading || !orderList || !currentOrderDetail)
		return (
			<div className="c-order-detail">
				<ComponentLoader />
			</div>
		);
	/*--------------*/
	// if (!orderList || !currentOrderDetail)
	// 	return (
	// 		<div className="c-order-detail">
	// 			<div className="c-order-detail__header">
	// 				<Link to="/account">
	// 					<MediumButton text="back" />
	// 				</Link>
	// 				<p className="c-order-detail__title">Order Detail</p>
	// 			</div>
	// 		</div>
	// 	);
	/*--------------*/
	/*********************************
	 *  Description: handle tailor picked
	 */
	function onOrderDetailChange(pickedIndex) {
		let updatedOffers = currentOrderDetail.offer.map((order, index) => {
			return { ...order, picked: index === pickedIndex };
		});
		if (updatedOffers) {
			setCurrentOrderDetail({ ...currentOrderDetail, offer: [...updatedOffers] });
		}
	}
	/************_END_****************/
	const { designFiles, designStyle, fabric, msmt, notes } = currentOrderDetail;

	return (
		<div className="c-order-detail">
			<div className="c-order-detail__header">
				<Link to="/account">
					<MediumButton text="back" />
				</Link>
				<p className="c-order-detail__title">Order Detail</p>
			</div>
			<div className="c-order-detail__offer">
				<TailorOffer
					offerInfo={currentOrderDetail && currentOrderDetail.offers}
					onTailorPick={onOrderDetailChange}
				/>
			</div>
			<div className="c-order-detail-summary">
				<Accordion title="summary">
					<div className="c-order-detail-summary__rqmt">
						<RequirementSummary
							designFiles={designFiles || null}
							designStyle={designStyle || null}
							fabricPattern={fabric?.pattern || null}
							fabricType={fabric?.type || null}
						/>
					</div>
					<div className="c-order-detail-summary__msmt">
						{msmt ? (
							<MeasurementForm measurements={msmt} title="Your Measurements" disabled />
						) : (
							<Picker list={standardSizes} />
						)}
					</div>
					<div className="c-order-detail-summary__note">
						<p className="c-order-detail-summary__note-title">Requirement Note</p>
						<RqmtNoteForm notes={notes} />
					</div>
				</Accordion>
			</div>
			<div className="c-order-detail-shipping-info">
				<Accordion title="shipping information">
					<div className="c-order-detail-shipping-info__form">
						<ShippingForm shippingInfo={shippingInfo} />
					</div>
					<div className="c-order-detail-shipping-info__payment">
						<PaymentInfo buttonText="Choose" />
					</div>
				</Accordion>
			</div>
			{currentOrderDetail.status === 'finding' && (
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
