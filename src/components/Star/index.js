import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import yellowStarIcon from '../../assets/icons/yellow-star.svg';

Star.propTypes = {
	number: PropTypes.number,
};

Star.defaultProps = {
	number: null,
};

function Star(props) {
	const { number } = props;

	if (!number) return <Fragment />;
	return (
		<div className="c-star">
			{new Array(number).fill(yellowStarIcon).map((star, index) => {
				return <img key={index} src={star} alt="star" />;
			})}
		</div>
	);
}

export default Star;
