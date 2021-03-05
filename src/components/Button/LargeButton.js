import React from 'react';
import PropTypes from 'prop-types';

LargeButton.propTypes = {
	text: PropTypes.string,
};

LargeButton.defaultProps = {
	text: 'Button',
};

function LargeButton(props) {
	const { text } = props;
	return (
		<div className="c-large-button">
			<p className="c-large-button__text">{text}</p>
		</div>
	);
}

export default LargeButton;
