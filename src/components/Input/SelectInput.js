import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import arrowDownSolidIcon from '../../assets/icons/arrow-down-solid.svg';

SelectInput.propTypes = {
	selectInfo: PropTypes.object,
};

SelectInput.defaultProps = {
	selectInfo: null,
};

// selectInfo contains objects like: { id, name, options(array), activeIndex }

function SelectInput(props) {
	const { selectInfo } = props;

	if (!selectInfo) return <Fragment />;
	return (
		<div className="c-select-input">
			<div className="c-select-input__wrapper">
				<span className="c-select-input__text">
					{selectInfo?.activeIndex
						? selectInfo?.options[selectInfo.activeIndex]
						: selectInfo?.options[0]}
				</span>
				<img className="c-select-input__icon" src={arrowDownSolidIcon} alt="icon" />
			</div>
			<ul className="c-select-input__list">
				{selectInfo.options &&
					selectInfo.options.map((option, index) => {
						return (
							<li key={index} className="c-select-input__item">
								<p>{option}</p>
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default SelectInput;
