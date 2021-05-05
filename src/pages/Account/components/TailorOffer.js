import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Star from '../../../components/Star';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton1 from '../../../components/Button/SmallButton1';
import classNames from 'classnames';
import Label from '../../../components/Label';
import useIcon from '../../../assets/icons/user.svg';

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

	if (!offerInfo || offerInfo.length < 1)
		return (
			<div className="c-tailor-offer --no-offer">
				<p className="c-tailor-offer__annouce">Please come back after 10 minutes to have the best offers by our tailors.</p>
			</div>
		);
	return (
		<div className="c-tailor-offer">
			{offerInfo.map((offer, index) => {
				let price = offer.wage; // price tính sau
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
							{<img src={offer.avatar || useIcon} alt="avatar" />}
						</div>
						<div className="c-tailor-offer-tailor">
							<p className="c-tailor-offer-tailor__name">{offer.name || 'Empty'}</p>
							<Star number={Number(offer.stars)} />
						</div>
						<div className="c-tailor-offer-estimate">
							<Label
								title="Est.time"
								value={`${offer.duration} days`}
								color={offer.duration > 6 ? 'primary' : 'secondary'}
							/>
							{/* <span className="c-tailor-offer-estimate__title">Est.time</span>
							<span className="c-tailor-offer-estimate__value">{`${offer.time} days`}</span> */}
						</div>
						<div className="c-tailor-offer__price">
							<span>{`${price * 1000} vnđ`}</span>
						</div>
						{offer.picked ? (
							<div className="c-tailor-offer__button">
								<SmallButton1 text="Picked" isActive={true} />
							</div>
						) : onTailorPick ? (
							<div className="c-tailor-offer__button" onClick={() => onTailorPick(index)}>
								<MediumButton text="Pick this tailor" />
							</div>
						) : (
							<Fragment />
						)}
					</div>
				);
			})}
		</div>
	);
}

export default TailorOffer;
