import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../Button/MediumButton';
import { Link } from 'react-router-dom';
import { useTranslation, withTranslation, Trans } from 'react-i18next';


ProcessAction.propTypes = {
	backLink: PropTypes.string,
	nextLink: PropTypes.string,
	backText: PropTypes.string,
	nextText: PropTypes.string,
	onNextClick: PropTypes.func,
	formID: PropTypes.string,
	disabled: PropTypes.bool,
};

ProcessAction.defaultProps = {
	backLink: null,
	nextLink: null,
	backText: 'back',
	nextText: 'next',
	onNextClick: null,
	formID: '',
	disabled: false,
};

function ProcessAction(props) {

	const { t, i18n } = useTranslation();

	const { backLink, nextLink, onNextClick, backText, nextText, formID, disabled } = props;

	if (!backLink) return <Fragment />;
	return (
		<div className="c-process-action">
			<Link to={backLink}>
				<MediumButton text={t('back')} isActive={false} />
			</Link>
			{nextLink ? (
				<Link to={nextLink}>
					<MediumButton text={t('next')} isActive={true} />
				</Link>
			) : (
				<button
					onClick={onNextClick || null}
					type="submit"
					form={formID}
					className={`${disabled ? 'disabled' : ''}`}
				>
					<MediumButton text={t('next')} isActive={true} />
				</button>
			)}
		</div>
	);
}

export default ProcessAction;
