import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { controlLogin } from '../../app/ReduxSlices/commonSlice';
import Login from '../../components/Login';
import HomeBanner from './components/Banner';
import HomeHowItWork from './components/HowItWork';

function HomePage() {
	/*--------------*/
	const history = useHistory();
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const dispatch = useDispatch();
	/*--------------*/
	/*********************************
	 *  Description: hanle start
	 */
	function handleStart() {
		history.push('/requirement');
		// if (currentCustomer) {
		// } else {
		// 	const action_controlLogin = controlLogin(true);
		// 	dispatch(action_controlLogin);
		// }
	}
	/************_END_****************/

	return (
		<div className="l-home">
			<HomeBanner />
			<HomeHowItWork handleStart={handleStart} />
			{/* <Login /> */}
		</div>
	);
}

export default HomePage;
