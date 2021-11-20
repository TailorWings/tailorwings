import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import CustomerManagement from './CustomerManagement';
import OrderManagement from './OrderManagement';
import PatternManagement from './PatternManagement';
import TailorManagement from './TailorManagement';

AdminLayout.propTypes = {
	orders: PropTypes.object,
};

AdminLayout.defaultProps = {
	orders: null,
};

const TABS = ['orders', 'customers', 'patterns', 'tailors'];

function AdminLayout(props) {
	const { orders } = props;
	const { url } = useRouteMatch();
	/*--------------*/
	// const [tabs, setTabs] = useState(
	// 	TABS.map((tab, index) => {
	// 		return { title: tab, active: index === 0, left: index * 50 };
	// 	})
	// );
	/*********************************
	 *  Description: handle content render
	 */
	// function handleContentRender() {
	// 	let activeTabs = tabs.find((tab) => tab.active) || null;
	// 	let renderedContent = <Fragment />;
	// 	if (activeTabs) {
	// 		switch (activeTabs.title) {
	// 			case 'orders':
	// 				renderedContent = <OrderManagement orders={orders} />;
	// 				break;

	// 			case 'customers':
	// 				renderedContent = <CustomerManagement />;
	// 				break;

	// 			default:
	// 				break;
	// 		}
	// 	}

	// 	return renderedContent;
	// }
	/************_END_****************/
	return (
		<div className="c-admin-layout">
			<div className="c-admin-layout__tabs">
				<div
					className="c-admin-layout__title"
					// style={{
					// 	'--beforeLeft': tabs.find((tab) => tab.active).left + '%',
					// }}
				>
					{TABS.map((tab, index) => {
						return (
							// <div
							// 	key={index}
							// 	className={tab.active ? '--active' : ''}
							// 	onClick={() =>
							// 		setTabs(
							// 			tabs.map((tab, thisIndex) => {
							// 				return { ...tab, active: index === thisIndex };
							// 			})
							// 		)
							// 	}
							// >
							// 	{tab.title}
							// </div>
							<NavLink
								key={index}
								to={`${url}/${tab.split(' ').join('-')}`}
								// className={tab.active ? '--active' : ''}
								// onClick={() =>
								// 	setTabs(
								// 		tabs.map((tab, thisIndex) => {
								// 			return { ...tab, active: index === thisIndex };
								// 		})
								// 	)
								// }
							>
								{tab}
							</NavLink>
						);
					})}
				</div>
				{/* <div className="c-admin-layout__content">{handleContentRender()}</div> */}
				<div className="c-admin-layout__content">
					<Switch>
						<Route path={`${url}/orders`} component={() => <OrderManagement orders={orders} />} />
						<Route path={`${url}/customers`} component={() => <CustomerManagement />} />
						<Route path={`${url}/patterns`} component={() => <PatternManagement />} />
						<Route path={`${url}/tailors`} component={() => <TailorManagement />} />
						<Redirect from={`${url}`} to={`${url}/orders`} />
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
