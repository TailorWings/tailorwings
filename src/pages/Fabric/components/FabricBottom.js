import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import ListLoader from '../../../components/ComponentLoader';
import Picker from '../../../components/Picker';
import ProcessAction from '../../../components/ProcessAction';
import Slider from '../../../components/Slider';
import Title from '../../../components/Title';
import { FABRIC_PATTERN_SUBTITLE, FABRIC_PATTERN_TITLE } from '../../../constants';
import { PhotoSwipe } from 'react-photoswipe-2';
import MediumButton from '../../../components/Button/MediumButton';
import { modifyPrice } from '../../../services/Functions/commonFunctions';

FabricBottom.propTypes = {
	collections: PropTypes.array,
	patterns: PropTypes.array,
	onCollectionClick: PropTypes.func,
	onPatternClick: PropTypes.func,
	onNextClick: PropTypes.func,
	// estPrice: PropTypes.string,
	isConfirmDisabled: PropTypes.bool,
	currentDesign: PropTypes.string
};

FabricBottom.defaultProps = {
	collections: null,
	patterns: null,
	onCollectionClick: null,
	onPatternClick: null,
	onNextClick: null,
	estPrice: null,
	currentDesign: null,
};

const PHOTO_SWIPE_SIZE = 500;

function FabricBottom(props) {
	const {
		onNextClick,
		estPrice,
		isConfirmDisabled,
		currentDesign
	} = props;
	/*--------------*/
	// if (!collections || !onCollectionClick || !onPatternClick) return <Fragment />;
	console.log(currentDesign)
	return (
		<div className="c-fabric-bottom">
			{estPrice && currentDesign ? (
				<div className="c-fabric-bottom__estprice">
					<p>{currentDesign.id === 'others'? '': '~'}{` ${modifyPrice(estPrice)} VND`}</p>
					<p>{`Order's estimated price`}</p>
				</div>
			) : (
				<Fragment />
			)}
			<ProcessAction
				backLink="/requirement"
				onNextClick={onNextClick}
				disabled={isConfirmDisabled}
			/>
		</div>
	);
}

export default FabricBottom;
