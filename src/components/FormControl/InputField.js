import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from '../Input/TextInput';
InputField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
};

function InputField(props) {
	const { form, name, label, disabled } = props;
	const { register, errors, formState } = form;
	const hasError = !!errors[name];
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ onChange, value }) => (
				<TextInput
					label={label}
					disabled={disabled}
					onChange={onChange}
					value={value}
					register={register}
					hasError={hasError}
					errors={hasError ? 'Please input a positive number' : ''}
				/>
			)}
		></Controller>
	);
}

export default InputField;
