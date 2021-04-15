import PropTypes from 'prop-types';
import React from 'react';

TextInput.propTypes = {
	label: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.string,
	hasError: PropTypes.bool,
	errors: PropTypes.object,
};

TextInput.defaultProps = {
	label: '',
	disabled: false,
};

function TextInput(props) {
	const { label, disabled, onChange, value, errors } = props;

	return (
		<div className="c-text-input">
			<p className="c-text-input__error">{errors}</p>
			<input
				type="text"
				required
				className="c-text-input__field"
				id="text-input"
				disabled={disabled}
				onChange={onChange}
				value={value}
			/>
			<label htmlFor="text-input" className="c-text-input__label">
				{label}
			</label>
		</div>
	);
}

export default TextInput;
