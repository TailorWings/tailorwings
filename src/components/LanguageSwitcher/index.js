import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

// // use hoc for class based components
// class LegacyWelcomeClass extends Component {
// 	render() {
// 		const { t } = this.props;
// 		return <h2>{t('title')}</h2>;
// 	}
// }
// const Welcome = withTranslation()(LegacyWelcomeClass);

// // Component using the Trans component
// function MyComponent() {
// 	return (
// 		<Trans i18nKey="description.part1">
// 			To get started, edit <code>src/App.js</code> and save to reload.
// 		</Trans>
// 	);
// }

function LanguageSwitcher() {
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className="c-language-switcher">
			<div className="c-language-switcher__container">
				<button
					className={`${i18n.language == 'en' ? 'selected' : ''}`}
					type="button"
					onClick={() => changeLanguage('en')}
				>
					EN
				</button>
				<button
					className={`${i18n.language == 'vn' ? 'selected' : ''}`}
					type="button"
					onClick={() => changeLanguage('vn')}
				>
					VN
				</button>
			</div>
            {/* <div>{i18n.language}</div> */}
            {/* <div>{t('description.part2')}</div> */}
		</div>
	);
}

export default LanguageSwitcher;
