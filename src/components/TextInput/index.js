import React from 'react';
import PropTypes from 'prop-types';

TextInput.propTypes = {
	label: PropTypes.string,
	content: PropTypes.string,
};

TextInput.defaultProps = {
	label: '',
	content: '',
};

function TextInput(props) {
	const { label, content } = props;
	return (
		<div className="c-text-input">
			<input type="text" required className="c-text-input__field" id="text-input" value={content} />
			<label htmlFor="text-input" className="c-text-input__label">
				{label}
			</label>
		</div>
	);
}

export default TextInput;
