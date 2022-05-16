import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-id-swiper';
import { PhotoSwipe } from 'react-photoswipe-2';
import ListLoader from '../../../components/ComponentLoader';
import Slider from '../../../components/Slider';

FabricPattern.propTypes = {
	collections: PropTypes.array,
	patterns: PropTypes.array,
	onCollectionClick: PropTypes.func,
	onPatternClick: PropTypes.func,
	onNextClick: PropTypes.func,
	// estPrice: PropTypes.string,
	isConfirmDisabled: PropTypes.bool,
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
	const { t } = useTranslation();
	const {
		collections,
		patterns,
		onCollectionClick,
		onPatternClick,
		onNextClick,
		estPrice,
		isConfirmDisabled,
	} = props;
	const screenWidth = window.innerWidth;
	const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
	const [startIndex, setStartIndex] = useState(0);
	const [images, setImages] = useState(null);
	/*--------------*/
	const swiperRef = useRef(null);
	const params = {
		slidesPerView: screenWidth < 769 ? 3 : 5,
		slidesPerColumn: 2,
		spaceBetween: screenWidth < 769 ? 5 : 16,
		slidesPerColumnFill: 'row',
		lazy: true,
		rebuildOnUpdate: true,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		on: {},
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
			let clickedIndex = startIndex;
			if (
				clickedIndex!= null &&
				clickedIndex > -1 &&
				el.tagName === 'BUTTON' &&
				!el.className.includes('pswp__button')
			) {
				let updatedPattern = patterns.map((pattern, index) => {
					return { ...pattern, active: index === Number(clickedIndex) };
				});
				if (updatedPattern) {
					if (Number(clickedIndex) !== 0) {
						let temp = updatedPattern[0];
						updatedPattern[0] = updatedPattern[Number(clickedIndex)];
						updatedPattern[Number(clickedIndex)] = temp;
					}
					onPatternClick(updatedPattern, clickedIndex);
					swiperRef.current.swiper.slideTo(0);
				}
				setIsPhotoSwipeOpen(false);
			} else if (el.tagName === 'BUTTON' && el.className.includes('pswp__button')) {
				let videoList = document.getElementsByClassName('video_ref');
				for(let vid of videoList) {
					vid.pause();
				}
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
					html: `<div className="c-fabric-pattern__select-btn">
					${ReactDOMServer.renderToStaticMarkup(genItemHTML(pattern.image.normal))}
					<button id=${index}>${t('select')}</button></div>`,
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
	function genItemHTML(url, showPlayIcon = false) {
		return isImage(url) ? 
			<img src={url} alt="icon" /> : 
			<div className='video-item'>
				{showPlayIcon ? <img className='icon-play' src='/assets/icons/play-button-svgrepo-com.svg' /> : <Fragment /> }
				<video class="video_ref" controls={!showPlayIcon} preload='false' src={url}></video>;
			</div>
	}
	function onPatternSelect(clickedIndex) {
		setStartIndex(clickedIndex);
		setTimeout(() => {
			setIsPhotoSwipeOpen(true);
		}, 100);
		/*------------------------------*/
		let selectedPattern = patterns[clickedIndex];
		if (selectedPattern?.image?.list) {
			setImages(
				selectedPattern?.image?.list.map((img, index) => {
					return {
						w: PHOTO_SWIPE_SIZE,
						h: PHOTO_SWIPE_SIZE,
						html: `<div className="c-fabric-pattern__select-btn">${ReactDOMServer.renderToStaticMarkup(genItemHTML(img))}<button className="select-btn" id=${index}>${t(
							'select'
						)}</button></div>`,
					};
				})
			);
		} else if (selectedPattern?.image?.normal) {
			setImages([
				{
					// src: pattern.image.normal,
					w: PHOTO_SWIPE_SIZE,
					h: PHOTO_SWIPE_SIZE,
					html: `<div className="c-fabric-pattern__select-btn">
					${ReactDOMServer.renderToStaticMarkup(genItemHTML(selectedPattern.image.normal))}
					<button className="select-btn" id=${0}>${t('select')}</button></div>`,
				},
			]);
		}

		// DÒNG NÀY MỞ LÊN khi sử dụng data mới
	}
	/************_END_****************/
	const handlePhotoSwipeClose = () => {
		setIsPhotoSwipeOpen(false);
	};
	function isImage(url) {
		const extension = url.substring(url.lastIndexOf('/')).split('.')[1].split('?')[0];
		return ['jpeg', 'png', 'jpg', 'gif'].indexOf(extension) >= 0;
	}
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
						<Swiper {...params} ref={swiperRef}>
							{patterns.map((pattern, index) => {
								return (
									<div key={index}>
										<li
											className={`c-fabric-pattern__item ${pattern.active ? '--selected' : ''} ${
												!pattern.image ? '--no-image' : ''
											}`}
											onClick={() => onPatternSelect(index)}
										>
											{pattern.image ? 
												genItemHTML(pattern.image.normal, true)
											:
											<Fragment />}
										</li>
									</div>
								);
							})}
						</Swiper>
					</Slider>
				) : (
					// {
					// 	screenWidth < 789 && <div className="c-fabric-pattern__swipe-guide"><span>swipe for more</span><i><img src="" alt="" /></i></div>
					// }
					<p>No pattern for on this collection</p>
				)
			) : (
				<ListLoader />
			)}
			{/* {estPrice ? (
				<div className="c-fabric-pattern__estprice">
					<p>{`~ ${modifyPrice(estPrice)} VND`}</p>
					<p>{`Order's estimated price`}</p>
				</div>
			) : (
				<Fragment />
			)}
			<ProcessAction
				backLink="/requirement"
				onNextClick={onNextClick}
				disabled={isConfirmDisabled}
			/> */}
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
