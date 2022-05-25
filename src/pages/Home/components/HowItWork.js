import PropTypes from 'prop-types';
import React from 'react';
import LargeButton from '../../../components/Button/LargeButton';
import Title from '../../../components/Title';
import { HOW_IT_WORK_SUBTITLE, HOW_IT_WORK_TITLE } from '../../../constants';
import howItWork from '../../../assets/images/how-it-work.png';
import howItWorkMobile from '../../../assets/images/how-it-work-mobile.png';
import howItWorkVN from '../../../assets/images/how-it-work-VN.png';
import howItWorkMobileVN from '../../../assets/images/how-it-work-mobile-VN.png';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

HomeHowItWork.propTypes = {
	handleStart: PropTypes.func,
};

HomeHowItWork.defaultProps = {
	handleStart: null,
};

function HomeHowItWork(props) {
	const { handleStart } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	let isMobile = window.innerWidth < 769;
	return (
		<div className="c-home-how-it-work">
			<div className="c-home-how-it-work__video">
				{isMobile ? (
					<img src={ isENG ? howItWorkMobile : howItWorkMobileVN} alt="how-it-work" />
				) : (
					<img src={ isENG ?  howItWork : howItWorkVN} alt="how-it-work" />
				)}
			</div>
			{/* <div className="c-home-how-it-work__title">
				<Title title={t('mainTitle')} subtitle={t('mainSubTitle')} textStyle="bigCenter" />
			</div>
			<div onClick={handleStart && handleStart}>
				<LargeButton text={t('getStarted')} />
			</div> */}
		</div>
	);
}

export default HomeHowItWork;
