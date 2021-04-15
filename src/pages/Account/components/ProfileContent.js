import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SmallButton2 from '../../../components/Button/SmallButton2';
import TextInput from '../../../components/Input/TextInput';
import ComponentLoader from '../../../components/ComponentLoader';
import ContactInfoForm from '../../../components/Form/ContactInfoForm';
import ShippingForm from '../../../components/Form/ShippingForm';
import PaymentInfo from '../../../components/PaymentInfo';

const TEST_SHIPPING_INFO = [
	{
		label: 'Name',
		value: '',
	},
	{
		label: 'Phone number',
		value: '',
	},
	{
		label: 'City',
		value: '',
	},
	{
		label: 'District',
		value: '',
	},
	{
		label: 'Ward',
		value: '',
	},
	{
		label: 'Address',
		value: '',
	},
];

ProfileContent.propTypes = {};

function ProfileContent(props) {
	/*--------------*/
	const [loading, setLoading] = useState(true);
	/*--------------*/
	useEffect(() => {
		/*--------------*/
		let timer = setTimeout(() => {
			setLoading(false);
		}, 500);
		/*--------------*/
		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (loading)
		return (
			<div className="c-profile-content">
				<ComponentLoader />
			</div>
		);
	return (
		<div className="c-profile-content">
			<div className="c-profile-content__header">
				<div className="c-profile-content-basic-info">
					<div className="c-profile-content-basic-info__avatar"></div>
					<div className="c-profile-content-basic-info__text">
						<p className="c-profile-content-basic-info__name">mailenammrk21</p>
						<p className="c-profile-content-basic-info__pw-change">Change password</p>
					</div>
				</div>
				<div className="c-profile-content-button">
					<div className="c-profile-content-button__edit">
						<SmallButton2 text="edit" />
					</div>
					<div className="c-profile-content-button__save">
						<SmallButton2 text="save" isActive />
					</div>
				</div>
			</div>
			<div className="c-profile-content__content">
				<div className="c-profile-content-main-info">
					<p className="c-profile-content-main-info__title">Contact Info</p>
					<ContactInfoForm />
				</div>
				<div className="c-profile-content-main-info">
					<p className="c-profile-content-main-info__title">Shipping Info</p>
					<ShippingForm shippingInfo={TEST_SHIPPING_INFO} />
				</div>
				<div className="c-profile-content-main-info">
					<p className="c-profile-content-main-info__title">Payment Methods</p>
					<PaymentInfo buttonText="Remove" />
					{/* <div className="c-profile-content-main-info__wrapper">
						{new Array(6).fill('label').map((label, index) => {
							return (
								<div key={index} className="c-profile-content-main-info__input">
									<TextInput label={label} />
								</div>
							);
						})}
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default ProfileContent;
