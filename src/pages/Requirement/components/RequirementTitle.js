import React from 'react';
import Title from '../../../components/Title';
import { RQPAGE_SUBTITLE, RQPAGE_TITLE } from '../../../constants';

function RequirementTitle() {
	return (
		<div className="c-requirement-title">
			<Title title={RQPAGE_TITLE} subtitle={RQPAGE_SUBTITLE} />
		</div>
	);
}

export default RequirementTitle;
