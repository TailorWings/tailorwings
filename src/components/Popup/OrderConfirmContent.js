import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import successIcon from '../../assets/icons/success.svg';
import TextInput from '../Input/TextInput';
import MediumButton from '../Button/MediumButton';
import MaterialAlert from '../MaterialAlert';
import PageLoader from '../PageLoader';
import ListLoader from '../ComponentLoader';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

OrderConfirmContent.propTypes = {
	setPopupShow: PropTypes.func,
	onFindTailor: PropTypes.func,
	isPhoneRequired: PropTypes.bool,
	isLoading: PropTypes.bool,
};

OrderConfirmContent.defaultProps = {
	setPopupShow: null,
	onFindTailor: null,
	isPhoneRequired: true,
	isLoading: false,
};

function OrderConfirmContent(props) {
	const { setPopupShow, onFindTailor, isPhoneRequired, isLoading } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	/*--------------*/
	const [phone, setPhone] = useState('');
	const [isRightPhone, setIsRightPhone] = useState(false);
	/*--------------*/
	/*********************************
	 *  Description: handle find tailor
	 */
	function handleFindTailor() {
		if (isPhoneRequired) {
			if (!isNaN(phone) && phone.length >= 9) {
				onFindTailor(phone);
				setIsRightPhone(false);
			} else {
				setIsRightPhone(true);
			}
		} else {
			onFindTailor(null);
		}
	}
	/************_END_****************/
	if (isLoading)
		return (
			<div className="c-order-confirm-content">
				<ListLoader />
			</div>
		);
	return (
		<div className="c-order-confirm-content">
			<img src={successIcon} alt="success-icon" className="c-order-confirm-content__icon" />
			<div className="c-order-confirm-content__title">
				<span>{t('orderConfirmDialog.title')}</span>
			</div>
			<div className="c-order-confirm-content__subtitle">
				<p>
				{t('orderConfirmDialog.description1')} <strong>{t('orderConfirmDialog.description2')}</strong> {t('orderConfirmDialog.description3')}
				</p>
			</div>
			{isPhoneRequired ? (
				<div className="c-order-confirm-content__phone">
					<TextInput
						label="Phone number"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<p className={`error ${isRightPhone && '--active'}`}>
						{t('orderConfirmDialog.errorPhoneNumber')}
					</p>
				</div>
			) : (
				<Fragment />
			)}

			<div className="c-order-confirm-content__button">
				<button className="c-order-confirm-content__back" onClick={() => setPopupShow(false)}>
					<MediumButton text={t('back')} />
				</button>
				<div className="c-order-confirm-content__next" onClick={handleFindTailor}>
					<MediumButton isActive text={t('findTailor')} />
				</div>
			</div>
		</div>
	);
}

export default OrderConfirmContent;
