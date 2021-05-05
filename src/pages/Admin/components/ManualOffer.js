import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../components/Input/TextInput';
import MediumButton from '../../../components/Button/MediumButton';

ManualOffer.propTypes = {
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	isReset: PropTypes.bool,
};

ManualOffer.defaultProps = {
	onConfirm: null,
	onCancel: null,
	isReset: false,
};

function ManualOffer(props) {
	const { onConfirm, onCancel, isReset } = props;
	/*--------------*/
	const [offers, setOffers] = useState(
		new Array(3).fill({
			name: '',
			wage: '',
			duration: '',
			stars: '',
			picked: false,
		})
	);
	/*--------------*/
	useEffect(() => {
		if (isReset) {
			setOffers(
				new Array(3).fill({
					name: '',
					wage: '',
					duration: '',
					stars: '',
					picked: false,
				})
			);
		}
	}, [isReset]);
	/*********************************
	 *  Description:
	 */
	function onInputChange(changedIndex, field, e) {
		e.preventDefault();
		let updatedOffers = [...offers];
		let changedOffer = { ...updatedOffers[changedIndex] };
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
						<div key={index} className="c-admin-manual-offer__input">
							<p>{index === 0 ? 'Real Tailor' : `Tailor ${index}`}</p>
							<div className="--wrapper">
								<TextInput
									label="name"
									value={offer.name}
									onChange={(e) => onInputChange(index, 'name', e)}
								/>
								<TextInput
									label="wage (x1000vnd)"
									value={offer.wage}
									onChange={(e) => onInputChange(index, 'wage', e)}
								/>
								<TextInput
									label="duration (days)"
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
