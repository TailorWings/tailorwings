import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Popup from '../../components/Popup';
import ThankyouContent from '../../components/Popup/ThankyouContent';
import { ACCOUNT_SIDEBAR_ITEMS } from '../../constants';
import AccountContent from './components/AccountContent';
import AccountSidebar from './components/AccountSidebar';

function AccountPage() {
	/*--------------*/
	const match = useRouteMatch();
	const location = useLocation();
	const [sidebarInfo, setSidebarInfo] = useState(null);
	const [popupShow, setPopupShow] = useState(false);
	/*--------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	useEffect(() => {
		if (ACCOUNT_SIDEBAR_ITEMS) {
			let newSideBarInfo = ACCOUNT_SIDEBAR_ITEMS.map((item) => {
				return { ...item, active: item.path === location.pathname };
			});
			if (newSideBarInfo) {
				setSidebarInfo(newSideBarInfo);
			}
		}
	}, [location]);
	/*--------------*/
	/*********************************
	 *  Description: handle popup status change
	 */
	function handlePopupStatusChange(status) {
		setPopupShow(status);
	}
	/************_END_****************/

	return (
		<div className="l-account-page">
			<div className="wrapper" style={{ display: 'flex' }}>
				<AccountSidebar sidebarInfo={sidebarInfo} />
				<AccountContent match={match} onPopupStatusChange={handlePopupStatusChange} />
			</div>
			<Popup show={popupShow} setPopupShow={setPopupShow}>
				<ThankyouContent setPopupShow={setPopupShow} />
			</Popup>
		</div>
	);
}

export default AccountPage;
