import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { resetState, setCurrentCustomer } from '../../app/ReduxSlices/commonSlice';
import userIcon from '../../assets/icons/user.svg';

AccountDropdown.propTypes = {
	avatar: PropTypes.string,
	isAdmin: PropTypes.bool,
};

AccountDropdown.defaultProps = {
	avatar: null,
	isAdmin: false,
};

function AccountDropdown(props) {
	/*--------------*/
	const history = useHistory();
	const { avatar, isAdmin } = props;
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dispatch = useDispatch();
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
				{isAdmin ? (
					<Link to="/admin">
						<li>Management</li>
					</Link>
				) : (
					<Fragment />
				)}
				<Link to="/account" onClick={() => setDropdownOpen(!dropdownOpen)}>
					<li>Your orders</li>
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
					Sign out
				</li>
			</ul>
		</div>
	);
}

export default AccountDropdown;
