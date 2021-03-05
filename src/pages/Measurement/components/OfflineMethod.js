import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../components/Menu';
import TextInput from '../../../components/TextInput';

OfflineMethod.propTypes = {
	appointmentInfo: PropTypes.array,
	estimatedSizes: PropTypes.array,
	onInputChange: PropTypes.func,
	onSizeClick: PropTypes.func,
};

OfflineMethod.defaultProps = {
	appointmentInfo: null,
	estimatedSizes: null,
	onInputChange: null,
	onSizeClick: null,
};

function OfflineMethod(props) {
	const { appointmentInfo, estimatedSizes, onInputChange, onSizeClick } = props;

	if (!appointmentInfo || !estimatedSizes || !onInputChange || !onSizeClick) return <Fragment />;
	return (
		<div className="c-msmt-offline">
			<div className="c-msmt-offline__header">
				<p className="c-msmt-offline__title">Make an appointment with us</p>
				<p className="c-msmt-offline__desc">
					Please send us the information below. We will get back to you as soon as possible.
				</p>
			</div>
			<div className="c-msmt-offline__form">
				{appointmentInfo.map((info, index) => {
					return (
						<div key={index} className="c-msmt-offline__input">
							<TextInput label={info.label} />
						</div>
					);
				})}
			</div>
			<div className="c-msmt-offline-estimated-sizes">
				<p className="c-msmt-offline-estimated-sizes__text">Please choose your estimated size!</p>
				<Menu list={estimatedSizes} onItemClick={onSizeClick} />
			</div>
		</div>
	);
}

export default OfflineMethod;
