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
import { useTranslation } from 'react-i18next';

FabricBottom.propTypes = {
	collections: PropTypes.array,
	patterns: PropTypes.array,
	onCollectionClick: PropTypes.func,
	onPatternClick: PropTypes.func,
	onNextClick: PropTypes.func,
	// estPrice: PropTypes.string,
	isConfirmDisabled: PropTypes.bool,
	currentDesign: PropTypes.string,
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
	const { onNextClick, estPrice, isConfirmDisabled, currentDesign } = props;

	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';

	/*--------------*/
	// if (!collections || !onCollectionClick || !onPatternClick) return <Fragment />;

	return (
		<div className="c-fabric-bottom">
			{estPrice && currentDesign ? (
				<div className="c-fabric-bottom__estprice">
					{currentDesign.id === 'others' ? (
						''
					) : (
						<Fragment>
							<p>{`~ ${modifyPrice(estPrice)} VND`}</p>
							{/* <p>{isENG ? `Order's estimated price`: 'Giá cả tham khảo'}</p> */}
							<p>{t('fabric.estimated')}</p>
						</Fragment>
					)}
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
