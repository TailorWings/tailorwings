import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Swiper from 'react-id-swiper';
import ListLoader from '../../components/ComponentLoader';
import Picker from '../../components/Picker';
import ProcessAction from '../../components/ProcessAction';
import Slider from '../../components/Slider';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

Tooltip.propTypes = {
	title: PropTypes.string,
	content: PropTypes.array,
	patterns: PropTypes.array,
};

Tooltip.defaultProps = {
	title: '',
	content: null,
	patterns: null,
};

function Tooltip(props) {
	const { title, content } = props;
	var {patterns} = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';

	// if (!patterns && content[1].image) {
	// 	patterns = {
	// 		image: content[1].image
	// 	}
	// }

	// console.log("Tooltip")
	// console.log(content)
	// console.log(patterns)

	const screenWidth = window.innerWidth;
	const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
	const [startIndex, setStartIndex] = useState(0);
	const [images, setImages] = useState(null);
	/*--------------*/
	const swiperRef = useRef(null);
	const params = {
		slidesPerView: screenWidth < 769 ? 3 : 6,
		slidesPerColumn: 1,
		spaceBetween: screenWidth < 769 ? 6 : 16,
		slidesPerColumnFill: 'row',
		lazy: true,
		rebuildOnUpdate: true,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },
		rebuildOnUpdate: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		on: {},
	};

	if (!content)
		return (
			<Fragment />
			// <div className="c-tooltip">
			// 	<p className="c-tooltip__title">{title}</p>
			// </div>
		);

	const showSlider = (images) => {
		console.log("showSlider images", images);

		return (
			<div className="c-tooltip__slider">
				{images ? (
					images.length > 0 ? (
						<Slider swiperRef={swiperRef}>
							<Swiper {...params} ref={swiperRef}>
								{images.map((image, index) => {
									return (
										<div key={index}>
											<li
												className={`c-fabric-pattern__item ${!image ? '--no-image' : ''}`}
											>
												{image ? (
													<img src={image} alt="icon" />
												) : (
													<Fragment />
												)}
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
			</div>
		);
	};

	return (
		<div className="c-tooltip">
			<p className="c-tooltip__title">{title}</p>
			<div className="c-tooltip__content">
				{content.map((item, index) => {
					return (
						<div key={index} className="c-tooltip__item">
							{/* <p className="c-tooltip__label">{ isENG ? item.label : item.labelVN}</p>
							{item?.image?.list ? (
								showSlider(item.image.list)
							) : (
								<pre className="c-tooltip__value" style={{ whiteSpace: 'pre-line' }}>{isENG ? item.value : item.valueVN}</pre>
							)} */}
							{
								item?.image?.list ? 
								<>
									<p className="c-tooltip__label">{ isENG ? item.label : item.labelVN}</p>
									{showSlider(item.image.list)}
								</>
								: 
								<div className="c-tooltip__item-text">
									<p className="c-tooltip__label">{ isENG ? item.label : item.labelVN}</p>
									<pre className="c-tooltip__value" style={{ whiteSpace: 'pre-line' }}>{isENG ? item.value : item.valueVN}</pre>
								</div>
							}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Tooltip;
