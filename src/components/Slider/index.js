import React from 'react';
import PropTypes from 'prop-types';
import leftArrowIcon from '../../assets/icons/slider-arrow-left.png';
import rightArrowIcon from '../../assets/icons/slider-arrow-right.png';

Slider.propTypes = {
	swiperRef: PropTypes.object,
};

Slider.defaultProps = {
	swiperRef: null,
};

function Slider(props) {
	const { swiperRef } = props;
	/*--------------*/
	const goNext = () => {
		if (swiperRef) {
			if (swiperRef.current && swiperRef.current.swiper) {
				swiperRef.current.swiper.slideNext();
			}
		}
	};
	const goPrev = () => {
		if (swiperRef) {
			if (swiperRef.current && swiperRef.current.swiper) {
				swiperRef.current.swiper.slidePrev();
			}
		}
	};
	/*--------------*/

	return (
		<div className="c-slider">
			<button className="c-slider__left" onClick={goPrev}>
				<img src={leftArrowIcon} alt="icon" />
			</button>
			<div className="c-slider__content">{props.children}</div>
			<button className="c-slider__right" onClick={goNext}>
				<img src={rightArrowIcon} alt="icon" />
			</button>
		</div>
	);
}

export default Slider;
