import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import TailorFindingOrders from './TailorFindingOrders';
import TailorHeader from './TailorHeader';
import TailorMgmtMenu from './TailorMgmtMenu';
import TailorTailoringOrders from './TailorTailoringOrders';

function TailorOrderMgmt() {
	/*------------------------------*/
	const { url } = useRouteMatch();
	const { pathname } = useLocation();
	const [headerTitle, setHeaderTitle] = useState('');
	/*------------------------------*/
	useEffect(() => {
		switch (pathname) {
			case `${url}/finding`:
				setHeaderTitle('Đơn đợi báo giá');
				break;

			default:
				setHeaderTitle('Xủ lý đơn hàng');
				break;
		}
	}, [pathname]);
	/*------------------------------*/
	return (
		<div className="tailor-order-mgmt">
			<TailorHeader title={headerTitle} />
			<div className="tailor-order-mgmt__wrapper" style={{ padding: '24px' }}>
				<Switch>
					<Route path={`${url}/finding`} component={TailorFindingOrders} />
					<Route path={`${url}/tailoring`} component={TailorTailoringOrders} />
					<Route path={`${url}`} component={TailorMgmtMenu} />
				</Switch>
			</div>
		</div>
	);
}

export default TailorOrderMgmt;
