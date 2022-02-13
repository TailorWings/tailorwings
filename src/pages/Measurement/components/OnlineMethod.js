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
	handleShowFullList: PropTypes.func,
	isViewFullList: PropTypes.bool,
	currentCustomerMSMT: PropTypes.object,
};

OnlineMethod.defaultProps = {
	measurements: null,
	onMeasurementConfirm: null,
	onGetLatestMsmt: null,
	designStyle: '',
	handleShowFullList: null,
	isViewFullList: false,
	currentCustomerMSMT: null,
};

function OnlineMethod(props) {
	const {
		measurements,
		onMeasurementConfirm,
		onGetLatestMsmt,
		designStyle,
		handleShowFullList,
		isViewFullList,
		currentCustomerMSMT,
	} = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	const stylesOfClothe = useSelector((state) => state.common.stylesOfClothe);
	const [alertOpen, setAlertOpen] = useState(false);
	const [isFormSubmitted, setFormSubmitted] = useState(false);
	const [measurementStates, setMeasurements] = useState(measurements);
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
		loop: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			slideChange: onSlideChange,
		},
	};
	const [activeGuide, setActiveGuide] = useState(null);
	const [isShowFullList, setIsShowFullList] = useState(null);

	useEffect(() => {
		if (measurements) {
			setActiveGuide({ ...measurements[0], activeIndex: 0 });
			setMeasurements(measurements);
		}
	}, [measurements]);

	function onSlideChange() {
		if (swiperRef.current) {
			let currentSwiper = swiperRef.current.swiper;
			let currentGuide = measurementStates[currentSwiper.realIndex];
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

	// const onNextClick = () => {
	// 	// onMeasurementConfirm();
	// }
	const handleInputChange = (target, msmt, index) => {
		measurementStates[index].value = target.value;
		setMeasurements([...measurementStates]);
		setActiveGuide({ ...measurementStates[index], activeIndex: index });
	};

	const onBeforeNext = () => {
		const currentIndex = swiperRef.current.swiper.realIndex;
		const isCurrentInputValid = !!measurementStates[currentIndex].value;
		setFormSubmitted(true);
		return isCurrentInputValid;
	};
	const onPageNextClick = () => {
		setFormSubmitted(true);
		const idx = measurementStates.findIndex((m) => !m.value);
		if (idx >= 0) {
			swiperRef.current.swiper.slideTo(idx);
		}
	};

	if (!measurementStates || !onMeasurementConfirm) return <Fragment />;
	return (
		<div className="c-msmt-online">
			<div className="c-msmt-online-guideline">
				<div className="c-msmt-online-guideline-top">
					<div
						className="c-msmt-online-guideline-top__button-view"
						onClick={() => handleShowFullList()}
					>
						<span className="c-msmt-online-guideline-top__button-view__text">
							{t('measurement.viewFullList')}
						</span>
						<img src={IconList} alt="icon" className="c-msmt-online-guideline-top__icon" />
					</div>
					<div className="c-msmt-online-guideline-top__right">
						<span
							className={
								currentCustomerMSMT
									? 'c-msmt-online-guideline-top__right--des'
									: 'c-msmt-online-guideline-top__right--des c-msmt-online-guideline-top__right--disable'
							}
							onClick={currentCustomerMSMT ? onGetLatestMsmt : undefined}
						>
							{t('measurement.getYourLasted')}
						</span>
						{isENG ? (
							<span
								className={
									currentCustomerMSMT
										? 'c-msmt-online-guideline-top__right--mobile'
										: 'c-msmt-online-guideline-top__right--mobile c-msmt-online-guideline-top__right--disable'
								}
								onClick={currentCustomerMSMT ? onGetLatestMsmt : undefined}
							>
								Get your
								<br />
								lastet measurement
							</span>
						) : (
							<span
								className={
									currentCustomerMSMT
										? 'c-msmt-online-guideline-top__right--mobile'
										: 'c-msmt-online-guideline-top__right--mobile c-msmt-online-guideline-top__right--disable'
								}
								onClick={currentCustomerMSMT ? onGetLatestMsmt : undefined}
							>
								Sử dụng số đo đã lưu
							</span>
						)}
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
								key={
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
							{measurementStates && activeGuide ? (
								<Swiper {...params} ref={swiperRef}>
									{measurementStates.map((msmt, index) => {
										return (
											<div key={index} className="c-msmt-online-guideline-slider__input">
												<input
													type="text"
													maxLength="3"
													name={index}
													onChange={({ target }) => handleInputChange(target, msmt, index)}
													value={measurementStates[index].value}
												/>
												<span>cm</span>
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
				{isFormSubmitted && !activeGuide.value && (
					<span className="c-msmt-online-guideline-error-input__text">
						{isENG ? 'Please set your value' : 'Vui lòng nhập số'}
					</span>
				)}
			</div>
			{isViewFullList ? (
				<div className="c-msmt-online-input">
					<MeasurementForm
						measurements={measurementStates}
						onSubmit={onMeasurementConfirm}
						onActionBack={actionBack}
						onActionNext={actionNext}
					/>
				</div>
			) : (
				<Fragment />
			)}

			<ProcessAction onNextClick={onPageNextClick} backLink="/fabric" formID="msmt-form" />
		</div>
	);
}

export default OnlineMethod;
