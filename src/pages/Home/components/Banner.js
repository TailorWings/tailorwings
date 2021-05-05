import React from 'react';
import banner from '../../../assets/images/banner-home.png';
import bannerMobile from '../../../assets/images/banner-mobile.png';


function HomeBanner() {
	let isMobile = window.innerWidth < 769;
	return (
		<div className="c-home-banner">
			{
				isMobile ? <img src={bannerMobile} alt="banner" /> :
				<img src={banner} alt="banner" />
			}
		</div>
	);
}

export default HomeBanner;
