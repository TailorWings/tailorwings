import PropTypes from 'prop-types';
import React from 'react';

TextInput.propTypes = {
	label: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	hasError: PropTypes.bool,
	errors: PropTypes.string,
	maxlength: PropTypes.string,
	placeHolder: PropTypes.string,
	suffix: PropTypes.string,
	id: PropTypes.string,
	type: PropTypes.string,
};

TextInput.defaultProps = {
	label: '',
	disabled: false,
	maxlength: null,
	placeHolder: null,
	suffix: null,
	id: '',
	type: 'text'
};

function TextInput(props) {
	const { label, disabled, onChange, value, errors, maxlength, placeHolder, suffix, id, type } = props;

	return (
		<div className="c-text-input">
			{errors && <p className="c-text-input__error">{errors}</p>}
			<label className="c-text-input__wrapper" htmlFor={`text-input-${label}`}>
				{suffix && <span className="c-text-input__suffix">{suffix}</span>}
				<input
					type={type}
					required
					className="c-text-input__field"
					id={id}
					disabled={disabled}
					onChange={onChange}
					value={value}
					maxLength={maxlength || '1000'}
					placeholder={placeHolder ? `${placeHolder}` || '' : ''}
				/>
			</label>
			<label htmlFor={`text-input-${label}`} className="c-text-input__label">
				{label}
			</label>
		</div>
	);
}

export default TextInput;
