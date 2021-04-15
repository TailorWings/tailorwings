import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../components/Input/TextInput';
import MediumButton from '../../../components/Button/MediumButton';

ManualOffer.propTypes = {
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
};

ManualOffer.defaultProps = {
	onConfirm: null,
	onCancel: null,
};

function ManualOffer(props) {
	const { onConfirm, onCancel } = props;
	/*--------------*/
	const [offers, setOffers] = useState(
		new Array(3).fill({
			name: '',
			price: '',
			duration: '',
			stars: '',
		})
	);

	/*********************************
	 *  Description:
	 */
	function onInputChange(changedIndex, field, e) {
		e.preventDefault();
		let updatedOffers = [...offers];
		let changedOffer = updatedOffers[changedIndex];
		changedOffer[field] = e.target.value;
		updatedOffers[changedIndex] = { ...changedOffer };
		setOffers(updatedOffers);
	}
	/************_END_****************/

	if (!onConfirm || !onCancel) return <Fragment />;
	return (
		<div className="c-admin-manual-offer">
			<p className="c-admin-manual-offer__title">Manual Offer</p>
			<div className="c-admin-manual-offer__form">
				{offers.map((offer, index) => {
					return (
						<div className="c-admin-manual-offer__input">
							<p>{index === 0 ? `Tailor ${index + 1}`}</p>
							<div className="--wrapper">
								<TextInput
									label="name"
									value={offer.name}
									onChange={(e) => onInputChange(index, 'name', e)}
								/>
								<TextInput
									label="wage"
									value={offer.wage}
									onChange={(e) => onInputChange(index, 'wage', e)}
								/>
								<TextInput
									label="duration"
									value={offer.duration}
									onChange={(e) => onInputChange(index, 'duration', e)}
								/>
								<TextInput
									label="stars"
									value={offer.stars}
									onChange={(e) => onInputChange(index, 'stars', e)}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="c-admin-manual-offer__btn">
				<div className="--wrapper" onClick={onCancel}>
					<MediumButton text="cancel" />
				</div>
				<div className="--wrapper" onClick={() => onConfirm(offers)}>
					<MediumButton text="confirm" isActive />
				</div>
			</div>
		</div>
	);
}

export default ManualOffer;
