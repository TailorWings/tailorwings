import React, { useState } from 'react';
import { STYLES_OF_CLOTHE } from '../../constants';
import RequirementClotheStyles from './components/RequirementClotheStyles';
import RequirementConfirm from './components/RequirementConfirm';
import RequirementImageUpload from './components/RequirementImageUpload';
import RequirementTitle from './components/RequirementTitle';

RequirementPage.propTypes = {};

function RequirementPage(props) {
	const [styles, setStyles] = useState(
		STYLES_OF_CLOTHE.map((style, index) => {
			return { style, active: index === 0 };
		})
	);

	/*********************************
	 *  Description: Handle styles click and change state of styles
	 */
	function handleStylesStatus(activeIndex) {
		let newStatus = styles.map((style, index) => {
			return { ...style, active: activeIndex === index };
		});

		if (newStatus) {
			setStyles(newStatus);
		}
	}
	/************_END_****************/
	return (
		<div className="l-requirement">
			<div className="container">
				<RequirementTitle />
				<RequirementClotheStyles styles={styles} onStyleClick={handleStylesStatus} />
				<RequirementImageUpload />
				<RequirementConfirm />
			</div>
		</div>
	);
}

export default RequirementPage;
