import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';
import MediumButton from '../../../components/Button/MediumButton';
import { fetchAllRealTime } from '../../../services/API/firebaseAPI';
import PatternManage from './PatternManage';
import PatternUpload from './PatternUpload';

function PatternManagement() {
	/*------------------------------*/
	const { url } = useRouteMatch();
	const [patterns, setPatterns] = useState(null);
	/*------------------------------*/
	useEffect(() => {
		fetchAllRealTime('patterns', (res) => {
			if (res) {
				setPatterns(res);
			}
		});
	}, []);
	/*------------------------------*/
	return (
		<div className="c-admin-patterns">
			<div className="c-admin-patterns__options">
				<NavLink to={`${url}/upload`} class="-upload" activeClassName="selected">
					<MediumButton
						text="Upload"
						isActive={
							document
								.querySelector('.c-admin-patterns__options .-upload')
								?.getAttribute('aria-current') === 'page'
						}
					/>
				</NavLink>
				<NavLink to={`${url}/manage`} class="-manage" activeClassName="selected">
					<MediumButton
						text="Manage"
						isActive={
							document
								.querySelector('.c-admin-patterns__options .-manage')
								?.getAttribute('aria-current') === 'page'
						}
					/>
				</NavLink>
			</div>
			<div className="c-admin-patterns__content">
				<Switch>
					<Route path={`${url}/upload`} component={() => <PatternUpload />} />
					<Route path={`${url}/manage`} component={() => <PatternManage patterns={patterns}/>} />
					<Redirect from={`${url}`} to={`${url}/manage`} />
				</Switch>
			</div>
		</div>
	);
}

export default PatternManagement;
