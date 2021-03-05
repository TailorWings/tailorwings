import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MediumButton from '../../../components/Button/MediumButton';

OrderItem.propTypes = {
	info: PropTypes.object,
};

OrderItem.defaultProps = {
	info: null,
};

function OrderItem(props) {
	const { info } = props;
	/*--------------*/
	/*********************************
	 *  Description: handle content render depend on status change
	 */
	function handleContentRender() {
		if (info) {
			let renderElement = <div className="c-order-item__content"></div>;
			switch (info.status) {
				case 'finding':
					renderElement = (
						<div className="c-order-item__content">
							<div className="c-order-item-info">
								<span className="c-order-item-info__title c-order-item-info__title--finding">
									Order date
								</span>
								<span className="c-order-item-info__value c-order-item-info__value--finding">
									{info.orderDate}
								</span>
							</div>
							<div className="c-order-item__button">
								<MediumButton text={`${info.offer.length} tailors available`} isActive={true} />
							</div>
						</div>
					);
					break;

				case 'tailoring':
					let tailoringPickedOffer = info.offer.find((item) => item.picked) || null;
					renderElement = (
						<div className="c-order-item__content">
							<div className="c-order-item-info">
								<span className="c-order-item-info__title c-order-item-info__title--tailoring">
									Receive date
								</span>
								<span className="c-order-item-info__value c-order-item-info__value--tailoring">
									{info.receiveDate}
								</span>
							</div>
							<div className="c-order-item-info">
								<span className="c-order-item-info__title c-order-item-info__title--tailoring">
									Tailor
								</span>
								<span className="c-order-item-info__value c-order-item-info__value--tailoring">
									{tailoringPickedOffer && tailoringPickedOffer.tailor.name}
								</span>
							</div>
							<div className="c-order-item__button">
								<MediumButton text="View order details" isActive={false} />
							</div>
						</div>
					);
					break;

				case 'finish':
					let finishPickedOffer = info.offer.find((item) => item.picked) || null;
					renderElement = (
						<div className="c-order-item__content">
							<div className="c-order-item-info">
								<span className="c-order-item-info__title c-order-item-info__title--history">
									Finish date
								</span>
								<span className="c-order-item-info__value c-order-item-info__value--history">
									{info.finishDate}
								</span>
							</div>
							<div className="c-order-item-info">
								<span className="c-order-item-info__title c-order-item-info__title--history">
									Tailor
								</span>
								<span className="c-order-item-info__value c-order-item-info__value--history">
									{finishPickedOffer && finishPickedOffer.tailor.name}
								</span>
							</div>
							<p className="c-order-item-info__price">{`${finishPickedOffer.price} vnđ`}</p>
							<div className="c-order-item__button">
								<MediumButton text="View order details" isActive={false} />
							</div>
						</div>
					);
					break;

				default:
					renderElement = <div className="c-order-item__content"></div>;
					break;
			}
			return renderElement || <div className="c-order-item__content"></div>;
		}
	}
	/************_END_****************/

	if (!info) return <Fragment />;
	return (
		<Link className="c-order-item" to={`/account/detail?id=${info.id}`}>
			<div className="c-order-item__image"></div>
			{handleContentRender()}
		</Link>
	);
}

export default OrderItem;
