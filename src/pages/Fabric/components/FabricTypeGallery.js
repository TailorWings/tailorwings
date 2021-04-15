import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import test1 from '../../../assets/images/test1.jpg';
import test2 from '../../../assets/images/test2.jpg';
import test3 from '../../../assets/images/test3.jpg';

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
					<li
						key={index}
						className="c-fabric-type-gallery__item"
						onClick={() => onFabricTypeClick(index)}
					>
						{type.image && <img src={type.image} alt={type.id} />}
					</li>
				);
			})}
			{/* <li className="c-fabric-type-gallery__item">
				<img src={test1} alt="test" />
			</li>
			<li className="c-fabric-type-gallery__item">
				<img src={test2} alt="test" />
			</li>
			<li className="c-fabric-type-gallery__item">
				<img src={test3} alt="test" />
			</li> */}
		</ul>
	);
}

export default FabricTypeGallery;
