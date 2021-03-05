import React from 'react';
import HomeBanner from './components/Banner';
import HomeHowItWork from './components/HowItWork';

function HomePage() {
	return (
		<div className="l-home">
			<HomeBanner />
			<HomeHowItWork />
		</div>
	);
}

export default HomePage;
