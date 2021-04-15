import React from 'react';
import PropTypes from 'prop-types';
import checkBoldIcon from '../../assets/icons/check-bold.svg';
import classNames from 'classnames';

SmallButton1.propTypes = {
	text: PropTypes.string,
	isActive: PropTypes.bool,
};

SmallButton1.defaultProps = {
	text: 'button',
	isActive: false,
};

function SmallButton1(props) {
	const { text, isActive } = props;
	return (
		<div className={classNames('c-small-button-1', { 'c-small-button-1--active': isActive })}>
			<div className="c-small-button-1__container">
				<span className="c-small-button-1__text">{text}</span>
				<img src={checkBoldIcon} alt="icon" className="c-small-button-1__icon" />
			</div>
		</div>
	);
}

export default SmallButton1;
