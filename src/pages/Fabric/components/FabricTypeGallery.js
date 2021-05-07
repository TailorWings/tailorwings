import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import SmallButton1 from '../../../components/Button/SmallButton1';

FabricTypeGallery.propTypes = {
	fabricType: PropTypes.array,
	setFabricType: PropTypes.func,
};

FabricTypeGallery.defaultProps = {
	fabricType: [],
	setFabricType: null,
};

function FabricTypeGallery(props) {
	const { fabricType, setFabricType } = props;
	/*--------------*/
	/*********************************
	 *  Description: handle fabric type click
	 */
	function onFabricTypeClick(clickedIndex) {
		let updatedFabricType = fabricType.map((type, index) => {
			return { ...type, active: index === clickedIndex };
		});
		if (updatedFabricType) {
			setFabricType(updatedFabricType);
		}
	}
	/************_END_****************/
	/*--------------*/
	if (!fabricType || !setFabricType) return <Fragment />;
	return (
		<ul className="c-fabric-type-gallery__list">
			{fabricType.map((type, index) => {
				return (
					<li key={index} className='c-fabric-type-gallery__item'>
						<div
							key={index}
							className={`c-fabric-type-gallery__image ${type.active && '--active'}`}
							onClick={() => onFabricTypeClick(index)}
						>	
							{type.image && <img src={type.image} alt={type.id} />}
							<span>{type.name}</span>
						</div>
						{/* <div className="c-fabric-type-gallery__btn" onClick={() => onFabricTypeClick(index)}>
							<SmallButton1 text={type.name} isActive={type.active} />
						</div> */}
					</li>
				);
			})}
		</ul>
	);
}

export default FabricTypeGallery;
