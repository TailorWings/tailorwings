import React from 'react';
import PropTypes from 'prop-types';

Title.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	textStyle: PropTypes.string,
};

Title.defaultProps = {
	title: '',
	subtitle: '',
	textStyle: 'mediumCenter',
};

function Title(props) {
	const { title, subtitle, textStyle } = props;

	const styleClass =
		textStyle === 'bigCenter'
			? 'c-title-big-center'
			: textStyle === 'smallLeft'
			? 'c-title-small-left'
			: '';
	return (
		<div className={`c-title ${styleClass}`}>
			{textStyle === 'bigCenter' ? (
				<h1 className="c-title-big-center__title">{title}</h1>
			) : textStyle === 'smallLeft' ? (
				<h3 className="c-title-small-left__title">{title}</h3>
			) : (
				<h2 className="c-title__title">{title}</h2>
			)}
			<p className="c-title__subtitle">{subtitle}</p>
		</div>
	);
}

export default Title;
