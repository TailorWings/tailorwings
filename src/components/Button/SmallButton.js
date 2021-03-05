import React from 'react';
import PropTypes from 'prop-types';
import checkBoldIcon from '../../assets/icons/check-bold.svg';
import classNames from 'classnames';

SmallButton.propTypes = {
	text: PropTypes.string,
	isActive: PropTypes.bool,
};

SmallButton.defaultProps = {
	text: 'button',
	isActive: false,
};

function SmallButton(props) {
	const { text, isActive } = props;
	return (
		<div className={classNames('c-small-button', { 'c-small-button--active': isActive })}>
			<div className="c-small-button__container">
				<span className="c-small-button__text">{text}</span>
				<img src={checkBoldIcon} alt="icon" className="c-small-button__icon" />
			</div>
		</div>
	);
}

export default SmallButton;
