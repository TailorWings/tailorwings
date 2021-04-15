import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

TestForm.propTypes = {};

TestForm.defaultProps = {};

/*********************************
 *  Description:
 *
 *
 *  Call by:
 */
function handleFormSubmit(value) {
	console.log('Form Submit :>> ', value);
}
/************_END_****************/

function TestForm(props) {
	return (
		<div>
			<Form onSubmit={handleFormSubmit} />
			<div>
				<button type="submit" form="my-form">
					<span>Submit</span>
				</button>
			</div>
		</div>
	);
}

export default TestForm;
