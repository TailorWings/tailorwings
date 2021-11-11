import PropTypes from 'prop-types';
import React from 'react';
import MediumButton from '../../../components/Button/MediumButton';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

RqmtFooter.propTypes = {
	onNextClick: PropTypes.func,
	disabled: PropTypes.bool,
};

RqmtFooter.defaultProps = {
	onNextClick: null,
	disabled: false
};

function RqmtFooter(props) {
	const { onNextClick, disabled } = props;
	const { t } = useTranslation();

	return (
		<div className="c-rqmt-footer">
			<p className="c-rqmt-footer__text">
				{t('minImageRequirement')}
			</p>
			<div className={`c-rqmt-footer__btn ${disabled ? 'disabled' : ""}`} onClick={onNextClick}>
				<MediumButton isActive={true} text={t('next')} />
			</div>
		</div>
	);
}

export default RqmtFooter;
