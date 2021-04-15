import React from 'react';
import PropTypes from 'prop-types';

Tooltip.propTypes = {
	title: PropTypes.string,
	content: PropTypes.array,
};

Tooltip.defaultProps = {
	title: '',
	content: null,
};

function Tooltip(props) {
	const { title, content } = props;
	if (!content)
		return (
			<div className="c-tooltip">
				<p className="c-tooltip__title">{title}</p>
			</div>
		);
	return (
		<div className="c-tooltip">
			<p className="c-tooltip__title">{title}</p>
			<div className="c-tooltip__content">
				{content.map((item, index) => {
					return (
						<div key={index} className="c-tooltip__item">
							<p className="c-tooltip__label">{item.label}</p>
							<pre style={{ whiteSpace: 'pre-line' }}>{item.value}</pre>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Tooltip;
