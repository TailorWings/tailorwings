import React from 'react';
import PropTypes from 'prop-types';
import InputField from './FormControl/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

Form.propTypes = {
	onSubmit: PropTypes.func,
};

Form.defaultProps = {
	onSubmit: null,
};

function Form(props) {
	const schema = yup.object().shape({
		title: yup
			.number('Vui lòng nhập số')
			.positive('Vui lòng nhập số')
			.integer('Vui lòng nhập số')
			.required('Please enter'),
	});
	const form = useForm({
		defaultValues: {
			title: '',
		},
		resolver: yupResolver(schema),
	});

	function handleSubmit(values) {
		console.log('values :>> ', values);
	}

	return (
		<form id="my-form" onSubmit={form.handleSubmit(handleSubmit)}>
			Form
			<InputField name="title" label="Todo" form={form} />
		</form>
	);
}

export default Form;
