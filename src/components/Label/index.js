import React from 'react';
import PropTypes from 'prop-types';

Label.propTypes = {
	value: PropTypes.string,
	title: PropTypes.string,
	color: PropTypes.string,
};

Label.defaultProps = {
	value: '',
	title: '',
	color: 'gray',
	// primary, secondary, gray
};

function Label(props) {
	const { value, color, title } = props;

	return (
		<div className={`c-label c-label--${color}`}>
			<span className="c-label__title">{title}</span>
			<span className="c-label__value">{value}</span>
		</div>
	);
}

export default Label;
