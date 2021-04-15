import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Input/TextInput';

AppointmentForm.propTypes = {
	appointmentInfo: PropTypes.array,
};

AppointmentForm.defaultProps = {
	appointmentInfo: null,
};

function AppointmentForm(props) {
	const { appointmentInfo } = props;

	if (!appointmentInfo) return <Fragment />;
	return (
		<div className="c-appoinment-form">
			<div className="c-appoinment-form__content">
				{appointmentInfo.map((info, index) => {
					return (
						<div key={index} className="c-appoinment-form__input">
							<TextInput label={info.label} content={info.content} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default AppointmentForm;
