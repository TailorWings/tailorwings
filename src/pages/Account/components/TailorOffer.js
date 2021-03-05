import React from 'react';
import PropTypes from 'prop-types';
import Star from '../../../components/Star';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton from '../../../components/Button/SmallButton';
import classNames from 'classnames';

TailorOffer.propTypes = {
	offerInfo: PropTypes.array,
};

TailorOffer.defaultProps = {
	offerInfo: null,
};

function TailorOffer(props) {
	const { offerInfo } = props;

	if (!offerInfo) return <div>TailorOffer</div>;
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
							<span className="c-tailor-offer-estimate__title">Est.time</span>
							<span className="c-tailor-offer-estimate__value">{`${offer.time} days`}</span>
						</div>
						<div className="c-tailor-offer__price">
							<span>{`${offer.price} vnđ`}</span>
						</div>
						<div className="c-tailor-offer__button">
							{offer.picked ? (
								<SmallButton text="Picked" isActive={true} />
							) : (
								<MediumButton text="Pick this tailor" />
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TailorOffer;
