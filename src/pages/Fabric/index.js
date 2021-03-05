import React, { useState } from 'react';
import { FABRIC_MATERIALS } from '../../constants';
import FabricMaterials from './components/FabricMaterials';
import FabricPattern from './components/FabricPattern';
import FabricProcessAction from './components/FabricProcessAction';

const TEST_PATTERN_COLLECTION = ['all', 'floral', 'animal', 'people', 'things', 'plain'];
const TEST_PATTERN_IMAGES = new Array(10).fill({ src: null });

function FabricPage(props) {
	/*--------------*/
	// window.scrollTo({
	// 	top: 0,
	// 	behavior: 'smooth',
	// });
	/*--------------*/
	const [patternCollection, setPatternCollection] = useState(
		TEST_PATTERN_COLLECTION.map((collection, index) => {
			return { name: collection, active: index === 0 };
		})
	);
	/*--------------*/
	/*********************************
	 *  Description: update collection active status
	 */
	function handleCollectionStatus(updateIndex) {
		let newPatternCollectionStatus = patternCollection.map((collection, index) => {
			return { ...collection, active: index === updateIndex };
		});
		if (newPatternCollectionStatus) {
			setPatternCollection(newPatternCollectionStatus);
		}
	}
	/************_END_****************/

	return (
		<div className="l-fabric container">
			<FabricMaterials materials={FABRIC_MATERIALS} />
			<FabricPattern
				collections={patternCollection}
				patterns={TEST_PATTERN_IMAGES}
				onCollectionClick={handleCollectionStatus}
			/>
			<FabricProcessAction />
		</div>
	);
}

export default FabricPage;
