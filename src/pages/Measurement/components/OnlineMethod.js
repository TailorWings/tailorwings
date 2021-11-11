import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import ListLoader from '../../../components/ComponentLoader';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import ProcessAction from '../../../components/ProcessAction';
import Slider from '../../../components/Slider';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import {find} from 'lodash'
import { useSelector } from 'react-redux';

OnlineMethod.propTypes = {
	measurements: PropTypes.array,
	onMeasurementConfirm: PropTypes.func,
	onGetLatestMsmt: PropTypes.func,
	designStyle: PropTypes.string,
};

OnlineMethod.defaultProps = {
	measurements: null,
	onMeasurementConfirm: null,
	onGetLatestMsmt: null,
	designStyle: ''
};

function OnlineMethod(props) {
	const { measurements, onMeasurementConfirm, onGetLatestMsmt, designStyle } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	const stylesOfClothe = useSelector((state) => state.common.stylesOfClothe);
	
	const getStyleOfClothe = (id) => {
		return find(stylesOfClothe, {id: id})
	}

	const swiperRef = useRef(null);
	const params = {
		slidesPerView: 1,
		slidesPerColumn: 1,
		// spaceBetween: 16,
		slidesPerColumnFill: 'row',
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			'slideChange': onSlideChange
		}
	};
	const [activeGuide, setActiveGuide] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (measurements) {
			setActiveGuide({ ...measurements[0], activeIndex: 0 });
		}
	}, [measurements]);

	function onSlideChange() {
		if (swiperRef.current) {
			let currentSwiper = swiperRef.current.swiper;
			let currentGuide = measurements[currentSwiper.realIndex];
			setActiveGuide({ ...currentGuide, activeIndex: currentSwiper.realIndex });
		}
	}

	const actionNext = () => {
		console.log("actionNext")
		var newIndex = currentIndex + 1
		if(newIndex > 0 && newIndex < measurements.length) {
			setCurrentIndex(newIndex)
			swiperRef.current.swiper.slideNext()
		}
	}
	const actionBack = () => {
		console.log("actionBack")
		var newIndex = currentIndex - 1
		if(newIndex >= 0 && newIndex < measurements.length) {
			setCurrentIndex(newIndex)
			swiperRef.current.swiper.slidePrev();
		}
	}
	const styleOfClothe = getStyleOfClothe(designStyle)
	const styleOfClotheName = isENG ? styleOfClothe.name : styleOfClothe.nameVN

	if (!measurements || !onMeasurementConfirm) return <Fragment />;
	return (
		<div className="c-msmt-online">
			<div className="c-msmt-online-guideline">
				<div className="c-msmt-online-guideline-slider">
					<Slider swiperRef={swiperRef} onSlideChange={onSlideChange}>
						<div className="c-msmt-online-guideline-slider__item">
							{measurements ? (
								<Swiper {...params} ref={swiperRef}>
									{measurements.map((msmt, index) => {
										return (
											<div key={index}>
												<img src={ (isENG ? msmt.guide : msmt.guideVN) || ''} alt={msmt.id} />
											</div>
										);
									})}
								</Swiper>
							) : (
								<ListLoader />
							)}
						</div>
					</Slider>
				</div>
				<div className="c-msmt-online-guideline-bottom">
					<span className="c-msmt-online-guideline-bottom__count">
						TAILORWINGS - {t("measurement.guideFor")} {styleOfClotheName}:{' '}
						{activeGuide
							? `${ isENG ? activeGuide.label : activeGuide.labelVN } (${activeGuide.activeIndex + 1}/${measurements.length})`
							: `...`}
					</span>
					{/* <SelectInput
						selectInfo={measurements.map((msmt) => {
							return msmt.label;
						})}
					/> */}
					{/* <ListOfMesurementDropdown /> */}
				</div>
			</div>
			<div className="c-msmt-online-input">
				<MeasurementForm
					measurements={measurements}
					onSubmit={onMeasurementConfirm}
					onGetLatestMsmt={onGetLatestMsmt}
					onActionBack={actionBack}
					onActionNext={actionNext}
					isDisplayFull={true}
					currentIndex={currentIndex}
				/>
			</div>
			<ProcessAction backLink="/fabric" formID="msmt-form" />
		</div>
	);
}

export default OnlineMethod;
