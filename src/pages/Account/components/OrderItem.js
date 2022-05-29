import { indigo } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MediumButton from '../../../components/Button/MediumButton';
import Label from '../../../components/Label';
import { modifyPrice } from '../../../services/Functions/commonFunctions';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

OrderItem.propTypes = {
	info: PropTypes.object,
	offersLength: PropTypes.number,
};

OrderItem.defaultProps = {
	info: null,
	offersLength: 0
};
function OrderItem(props) {
	const { info, offersLength } = props;
	const { t, i18n } = useTranslation();

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
								<Label value={info.orderDate} title={t('account.orderDate')} color="primary" />
							</div>
							<div className="c-order-item__button">
								<MediumButton
									text={`${offersLength} ${t('account.tailorOffer')} ${
										offersLength > 1 ? 's' : ''
									}`}
									isActive={true}
								/>
							</div>
						</div>
					);
					break;

				case 'tailoring':
					let tailoringPickedOffer = info?.offers?.find((item) => item.picked) || null;
					renderElement = (
						<div className="c-order-item__content">
							<div className="c-order-item-info">
								<Label value={info?.orderDate || ''} title="Order date" color="secondary" />
							</div>
							<div className="c-order-item-info">
								<Label
									value={tailoringPickedOffer && tailoringPickedOffer?.tailor?.name}
									title="Tailor"
									color="secondary"
								/>
							</div>
							<div className="c-order-item__button">
								<MediumButton text={t('account.orderDetails')} isActive={false} />
							</div>
						</div>
					);
					break;

				case 'finish':
					let finishPickedOffer = info.offers?.find((item) => item.picked) || null;
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
							<p className="c-order-item-info__price">{`${
								finishPickedOffer.price ? modifyPrice(finishPickedOffer.price)  : "Error"
							} vnđ`}</p>
							<div className="c-order-item__button">
								<MediumButton text={t('account.orderDetails')} isActive={false} />
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
				{
				info.designFiles && info.designFiles.length > 0 ? 
				(
					<img src={info.designFiles[0]} alt="design" />
				) 
				: 
					info?.sideDesignFiles?.length > 0? 
					<img src={info.sideDesignFiles[0].photoNotes[0].downloadUrl} alt="design" />
					: <Fragment/>
			
				}
			</div>
			{handleContentRender()}
		</Link>
	);
}

export default OrderItem;
