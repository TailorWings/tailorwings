import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

MeasurementForm.propTypes = {
	measurements: PropTypes.array,
};

MeasurementForm.defaultProps = {
	measurements: null,
};

function MeasurementForm(props) {
	const { measurements } = props;

	if (!measurements) return <Fragment />;
	return (
		<div className="c-msmt-form">
			<p className="c-msmt-form__title">List of measurements</p>
			<div className="c-msmt-form__list">
				{measurements.map((measurement, index) => {
					return (
						<div key={index} className="c-msmt-form__item">
							<TextInput label={measurement.label || ''} content={measurement.value || ''} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default MeasurementForm;
