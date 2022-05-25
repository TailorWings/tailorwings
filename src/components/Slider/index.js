import React from 'react';
import PropTypes from 'prop-types';
import leftArrowIcon from '../../assets/icons/slider-arrow-left.png';
import rightArrowIcon from '../../assets/icons/slider-arrow-right.png';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

// Slider.propTypes = {
// 	swiperRef: PropTypes.object,
// 	onSlideChange: PropTypes.func,
// 	isDisplayActionBtn: PropTypes.bool,
// 	onBeforeNext: PropTypes.func,
// };

Slider.defaultProps = {
	swiperRef: null,
	onSlideChange: null,
	isDisplayActionBtn: true,
	onBeforeNext: () => true,
};

function Slider(props) {
	const { t } = useTranslation();

	const { swiperRef, onSlideChange, onNext, onBack, isDisplayActionBtn, onBeforeNext } = props;
	/*--------------*/
	const goNext = () => {
		console.log(onBeforeNext);
		if (typeof onBeforeNext === 'function' && onBeforeNext()) {
			if (swiperRef) {
				if (swiperRef.current && swiperRef.current.swiper) {
					swiperRef.current.swiper.slideNext();
					onSlideChange && onSlideChange();
					onNext && onNext();
				}
			}
		}
	};
	const goPrev = () => {
		if (swiperRef) {
			if (swiperRef.current && swiperRef.current.swiper) {
				swiperRef.current.swiper.slidePrev();
				onSlideChange && onSlideChange();
				onBack && onBack();
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
			<div className="c-slider__mobile-btn">
				<div className="--left" onClick={goPrev}>
					<span>{t('previous')}</span>
				</div>
				<div className="--right" onClick={goNext}>
					<span>{t('next')}</span>
				</div>
			</div>
		</div>
	);
}

export default Slider;
