import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../../../components/Button/SmallButton';

RequirementClotheStyles.propTypes = {
	styles: PropTypes.array,
	onStyleClick: PropTypes.func,
};

RequirementClotheStyles.defaultProps = {
	styles: null,
	onStyleClick: null,
};

function RequirementClotheStyles(props) {
	const { styles, onStyleClick } = props;

	if (!styles || !onStyleClick) return <Fragment />;
	return (
		<div className="c-rq-clothe-styles">
			<ul className="c-rq-clothe-styles__list">
				{styles.map((style, index) => {
					return (
						<li
							key={index}
							className="c-rq-clothe-styles__item"
							onClick={() => onStyleClick(index)}
						>
							<SmallButton text={style.style} isActive={style.active} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default RequirementClotheStyles;
