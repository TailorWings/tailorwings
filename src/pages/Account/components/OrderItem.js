import { indigo } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MediumButton from '../../../components/Button/MediumButton';
import Label from '../../../components/Label';

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
								<Label value={info.orderDate} title="Order date" color="primary" />
							</div>
							<div className="c-order-item__button">
								<MediumButton
									text={`${info.offer ? info.offer.length : 0} tailor offer${
										info.offer ? 's' : ''
									}`}
									isActive={true}
								/>
							</div>
						</div>
					);
					break;

				case 'tailoring':
					let tailoringPickedOffer = info.offer.find((item) => item.picked) || null;
					renderElement = (
						<div className="c-order-item__content">
							<div className="c-order-item-info">
								<Label value={info.orderDate} title="Order date" color="secondary" />
							</div>
							<div className="c-order-item-info">
								<Label
									value={tailoringPickedOffer && tailoringPickedOffer.tailor.name}
									title="Tailor"
									color="secondary"
								/>
							</div>
							<div className="c-order-item__button">
								<MediumButton text="Order Details" isActive={false} />
							</div>
						</div>
					);
					break;

				case 'finish':
					let finishPickedOffer = info.offer.find((item) => item.picked) || null;
					renderElement = (
						<div className="c-order-item__content">
							<div className="c-order-item-info">
								<Label value={info.orderDate} title="Order date" color="gray" />
							</div>
							<div className="c-order-item-info">
								<Label
									value={finishPickedOffer && finishPickedOffer.tailor.name}
									title="Tailor"
									color="gray"
								/>
							</div>
							<p className="c-order-item-info__price">{`${finishPickedOffer.price} vnđ`}</p>
							<div className="c-order-item__button">
								<MediumButton text="Order Details" isActive={false} />
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
			<div className="c-order-item__image">
				{info.designFiles && info.designFiles.length > 0 ? (
					<img src={info.designFiles[0]} alt="design" />
				) : (
					<Fragment />
				)}
			</div>
			{handleContentRender()}
		</Link>
	);
}

export default OrderItem;
