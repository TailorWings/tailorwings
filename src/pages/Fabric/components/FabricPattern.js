import PropTypes from 'prop-types';
import React, { Fragment, useRef } from 'react';
import ReactIdSwiper from 'react-id-swiper';
import ListLoader from '../../../components/ComponentLoader';
import Picker from '../../../components/Picker';
import ProcessAction from '../../../components/ProcessAction';
import Slider from '../../../components/Slider';
import Title from '../../../components/Title';
import { FABRIC_PATTERN_SUBTITLE, FABRIC_PATTERN_TITLE } from '../../../constants';

FabricPattern.propTypes = {
	collections: PropTypes.array,
	patterns: PropTypes.array,
	onCollectionClick: PropTypes.func,
	onPatternClick: PropTypes.func,
	onNextClick: PropTypes.func,
};

FabricPattern.defaultProps = {
	collections: null,
	patterns: null,
	onCollectionClick: null,
	onPatternClick: null,
	onNextClick: null,
};

function FabricPattern(props) {
	const { collections, patterns, onCollectionClick, onPatternClick, onNextClick } = props;
	/*--------------*/
	const swiperRef = useRef(null);
	const params = {
		slidesPerView: 5,
		slidesPerColumn: 2,
		spaceBetween: 16,
		slidesPerColumnFill: 'row',
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	};
	/*********************************
	 *  Description: handle fabric type click
	 */
	function onPatternSelect(clickedIndex) {
		let updatedPattern = patterns.map((pattern, index) => {
			return { ...pattern, active: index === clickedIndex };
		});
		if (updatedPattern) {
			onPatternClick(updatedPattern);
		}
	}
	/************_END_****************/
	/*--------------*/
	if (!collections || !onCollectionClick || !onPatternClick) return <Fragment />;

	return (
		<div className="c-fabric-pattern">
			<div className="c-fabric-pattern__title">
				<Title title={FABRIC_PATTERN_TITLE} subtitle={FABRIC_PATTERN_SUBTITLE} />
			</div>
			<div className="c-fabric-pattern-collection">
				<Picker list={collections} onItemClick={onCollectionClick} />
			</div>
			<Slider swiperRef={swiperRef}>
				{patterns ? (
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
				) : (
					<ListLoader />
				)}
			</Slider>
			<ProcessAction backLink="/requirement" onNextClick={onNextClick} />
		</div>
	);
}

export default FabricPattern;
