import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { controlLogin } from '../../app/ReduxSlices/commonSlice';
import Login from '../../components/Login';
import HomeBanner from './components/Banner';
import HomeHowItWork from './components/HowItWork';
import { orderBy } from 'lodash';
import { fetchAllRealTime } from '../../services/API/firebaseAPI';
import { updateFabricTypes, updateStylesOfClothe } from '../../app/ReduxSlices/commonSlice';
import { GetStarted } from './components/GetStarted';
import { CustomerFeedbackComponent } from './components/CustomerFeedback';

function HomePage() {
	/*--------------*/
	const history = useHistory();
	const currentCustomer = useSelector((state) => ((state as any).common as any).currentCustomer);
	const dispatch = useDispatch();
	/*--------------*/

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetchAllRealTime('stylesOfClothe', (results: any) => {
				var newList = orderBy(results, ['order'], ['asc']);
				const action_updateStylesOfClothe = updateStylesOfClothe(newList);
				dispatch(action_updateStylesOfClothe);
			});
			fetchAllRealTime('fabricTypes', (results: any) => {

				const action_updateFabricTypes = updateFabricTypes(results);
				dispatch(action_updateFabricTypes);
			});
		}
		return () => {
			isMounted = false;
		};
	}, []);

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
			<GetStarted/>
			<HomeHowItWork handleStart={handleStart} />
			<CustomerFeedbackComponent/>
			{/* <Login /> */}
		</div>
	);
}

export default HomePage;
