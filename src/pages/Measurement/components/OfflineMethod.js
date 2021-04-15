import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AppointmentForm from '../../../components/Form/AppointmentForm';
import Picker from '../../../components/Picker';
import TextInput from '../../../components/Input/TextInput';
import Title from '../../../components/Title';
import ProcessAction from '../../../components/ProcessAction';

OfflineMethod.propTypes = {
	appointmentInfo: PropTypes.array,
	estimatedSizes: PropTypes.array,
	onInputChange: PropTypes.func,
	onSizeClick: PropTypes.func,
	onNextClick: PropTypes.func,
};

OfflineMethod.defaultProps = {
	appointmentInfo: null,
	estimatedSizes: null,
	onInputChange: null,
	onSizeClick: null,
	onNextClick: null,
};

function OfflineMethod(props) {
	const { appointmentInfo, estimatedSizes, onInputChange, onSizeClick, onNextClick } = props;

	if (!appointmentInfo || !estimatedSizes || !onInputChange || !onSizeClick) return <Fragment />;
	return (
		<div className="c-msmt-offline">
			<div className="c-msmt-offline__header">
				<Title
					title="Make an appointment with us"
					subtitle="Please send us the information below. We will get back to you as soon as possible."
					textStyle="smallLeft"
				/>
				{/* <p className="c-msmt-offline__title">Make an appointment with us</p>
				<p className="c-msmt-offline__desc">
					Please send us the information below. We will get back to you as soon as possible.
				</p> */}
			</div>
			<div className="c-msmt-offline__form">
				<AppointmentForm appointmentInfo={appointmentInfo} />
				{/* {appointmentInfo.map((info, index) => {
					return (
						<div key={index} className="c-msmt-offline__input">
							<TextInput label={info.label} />
						</div>
					);
				})} */}
			</div>
			<div className="c-msmt-offline-estimated-sizes">
				<p className="c-msmt-offline-estimated-sizes__text">Please choose your estimated size!</p>
				<Picker list={estimatedSizes} onItemClick={onSizeClick} />
			</div>
			<ProcessAction backLink="/fabric" onNextClick={() => onNextClick('', 'offline')} />
		</div>
	);
}

export default OfflineMethod;
