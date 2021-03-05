import React from 'react';
import PropTypes from 'prop-types';
import successIcon from '../../assets/icons/success.svg';
import MediumButton from '../Button/MediumButton';

ThankyouContent.propTypes = {
	onConfirm: PropTypes.func,
	setPopupShow: PropTypes.func,
};

ThankyouContent.defaultProps = {
	onConfirm: null,
	setPopupShow: null,
};

function ThankyouContent(props) {
	const { onConfirm, setPopupShow } = props;
	return (
		<div className="c-thank-you-popup-content">
			<img src={successIcon} alt="success-icon" className="c-thank-you-popup-content__icon" />
			<div className="c-thank-you-popup-content__title">
				<span>Thank you for your order</span>
			</div>
			<div className="c-thank-you-popup-content__subtitle">
				<p>Next you should move to order page to pick tailor who suits for you.</p>
			</div>
			<div className="c-thank-you-popup-content__button">
				<button className="c-thank-you-popup-content__back" onClick={() => setPopupShow(false)}>
					Back
				</button>
				<div className="c-thank-you-popup-content__confirm" onClick={onConfirm && onConfirm}>
					<MediumButton text="Confirm" isActive={true} />
				</div>
			</div>
		</div>
	);
}

export default ThankyouContent;
