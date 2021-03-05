import PropTypes from 'prop-types';
import React from 'react';
import MediumButton from '../Button/MediumButton';
import AvatarDropdown from '../Dropdown/AccountDropdown';

Navbar.propTypes = {
	logo: PropTypes.string,
	isLogin: PropTypes.bool,
};

Navbar.defaultProps = {
	logo: null,
	isLogin: false,
};

function Navbar(props) {
	const { logo, isLogin } = props;

	/*********************************
	 *  Description: conditional render for login status
	 */
	function loginStatusRender() {
		if (isLogin) {
			return (
				<div className="c-navbar__account">
					<AvatarDropdown />
				</div>
			);
		} else {
			return (
				<div className="c-navbar__account">
					<div className="c-navbar__sign-up">
						<MediumButton text="sign up" isActive={true} />
					</div>
					<div className="c-navbar__sign-in">
						<MediumButton text="sign in" />
					</div>
				</div>
			);
		}
	}
	/************_END_****************/

	return (
		<nav className="c-navbar">
			<div className="wrapper">
				<div className="container c-navbar__container">
					{logo && <img src={logo} alt="logo" className="c-navbar__logo" />}
					{loginStatusRender()}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
