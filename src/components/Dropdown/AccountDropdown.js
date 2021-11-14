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
import { useTranslation, withTranslation, Trans } from 'react-i18next';

AccountDropdown.propTypes = {
	avatar: PropTypes.string,
	isAdmin: PropTypes.bool,
	type: PropTypes.string,
};

AccountDropdown.defaultProps = {
	avatar: null,
	isAdmin: false,
	type: 'customer'
};

function AccountDropdown(props) {
	/*--------------*/
	const history = useHistory();
	const { avatar, isAdmin, type } = props;
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	/*--------------*/
	useEffect(() => {
		document.querySelector('html, body').addEventListener('click', function () {
			let dropdownContent = document.querySelector('.c-account-dropdown__content');
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
	function customerRender() {
		return ( 
			<Fragment>
				{isAdmin ? (
					<Link to="/admin">
						<li>Management</li>
					</Link>
				) : (
					<Fragment />
				)}
				<Link to="/account" onClick={() => setDropdownOpen(!dropdownOpen)}>
					<li>{t('yourOrders')}</li>
				</Link>
				<li
					onClick={() => {
						firebase.auth().signOut();
						const action_setCurrentCustomer = setCurrentCustomer(null);
						dispatch(action_setCurrentCustomer);
						const action_resetState = resetState(null);
						dispatch(action_resetState);
						setDropdownOpen(!dropdownOpen);
						history.push('/');
					}}
				>
					{t('signOut')}
				</li>
			</Fragment>
		)
	}
	function tailorRender() {
		return ( 
			<Fragment>
				<li
					onClick={() => {
						dispatch(setTailor(null))
					}}
				>
					Đăng xuất
				</li>
			</Fragment>
		)
	}
	/*--------------*/
	return (
		<div
			className="c-account-dropdown"
			onClick={(e) => {
				e.stopPropagation();
				setDropdownOpen(!dropdownOpen);
			}}
		>
			<img
				className="c-account-dropdown__avatar"
				src={avatar || userIcon}
				alt="avatar"
				onClick={(e) => {
					e.stopPropagation();
					setDropdownOpen(!dropdownOpen);
				}}
			/>
			<ul
				className={
					dropdownOpen ? 'c-account-dropdown__content --open' : 'c-account-dropdown__content'
				}
			>
				{
					type === 'customer' ? customerRender() : tailorRender()
				}
				
			</ul>
		</div>
	);
}

export default AccountDropdown;
