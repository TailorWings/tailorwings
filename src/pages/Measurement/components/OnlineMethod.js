import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactIdSwiper from 'react-id-swiper';
import Swiper from 'react-id-swiper';
import ListLoader from '../../../components/ComponentLoader';
import ListOfMesurementDropdown from '../../../components/Dropdown/ListOfMesurementDropdown';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import SelectInput from '../../../components/Input/SelectInput';
import ProcessAction from '../../../components/ProcessAction';
import Slider from '../../../components/Slider';

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
			'init': () => console.log('swiper ready!'),
			'slideChange': onSlideChange
		}
	};
	const [activeGuide, setActiveGuide] = useState(null);

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
												<img src={msmt.guide || ''} alt={msmt.id} />
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
						TAILORWINGS - Measurement Guide For {designStyle}:{' '}
						{activeGuide
							? `${activeGuide.label} (${activeGuide.activeIndex + 1}/${measurements.length})`
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
				/>
			</div>
			<ProcessAction backLink="/fabric" formID="msmt-form" />
		</div>
	);
}

export default OnlineMethod;
