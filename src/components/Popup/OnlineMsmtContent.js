import React from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../Button/MediumButton';

OnlineMsmtContent.propTypes = {
	onButtonClick: PropTypes.func,
};

OnlineMsmtContent.defaultProps = {
	onButtonClick: PropTypes.func,
};

function OnlineMsmtContent(props) {
	const { onButtonClick } = props;

	return (
		<div className="c-online-msmt-popup">
			<div className="c-online-msmt-popup-content">
				<div className="c-online-msmt-popup-content__title">
					<span>Do you want to save your measurements?</span>
				</div>
				<div className="c-online-msmt-popup-content__subtitle">
					<p>Your measurements will be saved at your profile and you can reuse them later.</p>
				</div>
				<div className="c-online-msmt-popup-content__button">
					<div
						className="c-online-msmt-popup-content__online"
						onClick={() => {
							onButtonClick && onButtonClick(false);
						}}
					>
						<MediumButton text="No" />
					</div>
					<div
						className="c-online-msmt-popup-content__offline"
						onClick={() => {
							onButtonClick && onButtonClick(true);
						}}
					>
						<MediumButton text="Yes" isActive={true} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default OnlineMsmtContent;
