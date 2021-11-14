import { find } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-id-swiper';
import { useSelector } from 'react-redux';
import IconList from '../../../assets/icons/icon-list.svg';
import ListLoader from '../../../components/ComponentLoader';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import MaterialAlert from '../../../components/MaterialAlert';
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
	designStyle: '',
};

function OnlineMethod(props) {
	const { measurements, onMeasurementConfirm, onGetLatestMsmt, designStyle } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	const stylesOfClothe = useSelector((state) => state.common.stylesOfClothe);
	const [alertOpen, setAlertOpen] = useState(false);

	const getStyleOfClothe = (id) => {
		return find(stylesOfClothe, { id: id });
	};

	const swiperRef = useRef(null);
	const params = {
		slidesPerView: 1,
		slidesPerColumn: 1,
		// spaceBetween: 16,
		slidesPerColumnFill: 'row',
		noSwiping: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			slideChange: onSlideChange,
		},
	};
	const [activeGuide, setActiveGuide] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(false);

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
		// console.log('actionNext');
		// if (swiperRef.current) {
		// 	let currentSwiper = swiperRef.current.swiper;
		// 	console.log('index', currentSwiper.realIndex);
		// }
		// var newIndex = currentIndex + 1;
		// if (newIndex > 0 && newIndex < measurements.length) {
		// 	setCurrentIndex(newIndex);
		// 	console.log(newIndex);
		// }
	};
	const actionBack = () => {
		// console.log('actionBack');
		// if (swiperRef.current) {
		// 	let currentSwiper = swiperRef.current.swiper;
		// 	console.log('index', currentSwiper.realIndex);
		// }
		// var newIndex = currentIndex - 1;
		// if (newIndex >= 0 && newIndex < measurements.length) {
		// 	setCurrentIndex(newIndex);
		// 	console.log(newIndex);
		// }
	};
	// const styleOfClothe = getStyleOfClothe(designStyle)
	// const styleOfClotheName = isENG ? styleOfClothe.name : styleOfClothe.nameVN

	const [inputs, setInputs] = useState({});
	const [isCheck, setIsCheck] = useState(false);
	const [isClickedNext, setIsClickedNext] = useState(false);

	const handleInputChange = (target, msmt) => {
		setInputs((state) => ({
			...state,
			[msmt.label]: target.value,
		}));
		msmt.value = target.value
		if (
			target.value === null ||
			target.value === '' ||
			target.value === undefined ||
			target.value === null
		) {
			setIsCheck(false);
		} else {
			setIsCheck(true);
		}
	};

	const onBeforeNext = () => {
		const isCurrentInputValid = isCheck;
		if (!isCurrentInputValid) {
			setIsClickedNext(true);
		} else {
			setIsCheck(false);
			setIsClickedNext(false);
		}
		return isCurrentInputValid;
	};

	console.log(measurements)

	if (!measurements || !onMeasurementConfirm) return <Fragment />;
	return (
		<div className="c-msmt-online">
			<div className="c-msmt-online-guideline">
				<div className="c-msmt-online-guideline-top">
					<div className="c-msmt-online-guideline-top__button-view">
						<span className="c-msmt-online-guideline-top__button-view__text">View Full List</span>
						<img src={IconList} alt="icon" className="c-msmt-online-guideline-top__icon" />
					</div>
					<div className="c-msmt-online-guideline-top__right">
						<span className="c-msmt-online-guideline-top__right--des">
							Get your lastet measurement
						</span>
						<span className="c-msmt-online-guideline-top__right--mobile">
							Get your
							<br />
							lastet measurement
						</span>
					</div>
				</div>
				<div className="c-msmt-online-guideline-slider">
					{/* <Slider swiperRef={swiperRef} onSlideChange={onSlideChange}>
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
							<img src={measurements[activeGuide.activeIndex].guideVN} />
						</div>
					</Slider> */}
					{measurements && activeGuide ? (
						<div className="c-msmt-online-guideline-slider__item">
							<img
								src={
									isENG
										? measurements[activeGuide.activeIndex].guide
										: measurements[activeGuide.activeIndex].guideVN
								}
							/>
						</div>
					) : (
						<ListLoader />
					)}
				</div>
				<div className="c-msmt-online-guideline-bottom">
					<span className="c-msmt-online-guideline-bottom__count">
						{activeGuide
							? `${isENG ? activeGuide.label : activeGuide.labelVN} (${
									activeGuide.activeIndex + 1
							  }/${measurements.length})`
							: `...`}
					</span>
					{/* <SelectInput
						selectInfo={measurements.map((msmt) => {
							return msmt.label;
						})}
					/> */}
					{/* <ListOfMesurementDropdown /> */}
				</div>
				<div className="c-msmt-online-guideline-slider c-msmt-online-guideline-slider--custom">
					<Slider
						swiperRef={swiperRef}
						onNext={actionNext}
						onBack={actionBack}
						onSlideChange={onSlideChange}
						onBeforeNext={onBeforeNext}
					>
						<div className="c-msmt-online-guideline-slider__item">
							{measurements && activeGuide ? (
								<Swiper {...params} ref={swiperRef}>
									{measurements.map((msmt, index) => {
										return (
											<div>
												<div key={index} className="c-msmt-online-guideline-slider__input">
													<input
														type="text"
														maxLength="3"
														name={index}
														onChange={({ target }) => handleInputChange(target, msmt)}
														value={inputs[msmt.label]}
													/>
													<span>cm</span>
												</div>
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
			</div>
			<div className="c-msmt-online-guideline-error-input">
				{isClickedNext && !isCheck && (
					<span className="c-msmt-online-guideline-error-input__text">
						{isENG ? 'Please set your value' : 'Vui lòng nhập số'}
					</span>
				)}
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
