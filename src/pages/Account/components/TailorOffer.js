import React from 'react';
import PropTypes from 'prop-types';
import Star from '../../../components/Star';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton1 from '../../../components/Button/SmallButton1';
import classNames from 'classnames';
import Label from '../../../components/Label';

TailorOffer.propTypes = {
	offerInfo: PropTypes.array,
	onTailorPick: PropTypes.func,
};

TailorOffer.defaultProps = {
	offerInfo: null,
	onTailorPick: null,
};

function TailorOffer(props) {
	const { offerInfo, onTailorPick } = props;
	console.log('offerInfo :>> ', offerInfo);
	if (!offerInfo || offerInfo.length < 1) return <div>Waiting for tailors</div>;
	return (
		<div className="c-tailor-offer">
			{offerInfo.map((offer, index) => {
				return (
					<div key={index} className="c-tailor-offer__item">
						<div
							className={classNames('c-tailor-offer__index', {
								'c-tailor-offer__index--active': offer.picked,
							})}
						>
							<span>{index + 1}</span>
						</div>
						<div className="c-tailor-offer__avatar">
							{offer.avatar && <img src={offer.avatar} alt="avatar" />}
						</div>
						<div className="c-tailor-offer-tailor">
							<p className="c-tailor-offer-tailor__name">{offer.tailor.name || 'Empty'}</p>
							<Star number={5} />
						</div>
						<div className="c-tailor-offer-estimate">
							<Label
								title="Est.time"
								value={`${offer.time} days`}
								color={offer.time > 6 ? 'primary' : 'secondary'}
							/>
							{/* <span className="c-tailor-offer-estimate__title">Est.time</span>
							<span className="c-tailor-offer-estimate__value">{`${offer.time} days`}</span> */}
						</div>
						<div className="c-tailor-offer__price">
							<span>{`${offer.price} vnđ`}</span>
						</div>
						{offer.picked ? (
							<div className="c-tailor-offer__button">
								<SmallButton1 text="Picked" isActive={true} />
							</div>
						) : (
							<div className="c-tailor-offer__button" onClick={() => onTailorPick(index)}>
								<MediumButton text="Pick this tailor" />
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default TailorOffer;
