import React from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../../../components/Button/MediumButton';
import TextInput from '../../../components/TextInput';

ProfileContent.propTypes = {};

function ProfileContent(props) {
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
						<MediumButton text="edit" />
					</div>
					<div className="c-profile-content-button__save">
						<MediumButton text="save" isActive />
					</div>
				</div>
			</div>
			<div className="c-profile-content__content">
				<div className="c-profile-content-main-info">
					<p className="c-profile-content-main-info__title">Contact Info</p>
					<div className="c-profile-content-main-info__wrapper">
						{new Array(6).fill('label').map((label, index) => {
							return (
								<div key={index} className="c-profile-content-main-info__input">
									<TextInput label={label} />
								</div>
							);
						})}
					</div>
				</div>
				<div className="c-profile-content-main-info">
					<p className="c-profile-content-main-info__title">Shipping Info</p>
					<div className="c-profile-content-main-info__wrapper">
						{new Array(6).fill('label').map((label, index) => {
							return (
								<div key={index} className="c-profile-content-main-info__input">
									<TextInput label={label} />
								</div>
							);
						})}
					</div>
				</div>
				<div className="c-profile-content-main-info">
					<p className="c-profile-content-main-info__title">Payment Info</p>
					<div className="c-profile-content-main-info__wrapper">
						{new Array(6).fill('label').map((label, index) => {
							return (
								<div key={index} className="c-profile-content-main-info__input">
									<TextInput label={label} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileContent;
