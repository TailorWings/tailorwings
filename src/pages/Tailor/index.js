import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { setFindingOrders, setPickedOrders } from '../../app/ReduxSlices/tailorSlice';
import ListLoader from '../../components/ComponentLoader';
import Popup from '../../components/Popup';
import { database } from '../../firebase';
import PrivateRoute from '../../services/PrivateRoute';
import TailorLogin from './components/TailorLogin';
import TailorMenu from './components/TailorMenu';
import TailorOrderDetail from './components/TailorOrderDetail';
import TailorOrderMgmt from './components/TailorOrderMgmt';

function TailorDashBoard() {
	/*------------------------------*/
	const { url } = useRouteMatch();
	const { tailor, findingOrders, pickedOrders } = useSelector((state) => state.tailor);
	const dispatch = useDispatch();
	/*------------------------------*/
	const [popupShow, setPopupShow] = useState(true);
	/*------------------------------*/
	useEffect(() => {
		let nav = document.querySelector('.c-navbar');
		nav.style.display = 'none';
	}, []);
	useEffect(() => {
		/*------------------------------*/
		database
			.collection('tailorOrders')
			.where('status', '==', 'finding')
			.onSnapshot((querySnapshot) => {
				let result = [];
				querySnapshot.forEach((doc) => {
					let data = doc.data();
					result.push(data);
				});
				if (result?.length > 0) {
					dispatch(setFindingOrders(result));
				}
			});
		/*------------------------------*/
	}, []);
	useEffect(() => {
		if (tailor?.id) {
			database
				.collection('tailorOrders')
				.where('pickedTailor', '==', tailor.id)
				.onSnapshot((querySnapshot) => {
					let result = [];
					querySnapshot.forEach((doc) => {
						let data = doc.data();
						result.push(data);
					});
					if (result?.length > 0) {
						dispatch(setPickedOrders(result));
					}
				});
		}
	}, [tailor]);
	/*------------------------------*/
	useEffect(() => {
		if (tailor) {
			setPopupShow(false);
		} else {
			setPopupShow(true);
		}
	}, [tailor]);
	/*------------------------------*/
	if (!findingOrders) return <ListLoader />;
	return (
		<div className="l-tailor-dabo">
			<Popup show={popupShow} setPopupShow={setPopupShow} isBackdropClick={false}>
				<TailorLogin />
			</Popup>
			<Switch>
				<PrivateRoute checkedElem={tailor} redirectTo={`${url}`} path={`${url}/detail/:orderID`} component={TailorOrderDetail} />
				<PrivateRoute checkedElem={tailor} redirectTo={`${url}`} path={`${url}/manage`} component={TailorOrderMgmt} />
				<PrivateRoute checkedElem={tailor} redirectTo={`${url}`} path={`${url}/info`} component={TailorOrderMgmt} />
				<Route path={`${url}`} component={TailorMenu} />
			</Switch>
		</div>
	);
}

export default TailorDashBoard;
