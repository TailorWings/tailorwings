import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { MSMT_METHODS } from '../../constants';
import MeasurementContent from './components/MeasurementContent';
import MeasurementOptions from './components/MeasurementOptions';
import ProcessAction from '../../components/ProcessAction';

function MeasurementPage() {
	/*--------------*/
	const match = useRouteMatch();
	const location = useLocation();
	const subpage = location.pathname.split('/')[2];
	const [methods, setMethods] = useState(null);
	useEffect(() => {
		/*--------------*/
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		/*--------------*/
		let modifiedMethods = MSMT_METHODS.map((method) => {
			const link = method.link.toLowerCase().split('/')[1];
			return { ...method, active: link === subpage };
		});
		if (modifiedMethods) {
			setMethods(modifiedMethods);
		}
		/*--------------*/
	}, [subpage]);
	/*--------------*/
	/*********************************
	 *  Description: Handle method click and change status
	 */
	function handleMethodChange(changeIndex) {
		let newMethod = methods.map((method, index) => {
			return { ...method, active: index === changeIndex };
		});
		if (newMethod) {
			setMethods(newMethod);
		}
	}
	/************_END_****************/
	return (
		<div className="l-measurement container">
			<MeasurementOptions match={match} methods={methods} onMethodClick={handleMethodChange} />
			<MeasurementContent match={match} />
			<ProcessAction backLink="/fabric" nextLink={`/summary?method=${subpage}`} />
		</div>
	);
}

export default MeasurementPage;
