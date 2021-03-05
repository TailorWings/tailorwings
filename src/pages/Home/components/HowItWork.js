import React from 'react';
import PropTypes from 'prop-types';
import LargeButton from '../../../components/Button/LargeButton';
import { Link } from 'react-router-dom';
import Title from '../../../components/Title';
import { HOW_IT_WORK_TITLE, HOW_IT_WORK_SUBTITLE } from '../../../constants';

HomeHowItWork.propTypes = {};

function HomeHowItWork(props) {
	return (
		<div className="container">
			<div className="c-home-how-it-work">
				<div className="c-home-how-it-work__video"></div>
				<div className="c-home-how-it-work__title">
					<Title title={HOW_IT_WORK_TITLE} subtitle={HOW_IT_WORK_SUBTITLE} />
				</div>
				<Link to="/requirement">
					<LargeButton text="start" />
				</Link>
			</div>
		</div>
	);
}

export default HomeHowItWork;
