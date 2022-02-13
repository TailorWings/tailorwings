import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from '../Input/TextInput';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
InputField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	placeHolder: PropTypes.string,
	suffix: PropTypes.string,
};

function InputField(props) {
	const { form, name, label, disabled, placeHolder, suffix, onChange: onChangeProp } = props;
	const { register, errors, formState } = form;
	const hasError = !!errors[name];
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	function onChangeTotal(fn1, fn2) {
		return function(val) {
			fn1(val);
			fn2(val);
		}
	}
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ onChange, value }) => (
				<TextInput
					label={label}
					disabled={disabled}
					onChange={(val) => {onChange(val); onChangeProp(val); }}
					value={value}
					register={register}
					hasError={hasError}
					errors={hasError ? (isENG ? 'Please input a positive interger' : 'Vui lòng nhập một số nguyên') : ''}
					placeHolder={placeHolder}
					suffix={suffix || null}
					maxlength="3"
				/>
			)}
		></Controller>
	);
}

export default InputField;
