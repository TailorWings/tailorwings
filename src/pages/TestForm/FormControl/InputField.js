import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { Controller } from 'react-hook-form';
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

	console.log('hasError :>> ', hasError);
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
					errors={errors.title?.message && 'Vui lòng nhập số'}
				/>
			)}
		></Controller>
	);
}

export default InputField;
