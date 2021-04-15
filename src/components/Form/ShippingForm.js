import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Input/TextInput';

ShippingForm.propTypes = {
	shippingInfo: PropTypes.array,
};

ShippingForm.defaultProps = {
	shippingInfo: null,
};

function ShippingForm(props) {
	const { shippingInfo } = props;

	if (!shippingInfo) return <Fragment />;
	return (
		<div className="c-shipping-form">
			<div className="c-shipping-form__content">
				{shippingInfo.map((info, index) => {
					return (
						<div key={index} className="c-shipping-form__input">
							<TextInput label={info.label} content={info.content} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ShippingForm;
