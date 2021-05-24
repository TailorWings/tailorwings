import PropTypes from 'prop-types';
import React from 'react';
import MediumButton from '../../../components/Button/MediumButton';

RqmtFooter.propTypes = {
	onNextClick: PropTypes.func,
	disabled: PropTypes.bool,
};

RqmtFooter.defaultProps = {
	onNextClick: null,
	disabled: false
};

function RqmtFooter(props) {
	const { onNextClick, disabled } = props;

	return (
		<div className="c-rqmt-footer">
			<p className="c-rqmt-footer__text">
				Minimum image size 500 KB. The higher the quality, the better the results.
			</p>
			<div className={`c-rqmt-footer__btn ${disabled ? 'disabled' : ""}`} onClick={onNextClick}>
				<MediumButton isActive={true} text="next" />
			</div>
		</div>
	);
}

export default RqmtFooter;
