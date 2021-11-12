import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { removeWhiteSpace } from '../../services/Functions/commonFunctions';
import InputField from '../FormControl/InputField';
import TextInput from '../Input/TextInput';

MeasurementForm.propTypes = {
	measurements: PropTypes.array,
	title: PropTypes.string,
	onSubmit: PropTypes.func,
	disabled: PropTypes.bool,
	onGetLatestMsmt: PropTypes.func,
};

MeasurementForm.defaultProps = {
	measurements: null,
	title: 'Measurement',
	onSubmit: null,
	disabled: false,
};

function MeasurementForm(props) {
	const { measurements, title, onSubmit, disabled, onGetLatestMsmt } = props;
	const msmtDefaultValue = Object.fromEntries(
		measurements.map((msmt) => [removeWhiteSpace(msmt.label), msmt.value])
	);
	const schemaValidateShape = Object.fromEntries(
		measurements.map((msmt) => [
			removeWhiteSpace(msmt.label),
			yup
				.number('Vui lòng nhập số')
				.max(999)
				.positive('Vui lòng nhập số')
				.integer('Vui lòng nhập số')
				.required('Please enter'),
		])
	);
	/*--------------*/
	const schema = yup.object().shape({ ...schemaValidateShape });
	const form = useForm({
		defaultValues: { ...msmtDefaultValue },
		resolver: yupResolver(schema),
	});
	/*--------------*/
	function handleSubmit(values) {
		onSubmit(values, 'online');
	}
	/*--------------*/
	if (!measurements) return <Fragment />;
	return (
		<div className="c-msmt-form">
			<div className="c-msmt-form__title">
				<span>{title}</span>
				{!disabled && onGetLatestMsmt ? (
					<span onClick={onGetLatestMsmt} className="c-msmt-form__title-sync">
						Get the latest measurement
					</span>
				) : (
					<Fragment />
				)}
			</div>
			<form
				id="msmt-form"
				className="c-msmt-form__list"
				onSubmit={form.handleSubmit(handleSubmit)}
				noValidate="novalidate"
			>
				{measurements.map((measurement, index) => {
					return (
						<div key={index} className="c-msmt-form__item">
							{disabled ? (
								<TextInput
									label={measurement.label || ''}
									value={measurement.value || ''}
									// placeHolder="(cm)"
									suffix="(cm)"
									disabled
									maxlength="3"
								/>
							) : (
								<InputField
									name={removeWhiteSpace(measurement.label)}
									label={measurement.label}
									// placeHolder="(cm)"
									suffix="(cm)"
									form={form}
									maxValue={999}
								/>
							)}
						</div>
					);
				})}
			</form>
		</div>
	);
}

export default MeasurementForm;
