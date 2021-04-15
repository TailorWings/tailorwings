import React from 'react';
import PropTypes from 'prop-types';
import arrowDownSolidIcon from '../../assets/icons/arrow-down-solid.svg';

ListOfMesurementDropdown.propTypes = {
	list: PropTypes.array,
};

ListOfMesurementDropdown.defaultProps = {
	list: new Array(10).fill('value'),
};

function ListOfMesurementDropdown(props) {
	const { list } = props;

	return (
		<div className="c-list-of-msmt-dropdown">
			<div className="c-list-of-msmt-dropdown__wrapper">
				<span className="c-list-of-msmt-dropdown__text">List of measurements</span>
				<img className="c-list-of-msmt-dropdown__icon" src={arrowDownSolidIcon} alt="icon" />
			</div>
			<ul className="c-list-of-msmt-dropdown__list">
				{list.map((item, index) => {
					return (
						<li key={index} className="c-list-of-msmt-dropdown__item">
							<p>{`${index + 1}. ${item}`}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ListOfMesurementDropdown;
