import React from 'react';
import facebookIcon from '../../assets/icons/facebook.svg';
import messengerIcon from '../../assets/icons/messenger.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';

function Footer() {
	return (
		<footer className="c-footer">
			<ul className="c-footer__menu">
				<li className="c-footer__item">Terms</li>
				<li className="c-footer__item">|</li>
				<li className="c-footer__item">FAQS</li>
				<li className="c-footer__item">|</li>
				<li className="c-footer__item">About Us</li>
				<li className="c-footer__item">|</li>
				<li className="c-footer__item">Contact</li>
			</ul>
			<div className="c-footer__social-media">
				<img src={messengerIcon} alt="messenger" />
				<img src={facebookIcon} alt="facebook" />
				<img src={youtubeIcon} alt="youtube" />
			</div>
			<div className="c-footer__business-code">
				<span>© 2021 All right reserved.</span>
				<span>Công ty TNHH Thương Mại Kết Nối Á Âu / Số đăng ký kinh doanh: 0313114301</span>
			</div>
		</footer>
	);
}

export default Footer;
