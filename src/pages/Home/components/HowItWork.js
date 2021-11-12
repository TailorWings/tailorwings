import PropTypes from 'prop-types';
import React from 'react';
import LargeButton from '../../../components/Button/LargeButton';
import Title from '../../../components/Title';
import { HOW_IT_WORK_SUBTITLE, HOW_IT_WORK_TITLE } from '../../../constants';
import howItWork from '../../../assets/images/how-it-work.png';
import howItWorkMobile from '../../../assets/images/how-it-work-mobile.png';

HomeHowItWork.propTypes = {
	handleStart: PropTypes.func,
};

HomeHowItWork.defaultProps = {
	handleStart: null,
};

function HomeHowItWork(props) {
	const { handleStart } = props;
	let isMobile = window.innerWidth < 769;
	return (
		<div className="c-home-how-it-work">
			<div className="c-home-how-it-work__video">
				{isMobile ? (
					<img src={howItWorkMobile} alt="how-it-work" />
				) : (
					<img src={howItWork} alt="how-it-work" />
				)}
			</div>
			<div className="c-home-how-it-work__title">
				<Title title={HOW_IT_WORK_TITLE} subtitle={HOW_IT_WORK_SUBTITLE} textStyle="bigCenter" />
			</div>
			<div onClick={handleStart && handleStart}>
				<LargeButton text="get started" />
			</div>
		</div>
	);
}

export default HomeHowItWork;
