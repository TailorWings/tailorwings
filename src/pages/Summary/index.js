import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import SummaryContent from './components/SummaryContent';

function SummaryPage() {
	/*--------------*/
	const location = useLocation();
	const msmtMethod = queryString.parse(location.search);
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	/*--------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	if (!currentCustomer) return <Redirect to="/" />;
	return (
		<div className="l-summary container">
			<SummaryContent msmtMethod={msmtMethod} />
		</div>
	);
}

export default SummaryPage;
