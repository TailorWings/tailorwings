import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactIdSwiper from 'react-id-swiper';
import ListLoader from '../../../components/ComponentLoader';
import Picker from '../../../components/Picker';
import ProcessAction from '../../../components/ProcessAction';
import Slider from '../../../components/Slider';
import Title from '../../../components/Title';
import { FABRIC_PATTERN_SUBTITLE, FABRIC_PATTERN_TITLE } from '../../../constants';
import { PhotoSwipe } from 'react-photoswipe-2';
import MediumButton from '../../../components/Button/MediumButton';
import { modifyPrice } from '../../../services/Functions/commonFunctions';

FabricPattern.propTypes = {
	collections: PropTypes.array,
	patterns: PropTypes.array,
	onCollectionClick: PropTypes.func,
	onPatternClick: PropTypes.func,
	onNextClick: PropTypes.func,
	// estPrice: PropTypes.string,
};

FabricPattern.defaultProps = {
	collections: null,
	patterns: null,
	onCollectionClick: null,
	onPatternClick: null,
	onNextClick: null,
	estPrice: null,
};

const PHOTO_SWIPE_SIZE = 500;

function FabricPattern(props) {
	const { collections, patterns, onCollectionClick, onPatternClick, onNextClick, estPrice } = props;
	const screenWidth = window.innerWidth;
	const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
	const [startIndex, setStartIndex] = useState(0);
	const [images, setImages] = useState(null);
	/*--------------*/
	const swiperRef = useRef(null);
	const params = {
		slidesPerView: screenWidth < 789 ? 3 : 5,
		slidesPerColumn: 2,
		spaceBetween: screenWidth < 789 ? 5 : 16,
		slidesPerColumnFill: 'row',
		lazy: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	};
	/*--------------*/
	let options = {
		//http://photoswipe.com/documentation/options.html
		loop: true,
		escKey: true,
		timeToIdle: 4000,
		index: startIndex,
		focus: true,
		preload: [2, 2],
		zoomEl: true,
		closeOnScroll: false,
		isClickableElement: function (el) {
			let clickedIndex = el.getAttribute('id');
			if (clickedIndex && clickedIndex > -1) {
				let updatedPattern = patterns.map((pattern, index) => {
					return { ...pattern, active: index === Number(clickedIndex) };
				});
				if (updatedPattern) {
					if (Number(clickedIndex) !== 0) {
						let temp = updatedPattern[0];
						updatedPattern[0] = updatedPattern[Number(clickedIndex)];
						updatedPattern[Number(clickedIndex)] = temp;
					}
					onPatternClick(updatedPattern);
					swiperRef.current.swiper.slideTo(0);
				}
				setIsPhotoSwipeOpen(false);
			}
		},
	};
	/*--------------*/
	useEffect(() => {
		if (patterns) {
			let photos = patterns.map((pattern, index) => {
				return {
					// src: pattern.image.normal,
					w: PHOTO_SWIPE_SIZE,
					h: PHOTO_SWIPE_SIZE,
					html: `<div className="c-fabric-pattern__select-btn"><img src=${pattern.image.normal} /><button id=${index}>Select</button></div>`,
				};
			});
			if (photos) {
				setImages(photos);
			}
		}
	}, [patterns]);
	/*********************************
	 *  Description: handle fabric type click
	 */
	function onPatternSelect(clickedIndex) {
		setStartIndex(clickedIndex);
		setTimeout(() => {
			setIsPhotoSwipeOpen(true);
		}, 100);
	}
	/************_END_****************/
	const handlePhotoSwipeClose = () => {
		setIsPhotoSwipeOpen(false);
	};
	/*--------------*/
	if (!collections || !onCollectionClick || !onPatternClick) return <Fragment />;

	return (
		<div className="c-fabric-pattern">
			{/* <div className="c-fabric-pattern__title">
				<Title title={FABRIC_PATTERN_TITLE} subtitle={FABRIC_PATTERN_SUBTITLE} />
			</div>
			<div className="c-fabric-pattern-collection">
				<Picker list={collections} onItemClick={onCollectionClick} />
			</div> */}
			{patterns ? (
				patterns.length > 0 ? (
					<Slider swiperRef={swiperRef}>
						<ReactIdSwiper {...params} ref={swiperRef}>
							{patterns.map((pattern, index) => {
								return (
									<div key={index}>
										<li
											className={`c-fabric-pattern__item ${pattern.active ? '--selected' : ''} ${
												!pattern.image ? '--no-image' : ''
											}`}
											onClick={() => onPatternSelect(index)}
										>
											{pattern.image ? <img src={pattern.image.normal} alt="icon" /> : <Fragment />}
										</li>
									</div>
								);
							})}
						</ReactIdSwiper>
					</Slider>
				) : (
					<p>No pattern for on this collection</p>
				)
			) : (
				<ListLoader />
			)}
			{estPrice ? (
				<div className="c-fabric-pattern__estprice">
					<p>{`~ ${modifyPrice(estPrice)} VND`}</p>
					<p>{`Order's estimated price`}</p>
				</div>
			) : (
				<Fragment />
			)}
			<ProcessAction backLink="/requirement" onNextClick={onNextClick} />
			<PhotoSwipe
				isOpen={isPhotoSwipeOpen}
				items={images || []}
				options={options}
				onClose={handlePhotoSwipeClose}
			/>
		</div>
	);
}

export default FabricPattern;
