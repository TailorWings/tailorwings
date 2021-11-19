import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { removeWhiteSpace } from '../../services/Functions/commonFunctions';
import InputField from '../FormControl/InputField';
import TextInput from '../Input/TextInput';
import leftArrowIcon from '../../assets/icons/slider-arrow-left.png'
import rightArrowIcon from '../../assets/icons/slider-arrow-right.png'
import { useTranslation, withTranslation, Trans } from 'react-i18next';


MeasurementForm.propTypes = {
	measurements: PropTypes.array,
	title: PropTypes.string,
	onSubmit: PropTypes.func,
	onActionBack: PropTypes.func,
	onActionNext: PropTypes.func,
	disabled: PropTypes.bool,
	onGetLatestMsmt: PropTypes.func,
};

MeasurementForm.defaultProps = {
	measurements: null,
	title: 'Measurement',
	onSubmit: null,
	disabled: false,
	onActionBack: null,
	onActionNext: null,
};

function MeasurementForm(props) {
	const { measurements, title, onSubmit, disabled, onGetLatestMsmt, isDisplayFull, onActionBack, onActionNext } = props;
	// console.log("MeasurementForm measurements", measurements)
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
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
	useEffect(() => {
		measurements.forEach((msmt, index) => {
			form.setValue(removeWhiteSpace(msmt.label), msmt.value);
		})
		
	}, [measurements]);
	/*--------------*/
	function handleSubmit(values) {
		console.log("handleSubmit values", values);
		onSubmit(values, 'online');
	}
	/*--------------*/
	
	if (!measurements) return <Fragment />;
	return (
		<div className="c-msmt-form">
			<div className="c-msmt-form__title">
				{ isDisplayFull && <span>{title}</span>}
				{!disabled && onGetLatestMsmt ? (
					<span onClick={onGetLatestMsmt} className="c-msmt-form__title-sync">
						Get the latest measurement
					</span>
				) : (
					<Fragment />
				)}
			</div>
			{/* <div className="c-msmt-form__container">
				<button className="c-msmt-form__btn-left" onClick={onActionBack}>
					<img src={leftArrowIcon} alt="icon" />
				</button>
				<button className="c-msmt-form__btn-right" onClick={onActionNext}>
					<img src={rightArrowIcon} alt="icon" />
				</button>
			</div> */}
			<form
				id="msmt-form"
				className={`c-msmt-form__list ${!isDisplayFull ? 'c-msmt-form__display-one-item' : ''}`}
				onSubmit={form.handleSubmit(handleSubmit)}
				noValidate="novalidate"
			>
				{measurements.map((measurement, index) => {
					return (
						<div key={index} className="c-msmt-form__item">
							{disabled ? (
								<TextInput
									label={ ( isENG ? measurement.label : measurement.labelVN ) || ''}
									value={measurement.value || ''}
									// placeHolder="(cm)"
									suffix="(cm)"
									disabled
									maxlength="3"
								/>
							) : (
								<InputField
									name={removeWhiteSpace(measurement.label)}
									label={isENG ? measurement.label : measurement.labelVN }
									// placeHolder="(cm)"
									suffix="(cm)"
									form={form}
									value={measurement.value}
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
