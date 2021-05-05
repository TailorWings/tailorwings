// import React from 'react';
// import PropTypes from 'prop-types';

// TextInput.propTypes = {
// 	label: PropTypes.string,
// 	content: PropTypes.string,
// };

// TextInput.defaultProps = {
// 	label: '',
// 	content: '',
// };

// function TextInput(props) {
// 	const { label, content } = props;
// 	return (
// 		<div className="c-text-input">
// 			<input
// 				type="text"
// 				required
// 				className="c-text-input__field"
// 				id="text-input"
// 				value={content || ''}
// 			/>
// 			<label htmlFor="text-input" className="c-text-input__label">
// 				{label}
// 			</label>
// 		</div>
// 	);
// }

// export default TextInput;

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
};

TextInput.defaultProps = {
	label: '',
	disabled: false,
	maxlength: null,
	placeHolder: null,
	suffix: null,
};

function TextInput(props) {
	const { label, disabled, onChange, value, errors, maxlength, placeHolder, suffix } = props;

	return (
		<div className="c-text-input">
			<p className="c-text-input__error">{errors}</p>
			<label className="c-text-input__wrapper" htmlFor={`text-input-${label}`}>
				{suffix && <span className="c-text-input__suffix">{suffix}</span>}
				<input
					type="text"
					required
					className="c-text-input__field"
					id={`text-input-${label}`}
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
