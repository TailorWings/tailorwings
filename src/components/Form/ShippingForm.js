import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Input/TextInput';

ShippingForm.propTypes = {
	shippingInfo: PropTypes.array,
	onInputChange: PropTypes.func,
	disabled: PropTypes.bool,
};

ShippingForm.defaultProps = {
	shippingInfo: null,
	onInputChange: null,
	disabled: false,
};

function ShippingForm(props) {
	const { shippingInfo, onInputChange, disabled } = props;

	if (!shippingInfo) return <Fragment />;
	return (
		<div className="c-shipping-form">
			<div className="c-shipping-form__content">
				{shippingInfo.map((info, index) => {
					return (
						<div key={index} className="c-shipping-form__input">
							<TextInput
								label={info.label}
								value={info.value}
								onChange={(e) => onInputChange(info.id, e)}
								disabled={disabled}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ShippingForm;
