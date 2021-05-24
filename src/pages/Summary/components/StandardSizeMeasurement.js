import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Picker from '../../../components/Picker';

StandardSizeMeasurement.propTypes = {
	standardSizeInfo: PropTypes.array,
	onStandardSizeClick: PropTypes.func,
};

StandardSizeMeasurement.defaultProps = {
	standardSizeInfo: null,
	onStandardSizeClick: null,
};

function StandardSizeMeasurement(props) {
	const { standardSizeInfo, onStandardSizeClick } = props;

	if (!standardSizeInfo) return <Fragment />;
	let currentActiveSize = standardSizeInfo.find(size => size.active);
	return (
		<div className="c-standard-size-msmt-sum">
			<p className="c-standard-size-msmt-sum__title">Your Standard Size</p>
			<Picker list={currentActiveSize ? new Array(1).fill(currentActiveSize) : []} onItemClick={onStandardSizeClick} />
		</div>
	);
}

export default StandardSizeMeasurement;
