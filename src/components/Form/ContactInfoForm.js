import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Input/TextInput';
import SelectInput from '../Input/SelectInput';

const TEST_TEXT_FIELDS = [
	{
		title: 'First name',
		value: 'Phuong Cham',
	},
	{
		title: 'last name',
		value: 'La',
	},
	{
		title: 'email',
		value: 'cham@lalizs.com',
	},
	{
		title: 'phone number',
		value: '0902541398',
	},
];

const TEST_SEX_INFO = {
	id: 'sex',
	name: 'Sex',
	options: ['male', 'female', 'others'],
};

const TEST_DAY_INFO = {
	id: 'day',
	name: 'day',
	options: Array.from(Array(31).keys()).map((number) => number + 1),
};

const TEST_MONTH_INFO = {
	id: 'month',
	name: 'month',
	options: Array.from(Array(12).keys()).map((number) => number + 1),
};

const TEST_YEAR_INFO = {
	id: 'year',
	name: 'year',
	options: Array.from(Array(new Date().getFullYear() - 1920).keys())
		.reverse()
		.map((year) => year + 1920 + 1),
};

ContactInfoForm.propTypes = {};

function ContactInfoForm(props) {
	return (
		<div className="c-contact-info-form">
			<div className="c-contact-info-form-text-input">
				{TEST_TEXT_FIELDS.map((field, index) => {
					return (
						<div key={index} className="c-contact-info-form-text-input__field">
							<TextInput label={field.title} content={field.value} />
						</div>
					);
				})}
			</div>
			<div className="c-contact-info-form__select">
				<div className="c-contact-info-form-sex-input">
					<SelectInput selectInfo={TEST_SEX_INFO} />
				</div>
				<div className="c-contact-info-form-birthday-input">
					<span className="c-contact-info-form-birthday-input__title">Birth date</span>
					<div className="c-contact-info-form-birthday-input-content">
						<div className="c-contact-info-form-birthday-input-content__field">
							<SelectInput selectInfo={TEST_DAY_INFO} />
						</div>
						<div className="c-contact-info-form-birthday-input-content__field">
							<SelectInput selectInfo={TEST_MONTH_INFO} />
						</div>
						<div className="c-contact-info-form-birthday-input-content__field">
							<SelectInput selectInfo={TEST_YEAR_INFO} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactInfoForm;
