import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, Route, useRouteMatch, Switch } from 'react-router-dom';
import MediumButton from '../../../components/Button/MediumButton';
import { fetchAllRealTime } from '../../../services/API/firebaseAPI';
import TailorManage from './TailorManage';
import TailorAdd from './TailorAdd';

function TailorManagement() {
	/*------------------------------*/
	const { url } = useRouteMatch();
	const [tailors, setTailors] = useState(null);
	/*------------------------------*/
	useEffect(() => {
		fetchAllRealTime('tailors', (res) => {
			if (res) {
				setTailors(res);
			}
		});
	}, []);
	/*------------------------------*/
	return (
		<div className="c-admin-patterns">
			<div className="c-admin-patterns__options">
				<NavLink to={`${url}/add-tailor`} class="-upload" activeClassName="selected">
					<MediumButton
						text="Add Tailor"
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
					<Route path={`${url}/add-tailor`} component={() => <TailorAdd />} />
					<Route path={`${url}/manage`} component={() => <TailorManage tailors={tailors} />} />
					<Redirect from={`${url}`} to={`${url}/manage`} />
				</Switch>
			</div>
		</div>
	);
}

export default TailorManagement;
