import React from 'react';
import PropTypes from 'prop-types';
import successIcon from '../../assets/icons/success.svg';
import MediumButton from '../Button/MediumButton';
import { useHistory } from 'react-router';

ThankyouContent.propTypes = {
	setPopupShow: PropTypes.func,
};

ThankyouContent.defaultProps = {
	setPopupShow: null,
};

function ThankyouContent(props) {
	const { setPopupShow } = props;
	const history = useHistory();
	return (
		<div className="c-thank-you-popup-content">
			<img src={successIcon} alt="success-icon" className="c-thank-you-popup-content__icon" />
			<div className="c-thank-you-popup-content__title">
				<span>Thank you for your order</span>
			</div>
			{/* <div className="c-thank-you-popup-content__subtitle">
				<p>...</p>
			</div> */}
			<div className="c-thank-you-popup-content__button">
				<button
					className="c-thank-you-popup-content__back"
					onClick={() => {
						setPopupShow(false);
						history.push('/account/order');
					}}
				>
					Back
				</button>
			</div>
		</div>
	);
}

export default ThankyouContent;
