import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import { FABRIC_TYPE_SUBTITLE, FABRIC_TYPE_TITLE, FABRIC_TOOLTIP_TITLE } from '../../../constants';
import Tooltip from '../../../components/Tooltip';
import FabricTypeGallery from './FabricTypeGallery';

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
	/*--------------*/

	if (!fabricType) return <Fragment />;
	return (
		<div className="c-fabric-type">
			<div className="c-fabric-type__title">
				<Title title={FABRIC_TYPE_TITLE} subtitle={FABRIC_TYPE_SUBTITLE} />
			</div>
			<div className="c-fabric-type__wrapper">
				<div className="c-fabric-type__gallery">
					<FabricTypeGallery fabricType={fabricType} setFabricType={setFabricType} />
				</div>
				<div className="c-fabric-type__tooltip">
					<Tooltip
						title={FABRIC_TOOLTIP_TITLE}
						content={
							fabricType.find((type) => type.active) && fabricType.find((type) => type.active).info
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default FabricType;
