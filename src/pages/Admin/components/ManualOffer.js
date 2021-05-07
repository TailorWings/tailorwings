import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../components/Input/TextInput';
import MediumButton from '../../../components/Button/MediumButton';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

ManualOffer.propTypes = {
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	isReset: PropTypes.bool,
	tailors: PropTypes.array,
};

ManualOffer.defaultProps = {
	onConfirm: null,
	onCancel: null,
	isReset: false,
	tailors: null,
};

function ManualOffer(props) {
	const { onConfirm, onCancel, isReset, tailors } = props;
	/*--------------*/
	const [offers, setOffers] = useState(
		new Array(3).fill({
			tailor: '',
			wage: '',
			price: '',
			duration: '',
			picked: false,
		})
	);
	/*--------------*/
	useEffect(() => {
		if (isReset) {
			setOffers(
				new Array(3).fill({
					tailor: '',
					wage: '',
					price: '',
					duration: '',
					fabricNumber: '',
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
	/*********************************
	 *  Description:
	 */
	function onCancelClick() {
		setOffers(
			new Array(3).fill({
				tailor: '',
				wage: '',
				price: '',
				duration: '',
				fabricNumber: '',
				picked: false,
			})
		);
		onCancel();
	}
	/************_END_****************/

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));
	const classes = useStyles();

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
								{/* <TextInput
									label="name"
									value={offer.name}
									onChange={(e) => onInputChange(index, 'name', e)}
								/> */}
								{tailors ? (
									<FormControl className={classes.formControl}>
										<InputLabel id="demo-simple-select-label">Tailor</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={offer.tailor}
											onChange={(e) => onInputChange(index, 'tailor', e)}
										>
											{tailors.map((tailor) => {
												return (
													<MenuItem key={tailor.id} value={tailor.id}>
														{tailor.name}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								) : (
									<Fragment />
								)}
								<TextInput
									label="wage (x1000vnd)"
									value={offer.wage}
									onChange={(e) => onInputChange(index, 'wage', e)}
								/>
								<TextInput
									label="price (x1000vnd)"
									value={offer.price}
									onChange={(e) => onInputChange(index, 'price', e)}
								/>
								<TextInput
									label="duration (days)"
									value={offer.duration}
									onChange={(e) => onInputChange(index, 'duration', e)}
								/>
								<TextInput
									label="fabric number (m)"
									value={offer.fabircNumber}
									onChange={(e) => onInputChange(index, 'fabricNumber', e)}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="c-admin-manual-offer__btn">
				<div className="--wrapper" onClick={onCancelClick}>
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
