import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import { FABRIC_PATTERN_SUBTITLE, FABRIC_PATTERN_TITLE } from '../../../constants';
import SmallButton from '../../../components/Button/SmallButton';
import leftArrowIcon from '../../../assets/icons/slider-arrow-left.svg';
import rightArrowIcon from '../../../assets/icons/slider-arrow-right.svg';

FabricPattern.propTypes = {
	collections: PropTypes.array,
	patterns: PropTypes.array,
	onCollectionClick: PropTypes.func,
};

FabricPattern.defaultProps = {
	collections: null,
	patterns: null,
	onCollectionClick: null,
};

function FabricPattern(props) {
	const { collections, patterns, onCollectionClick } = props;

	if (!collections || !patterns || !onCollectionClick) return <Fragment />;
	return (
		<div className="c-fabric-pattern">
			<div className="c-fabric-pattern__title">
				<Title title={FABRIC_PATTERN_TITLE} subtitle={FABRIC_PATTERN_SUBTITLE} />
			</div>
			<div className="c-fabric-pattern-collection">
				{collections.map((collection, index) => {
					return (
						<div
							key={index}
							onClick={() => onCollectionClick(index)}
							className="c-fabric-pattern-collection__item"
						>
							<SmallButton text={collection.name} isActive={collection.active} />
						</div>
					);
				})}
			</div>
			<div className="c-fabric-pattern-slider">
				<button className="c-fabric-pattern-slider__left">
					<img src={leftArrowIcon} alt="icon" />
				</button>
				<ul className="c-fabric-pattern-slider__list">
					{patterns.map((pattern, index) => {
						return (
							<li key={index} className="c-fabric-pattern-slider__item">
								{pattern.src && <img src={pattern} alt="icon" />}
							</li>
						);
					})}
				</ul>
				<button className="c-fabric-pattern-slider__right">
					<img src={rightArrowIcon} alt="icon" />
				</button>
			</div>
		</div>
	);
}

export default FabricPattern;
