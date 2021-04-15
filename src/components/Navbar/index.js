import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MediumButton from '../Button/MediumButton';
import AvatarDropdown from '../Dropdown/AccountDropdown';
import logo from '../../assets/images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { controlLogin } from '../../app/ReduxSlices/commonSlice';
import Login from '../Login';

function Navbar() {
	/*--------------*/
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const dispatch = useDispatch();
	/*********************************
	 *  Description: conditional render for login status
	 */
	function loginStatusRender() {
		if (currentCustomer) {
			return (
				<div className="c-navbar__account">
					<AvatarDropdown avatar={currentCustomer.photoURL} isAdmin={currentCustomer.r === 'ad'} />
				</div>
			);
		} else {
			return (
				<div className="c-navbar__account">
					{/* <div className="c-navbar__sign-up">
						<MediumButton text="sign up" isActive={true} />
					</div> */}
					<div
						className="c-navbar__sign-in"
						onClick={() => {
							const action_controlLogin = controlLogin(true);
							dispatch(action_controlLogin);
						}}
					>
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
					{logo && (
						<Link to="/">
							<img src={logo} alt="logo" className="c-navbar__logo" />
						</Link>
					)}
					{loginStatusRender()}
				</div>
			</div>
			<Login />
		</nav>
	);
}

export default Navbar;
