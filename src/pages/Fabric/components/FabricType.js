import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import { FABRIC_TYPE_SUBTITLE, FABRIC_TYPE_TITLE, FABRIC_TOOLTIP_TITLE, STYLES_OF_CLOTHE , FABRIC_TYPES} from '../../../constants';
import Tooltip from '../../../components/Tooltip';
import FabricTypeGallery from './FabricTypeGallery';
import { map } from 'lodash'
import { useTranslation, withTranslation, Trans } from 'react-i18next';

import Picker from '../../../components/Picker';
// import Title from '../../../components/Title';

FabricType.propTypes = {
	fabricType: PropTypes.array,
	setFabricType: PropTypes.func,
};

FabricType.defaultProps = {
	fabricType: null,
	setFabricType: null,
};



function FabricType(props) {
	const { fabricType, setFabricType } = props;
	const { t } = useTranslation();

	const fabricTypesList = map(fabricType, 'name');
	const [fabricTypes, setStyles] = useState(
		fabricTypesList.map((style) => {
			return { name: style, active: false };
		})
	);
	const onStyleClick = function(activeIndex) {
		let newStatus = fabricTypes.map((style, index) => {
			return { ...style, active: activeIndex === index };
		});
	
		if (newStatus) {
			setStyles(newStatus);
		}

		let updatedFabricType = fabricType.map((type, index) => {
			return { ...type, active: index === activeIndex };
		});
		if (updatedFabricType) {
			setFabricType(updatedFabricType);
		}

	}

	if (!fabricType) return <Fragment />;
	return (
		<div className="c-fabric-type">
			<div className="c-fabric-type__content-1">
				<div className="c-fabric-type__title">
					<Title title={t('fabric.typeTitle')} subtitle={t('fabric.typeSubTitle')} />
				</div>

				<div className="c-fabric-type__picker">
					<Picker list={fabricTypes} onItemClick={onStyleClick} />
				</div>
			</div>
			{/* <div className="c-fabric-type__wrapper">
				<div className="c-fabric-type__tooltip">
					<Tooltip
						title={FABRIC_TOOLTIP_TITLE}
						content={
							fabricType.find((type) => type.active) && fabricType.find((type) => type.active).info
						}
					/>
				</div>
			</div> */}
		</div>
	);
}

export default FabricType;
