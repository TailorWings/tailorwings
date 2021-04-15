import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCustomer } from '../../app/ReduxSlices/commonSlice';
import { Link } from 'react-router-dom';
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
	return (
		<div className="c-account-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
			<img src={avatar || userIcon} alt="avatar" onClick={() => setDropdownOpen(!dropdownOpen)} />
			<ul className={dropdownOpen ? '--open' : ''}>
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
