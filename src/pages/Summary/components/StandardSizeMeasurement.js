import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../components/Menu';

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
	return (
		<div className="c-standard-size-msmt-sum">
			<Menu list={standardSizeInfo} onItemClick={onStandardSizeClick} />
		</div>
	);
}

export default StandardSizeMeasurement;
