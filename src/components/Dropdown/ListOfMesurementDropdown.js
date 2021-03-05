import React from 'react';
import PropTypes from 'prop-types';
import arrowDownSolidIcon from '../../assets/icons/arrow-down-solid.svg';

ListOfMesurementDropdown.propTypes = {};

function ListOfMesurementDropdown(props) {
	return (
		<div className="c-list-of-msmt-dropdown">
			<span className="c-list-of-msmt-dropdown__text">List of measurements</span>
			<img className="c-list-of-msmt-dropdown__icon" src={arrowDownSolidIcon} alt="icon" />
		</div>
	);
}

export default ListOfMesurementDropdown;
