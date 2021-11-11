import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { resetState, setCurrentCustomer } from '../../app/ReduxSlices/commonSlice';
import { setTailor } from '../../app/ReduxSlices/tailorSlice';
import userIcon from '../../assets/icons/user.svg';
import usaIcon from '../../assets/icons/usa.png';
import vnIcon from '../../assets/icons/vn.png';
import chevronDownIcon from '../../assets/icons/chevron-down.png';
import chevronUpIcon from '../../assets/icons/chevron-up.png';
import { useTranslation, withTranslation, Trans } from 'react-i18next';


LanguagesDropdown.propTypes = {
};

LanguagesDropdown.defaultProps = {
};

function LanguagesDropdown(props) {

	const { t, i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	
	const isENG = i18n.language == 'en';
	const languageText = isENG ? "ENG" : "VNE";
	const [dropdownOpen, setDropdownOpen] = useState(false);
	useEffect(() => {
		document.querySelector('html, body').addEventListener('click', function () {
			let dropdownContent = document.querySelector('.c-languages-dropdown__content');
			if (dropdownContent) {
				if (dropdownContent.classList.contains('--open')) {
					setDropdownOpen(false);
				}
			}
		});
		return () => {
			document.querySelector('html, body').removeEventListener('click', function () {});
		};
	}, []);
	/*--------------*/
	return (
		<div
			className="c-languages-dropdown"
			onClick={(e) => {
				e.stopPropagation();
				setDropdownOpen(!dropdownOpen);
			}}
		>
			<Fragment>
				<div className="c-languages-dropdown__item"
					onClick={(e) => {
						e.stopPropagation();
						setDropdownOpen(!dropdownOpen);
					}}
				>
					<img className="c-languages-dropdown__flag" src={isENG ? usaIcon : vnIcon}/>
					<div><span>{languageText}</span></div>
					<img className="c-languages-dropdown__chevron" src={chevronDownIcon} />
				</div>
			</Fragment>
			<ul
				className={
					dropdownOpen ? 'c-languages-dropdown__content --open' : 'c-languages-dropdown__content'
				}
			>
				<Fragment>
					<li onClick={() => changeLanguage('en')}>ENG</li>
					<li onClick={() => changeLanguage('vn')}>VNE</li>
				</Fragment>
			</ul>
		</div>
	);
}

export default LanguagesDropdown;
