// import { updateLoginDisplayStatus, updatePageFixedTopStatus } from 'actions';
import classNames from 'classnames';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useDispatch, useSelector } from 'react-redux';
import { controlLogin, setCurrentCustomer } from '../../app/ReduxSlices/commonSlice';
import BagIcon from '../../assets/icons/black-bag.svg';
import closeButton from '../../assets/icons/login-close.svg';
import userIcon from '../../assets/icons/user.svg';
import loginPicture from '../../assets/images/login-picture.png';
import { fetchDocumentRealtime, setDocument } from '../../services/API/firebaseAPI';

function Login() {
	/*--------------*/
	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// signInSuccessUrl: "/admin",
		// We will display Google and Facebook as auth providers.
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			// firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false,
		},
	};
	/*--------------*/
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggin, setIsLoggin] = useState(false);
	/*--------------*/
	const isLoginOpen = useSelector((state) => state.common.isLoginOpen);
	/*--------------*/
	const dispatch = useDispatch();
	/*--------------*/
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
			/*--------------*/
			if (user) {
				if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
					/*--------------*/
					setIsLoggin(true);
					/*--------------*/
					setCurrentUser(user);
					/*--------------*/
					if (user) {
						const { displayName, email, phoneNumber, photoURL, uid } = user;
						fetchDocumentRealtime('customers', uid, (result) => {
							if (result.id) {
								let newCustomer = { ...result };
								delete newCustomer.timestamp; // remove timestamp to fix bug
								const action_setCurrentCustomer = setCurrentCustomer(newCustomer);
								dispatch(action_setCurrentCustomer);
								/*--------------*/
							} else {
								let newCustomer = {
									id: uid,
									displayName,
									email,
									phoneNumber,
									photoURL,
									msmt: null,
									orders: null,
								};
								const action_setCurrentCustomer = setCurrentCustomer(newCustomer);
								dispatch(action_setCurrentCustomer);
								/*--------------*/
								setDocument('customers', newCustomer, newCustomer.id);
							}
						});
						// fetchDocument('customers', uid).then((result) => {
						// 	if (result) {
						// 		let newCustomer = { ...result };
						// 		delete newCustomer.timestamp; // remove timestamp to fix bug
						// 		const action_setCurrentCustomer = setCurrentCustomer(newCustomer);
						// 		dispatch(action_setCurrentCustomer);
						// 	} else {
						// 		let newCustomer = {
						// 			id: uid,
						// 			displayName,
						// 			email,
						// 			phoneNumber,
						// 			photoURL,
						// 			msmt: null,
						// 			orders: null,
						// 		};
						// 		const action_setCurrentCustomer = setCurrentCustomer(newCustomer);
						// 		dispatch(action_setCurrentCustomer);
						// 		/*--------------*/
						// 		setDocument('customers', newCustomer, newCustomer.id);
						// 	}
						// });
					}
				}
			} else {
				/*--------------*/
				setCurrentUser(null);
				/*--------------*/
				setIsLoggin(false);
			}
		});
		return () => {
			unregisterAuthObserver();
		};
	});

	/*********************************
	 *  Description: handle login display status change
	 *
	 *
	 *  Call by:
	 */
	function onLoginClose() {
		/*--------------*/
		const action_controlLogin = controlLogin(false);
		dispatch(action_controlLogin);
		// /*--------------*/
		// const action_updatePageFixedTopStatus = updatePageFixedTopStatus();
		// dispatch(action_updatePageFixedTopStatus);
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle click on bg to close
	 *
	 *
	 *  Call by:
	 */
	function onBackgroundClick(e) {
		if (e.target.className === 'c-login c-login--open') {
			onLoginClose();
		}
	}
	/************_END_****************/
	return (
		<div
			className={classNames('c-login', { 'c-login--open': isLoginOpen })}
			onClick={(e) => onBackgroundClick(e)}
		>
			<div className="c-login__content">
				<div className="c-login__close" onClick={onLoginClose}>
					{isLoggin || <img src={closeButton} alt="close-button" />}
				</div>
				<div className="c-login__detail">
					<div className="c-login__picture">
						{currentUser ? (
							<img className="c-login__user-photo" src={currentUser.photoURL ? currentUser.photoURL : userIcon} alt="login" />
						) : (
							<img src={loginPicture} alt="login" />
						)}
					</div>
					<span className="c-login__welcome">
						{currentUser
							? (currentUser.displayName ? `We're glad you are here, ${currentUser.displayName} !` : `We're glad you are here!`)
							: 'Please sign-in to save your work!'}
					</span>
					<div className="c-login__button">
						{isLoggin ? (
							<div onClick={onLoginClose}>
								<button className="c-login__go-to-admin">
									<span>continue</span>
								</button>
							</div>
						) : (
							<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
						)}
					</div>
					{/* {isLoggin ? (
						<button className="c-login__go-to-admin" onClick={() => firebase.auth().signOut()}>
							<img src={IconPerson} alt="icon-person" />
							<span>Đăng xuất</span>
						</button>
					) : (
						<Fragment />
					)} */}
					{/* <img className="c-login__logo" src={logoTW} alt="tailorwings" /> */}
				</div>
			</div>
		</div>
	);
}

export default Login;
