import React from 'react';
import PropTypes from 'prop-types';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

MultirowSwiper.propTypes = {};

function MultirowSwiper(props) {
	return (
		<Swiper
			spaceBetween={10}
			slidesPerView={2}
			slidesPerColumn={2}
			slidesPerColumnFill="row"
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			<SwiperSlide>Slide 1</SwiperSlide>
			<SwiperSlide>Slide 2</SwiperSlide>
			<SwiperSlide>Slide 3</SwiperSlide>
			<SwiperSlide>Slide 4</SwiperSlide>
			<SwiperSlide>Slide 5</SwiperSlide>
			<SwiperSlide>Slide 6</SwiperSlide>
			<SwiperSlide>Slide 7</SwiperSlide>
			{/* <SwiperSlide>Slide 8</SwiperSlide>
			<SwiperSlide>Slide 9</SwiperSlide>
			<SwiperSlide>Slide 10</SwiperSlide> */}
		</Swiper>
	);
}

export default MultirowSwiper;
