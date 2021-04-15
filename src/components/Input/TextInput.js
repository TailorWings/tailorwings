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
};

TextInput.defaultProps = {
	label: '',
	disabled: false,
	maxlength: null,
};

function TextInput(props) {
	const { label, disabled, onChange, value, errors, maxlength } = props;
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
				maxLength={maxlength || '1000'}
			/>
			<label htmlFor="text-input" className="c-text-input__label">
				{label}
			</label>
		</div>
	);
}

export default TextInput;
