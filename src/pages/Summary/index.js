import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import SummaryContent from './components/SummaryContent';

function SummaryPage() {
	console.log("SummaryPage")
	/*--------------*/
	const location = useLocation();
	const msmtMethod = queryString.parse(location.search);
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const orderDetail = useSelector((state) => state.common.orderDetail);
	/*--------------*/
	const alertUser = (e) => {
		e.preventDefault();
		e.returnValue = '';
	};
	useEffect(() => {
		window.addEventListener('beforeunload', alertUser);
		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, []);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	// if (!currentCustomer) return <Redirect to="/" />;
	if (
		!orderDetail.designStyle ||
		!orderDetail.designFiles ||
		typeof orderDetail.fabric.isOnline !== 'boolean' ||
		(!orderDetail.msmt && !orderDetail.stdSize)
	) return <Redirect to="/requirement" />
		return (
			<div className="l-summary container">
				<SummaryContent msmtMethod={msmtMethod} />
			</div>
		);
}

export default SummaryPage;
