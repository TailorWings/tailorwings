import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MeasurementForm from '../../../components/Form/MeasurementForm';

OnlineMeasurement.propTypes = {
	measurements: PropTypes.array,
};

OnlineMeasurement.defaultProps = {
	measurements: null,
};

function OnlineMeasurement(props) {
	const { measurements } = props;

	if (!measurements) return <Fragment />;
	return (
		<div className="c-online-msmt-sum">
			<MeasurementForm measurements={measurements} disabled={true} />
		</div>
	);
}

export default OnlineMeasurement;
