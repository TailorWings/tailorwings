import React from 'react';
import MediumButton from '../../../components/Button/MediumButton';
import { Link } from 'react-router-dom';

function RequirementConfirm(props) {
	return (
		<div className="c-rq-confirm">
			<p className="c-rq-confirm__text">
				Minimum image size 500 KB. The higher the quality, the higher the results.
			</p>
			<Link to="/fabric">
				<MediumButton isActive={true} text="next" />
			</Link>
		</div>
	);
}

export default RequirementConfirm;
