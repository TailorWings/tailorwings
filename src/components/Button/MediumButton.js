import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

MediumButton.propTypes = {
	text: PropTypes.string,
	isActive: PropTypes.bool,
};

MediumButton.defaultProps = {
	text: 'Button',
	isActive: false,
};

function MediumButton(props) {
	const { text, isActive } = props;

	return (
		<div className={classNames('c-medium-button', { 'c-medium-button--active': isActive })}>
			<p className="c-medium-button__text">{text}</p>
		</div>
	);
}

export default MediumButton;
