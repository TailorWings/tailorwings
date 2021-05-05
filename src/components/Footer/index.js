import React from 'react';
import facebookIcon from '../../assets/icons/facebook.svg';
import messengerIcon from '../../assets/icons/messenger.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';

function Footer() {
	return (
		<footer className="c-footer">
			<ul className="c-footer__menu">
				<a
					href="https://www.facebook.com/TailorWings"
					target="_blank"
					rel="noreferrer"
					className="c-footer__item"
				>
					Terms
				</a>
				<li className="c-footer__item">|</li>
				<a
					href="https://www.facebook.com/TailorWings"
					target="_blank"
					rel="noreferrer"
					className="c-footer__item"
				>
					FAQs
				</a>
				<li className="c-footer__item">|</li>
				<a
					href="https://www.facebook.com/TailorWings"
					target="_blank"
					rel="noreferrer"
					className="c-footer__item"
				>
					About Us
				</a>
				<li className="c-footer__item">|</li>
				<a
					href="https://www.facebook.com/messages/t/334170847264692"
					target="_blank"
					rel="noreferrer"
					className="c-footer__item"
				>
					Contact
				</a>
			</ul>
			<div className="c-footer__social-media">
				<a
					href="https://www.facebook.com/TailorWings"
					target="_blank"
					rel="noreferrer"
				>
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
				<span>TAILOR WINGS COMPANY LIMITED / Tax code: 0316695125</span>
			</div>
		</footer>
	);
}

export default Footer;
