import React from 'react';
import SummaryContent from './components/SummaryContent';
import ProcessAction from '../../components/ProcessAction';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

function SummaryPage() {
	/*--------------*/
	const location = useLocation();
	const msmtMethod = queryString.parse(location.search);
	/*--------------*/
	return (
		<div className="l-summary container">
			<SummaryContent msmtMethod={msmtMethod} />
			<ProcessAction
				backLink={`/measurement/${msmtMethod.method}`}
				nextLink="/account"
				nextText="Find tailor"
			/>
		</div>
	);
}

export default SummaryPage;
