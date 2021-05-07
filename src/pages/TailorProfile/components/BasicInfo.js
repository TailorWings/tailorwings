import React from 'react';
import orangeStar from  '../../../assets/icons/orange-star.svg';
import yellowBag from  '../../../assets/icons/yellow-bag.svg';
import userIcon from '../../../assets/icons/user.svg';

function BasicInfo({ name, desc, stars, exp, avatar }) {
	return (
		<div className="c-tailor-profile-basic-info">
			<div className="container">
				<div className="c-tailor-profile-basic-info__avatar">
					<img src={avatar ? avatar : userIcon} alt="avatar" />
				</div>
				<h2 className="c-tailor-profile-basic-info__name">{name}</h2>
				<p className="c-tailor-profile-basic-info__desc">
					{desc}
				</p>
				<div className="c-tailor-profile-basic-info__wrapper">
					<div className="c-tailor-profile-basic-info__stars">
						<i>
							<img src={orangeStar} alt="star-icon" />
						</i>
						<span>{stars} (10 comments)</span>
					</div>
					<div className="c-tailor-profile-basic-info__exp">
						<i>
							<img src={yellowBag} alt="bag-icon" />
						</i>
						<span>{exp} year{exp > 1 && 's'} experience</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BasicInfo;
