import React from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/icons/facebook.svg';
import messengerIcon from '../../assets/icons/messenger.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import { useTranslation, withTranslation, Trans } from 'react-i18next';


function Footer() {
	const { t } = useTranslation();
	return (
		<footer className="c-footer">
			<ul className="c-footer__menu">
				<a
					href="https://www.facebook.com/TailorWings"
					target="_blank"
					rel="noreferrer"
					className="c-footer__item"
				>
					{t('terms')}
				</a>
				<li className="c-footer__item">|</li>
				<Link
					to="/faq"
					className="c-footer__item"
				>
					{t('faqs')}
				</Link>
				<li className="c-footer__item">|</li>
				<Link
					to="/about"
					className="c-footer__item"
				>
					{t('aboutUs')}
				</Link>
				<li className="c-footer__item">|</li>
				<a
					href="https://www.facebook.com/messages/t/334170847264692"
					target="_blank"
					rel="noreferrer"
					className="c-footer__item"
				>
					{t('contact')}
				</a>
			</ul>
			<div className="c-footer__social-media">
				<a href="https://www.facebook.com/TailorWings" target="_blank" rel="noreferrer">
					<img src={messengerIcon} alt="messenger" />
				</a>
				<a href="https://www.facebook.com/TailorWings" target="_blank" rel="noreferrer">
					<img src={facebookIcon} alt="facebook" />
				</a>
				<a href="https://www.tailorwings.com/">
					<img src={youtubeIcon} alt="youtube" />
				</a>
			</div>
			<div className="c-footer__business-code">
				<span>© 2021 All right reserved.</span>
				<span>{t('companyName')}</span>
			</div>
		</footer>
	);
}

export default Footer;
