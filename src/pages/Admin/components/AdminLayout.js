import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';

AdminLayout.propTypes = {
	orders: PropTypes.object,
};

AdminLayout.defaultProps = {
	orders: null,
};

const TABS = ['orders', 'customers'];

function AdminLayout(props) {
	const { orders } = props;
	/*--------------*/
	const [tabs, setTabs] = useState(
		TABS.map((tab, index) => {
			return { title: tab, active: index === 0, left: index * 50 };
		})
	);
	/*********************************
	 *  Description: handle content render
	 */
	function handleContentRender() {
		let activeTabs = tabs.find((tab) => tab.active) || null;
		let renderedContent = <Fragment />;
		if (activeTabs) {
			switch (activeTabs.title) {
				case 'orders':
					renderedContent = <OrderManagement orders={orders} />;
					break;

				case 'customers':
					renderedContent = <CustomerManagement />;
					break;

				default:
					break;
			}
		}

		return renderedContent;
	}
	/************_END_****************/
	return (
		<div className="c-admin-layout">
			<div className="c-admin-layout__tabs">
				<div
					className="c-admin-layout__title"
					style={{
						'--beforeLeft': tabs.find((tab) => tab.active).left + '%',
					}}
				>
					{tabs.map((tab, index) => {
						return (
							<div
								key={index}
								className={tab.active ? '--active' : ''}
								onClick={() =>
									setTabs(
										tabs.map((tab, thisIndex) => {
											return { ...tab, active: index === thisIndex };
										})
									)
								}
							>
								{tab.title}
							</div>
						);
					})}
				</div>
				<div className="c-admin-layout__content">{handleContentRender()}</div>
			</div>
		</div>
	);
}

export default AdminLayout;
