import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import {
	FABRIC_MATERIAL_SUBTITLE,
	FABRIC_MATERIAL_TITLE,
	FABRIC_TOOLTIP_CONTENT,
	FABRIC_TOOLTIP_TITLE,
} from '../../../constants';
import Tooltip from '../../../components/Tooltip';

FabricMaterials.propTypes = {
	materials: PropTypes.array,
};

FabricMaterials.defaultProps = {
	materials: null,
};

function FabricMaterials(props) {
	const { materials } = props;
	if (!materials) return <Fragment />;
	return (
		<div className="c-fabric-materials">
			<div className="c-fabric-materials__title">
				<Title title={FABRIC_MATERIAL_TITLE} subtitle={FABRIC_MATERIAL_SUBTITLE} />
			</div>
			<ul className="c-fabric-materials__list">
				{materials.map((material, index) => {
					return (
						<li key={index} className="c-fabric-materials__item">
							{material.url && <img src="" alt="" />}
						</li>
					);
				})}
			</ul>
			<div className="c-fabric-materials__tooltip">
				<Tooltip title={FABRIC_TOOLTIP_TITLE} content={FABRIC_TOOLTIP_CONTENT} />
			</div>
		</div>
	);
}

export default FabricMaterials;
