import React from 'react';
import PropTypes from 'prop-types';

Title.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
};

Title.defaultProps = {
	title: '',
	subtitle: '',
};

function Title(props) {
	const { title, subtitle } = props;
	return (
		<div className="c-title">
			<h1 className="c-title__maintitle">{title}</h1>
			<p className="c-title__subtitle">{subtitle}</p>
		</div>
	);
}

export default Title;
