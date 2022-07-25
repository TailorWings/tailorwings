import React from 'react';
import PropTypes from 'prop-types';
import checkBoldIcon from '../../assets/icons/check-bold.svg';
import classNames from 'classnames';

SmallButton2.propTypes = {
	text: PropTypes.string,
	isActive: PropTypes.bool,
	onClick: PropTypes.func
};

SmallButton2.defaultProps = {
	text: 'button',
	isActive: false,
};

function SmallButton2(props) {
	const { text, isActive, onClick } = props;
	return (
		<button onClick={() => onClick != null ? onClick() : null} className={classNames('c-small-button-2', { 'c-small-button-2--active': isActive })}>
			<span className="c-small-button-2__text">{text}</span>
		</button>
	);
}

export default SmallButton2;
