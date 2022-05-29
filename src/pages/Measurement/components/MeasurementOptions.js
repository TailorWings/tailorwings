import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/Title';
import { MSMT_OPTION_SUBTITLE, MSMT_OPTION_TITLE } from '../../../constants';
import MeasurementMethod from './MeasurementMethod';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

MeasurementOptions.propTypes = {
	match: PropTypes.object,
	methods: PropTypes.array,
	onMethodClick: PropTypes.func,
};

MeasurementOptions.defaultProps = {
	match: null,
	methods: null,
	onMethodClick: null,
};

function MeasurementOptions(props) {
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	const { match, methods, onMethodClick } = props;
	if (!match || !methods || !onMethodClick) return <Fragment />;
	return (
		<div className="c-msmt-options">
			<div className="c-msmt-options__title">
				<Title title={t('measurement.title')} subtitle={t('measurement.subTitle')} />
			</div>
			<div className="c-msmt-options-method">
				{methods.map((method, index) => {
					const { name, desc, buttonText, nameVN, descVN, buttonTextVN, active, link } = method;
					return (
						<Link
							to={`${match.path}${link}`}
							onClick={() => onMethodClick(index)}
							key={index}
							className="c-msmt-options-method__item"
						>
							<MeasurementMethod
								name={t(name)}
								desc={t(desc)}
								buttonText={t(buttonText)}
								isActive={active}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default MeasurementOptions;
