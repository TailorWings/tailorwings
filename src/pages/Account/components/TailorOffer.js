import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Star from '../../../components/Star';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton1 from '../../../components/Button/SmallButton1';
import classNames from 'classnames';
import Label from '../../../components/Label';
import useIcon from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { modifyPrice } from '../../../services/Functions/commonFunctions';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

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
	const { t, i18n } = useTranslation();

	if (!offerInfo || offerInfo.length < 1)
		return (
			<div className="c-tailor-offer --no-offer">
				<p className="c-tailor-offer__annouce">
					{t('account.orderDetailNote')}
				</p>
			</div>
		);
	console.log(`offerInfo`, offerInfo)
	return (
		<div className="c-tailor-offer">
			<span className="c-tailor-offer__title-list-offer">List of Tailor Offers</span>
			{offerInfo.map((offer, index) => {
				let price = offer.price;
				return (
					<div key={index} className={classNames('c-tailor-offer__item', {
						'c-tailor-offer__item--active': offer.picked,
					})}>
						<div
							className="c-tailor-offer__index"
						>
							<span>{index + 1}</span>
						</div>
						<div className="c-tailor-offer__avatar">
							<Link
								style={{
									width: '100%',
								}}
								to={{
									pathname: '/tailor-profile',
									search: `id=${offer.tailor.id}`,
								}}
							>
								{<img src={offer.tailor.avatar || useIcon} alt="avatar" />}
							</Link>
						</div>
						<Link
							to={{
								pathname: '/tailor-profile',
								search: `id=${offer.tailor.id}`,
							}}
						>
							<div className="c-tailor-offer-tailor">
								<p className="c-tailor-offer-tailor__name">{offer.tailor.name || 'Empty'}</p>
								<Star number={Number(offer.tailor.stars)} />
							</div>
						</Link>
						<div className="c-tailor-offer-estimate">
							<Label
								title="Est.time"
								value={`${offer.customerDisplayDuration} days`}
								color={offer.duration > 6 ? 'primary' : 'secondary'}
							/>
						</div>
						{/* <div className="c-tailor-offer-estimate">
							<Label
								title="Est.Fabric Length"
								value={`${offer?.fabricNumber || 'Unknown'} m`}
							/>
						</div> */}
						<div className="c-tailor-offer__price">
							<span>{`${modifyPrice(price)} vnđ`}</span>
						</div>
						{offer.picked ? (
							<div className="c-tailor-offer__button">
								<SmallButton1 text="Picked" isActive={true} />
							</div>
						) : onTailorPick ? (
							<div className="c-tailor-offer__button" onClick={() => onTailorPick(index)}>
								<MediumButton text="Pick" />
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
