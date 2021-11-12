import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../../../components/Button/MediumButton';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

AccountSidebar.propTypes = {
	sidebarInfo: PropTypes.array,
};

AccountSidebar.defaultProps = {
	sidebarInfo: null,
};

function AccountSidebar(props) {
	const { sidebarInfo } = props;

	if (!sidebarInfo) return <Fragment />;
	return (
		<div className="c-account-sidebar">
			<div className="c-account-sidebar-list">
				{sidebarInfo.map((info, index) => {
					return (
						<Link key={index} to={info.path}>
							<div
								// className={classNames('c-account-sidebar-item', {
								// 	'c-account-sidebar-item--active': info.active,
								// })}
								className="c-account-sidebar-item c-account-sidebar-item--active"
							>
								{info.active ? (
									<img
										src={info.activeIcon}
										alt="profile-icon"
										className="c-account-sidebar-item__icon"
									/>
								) : (
									<img
										src={info.passiveIcon}
										alt="profile-icon"
										className="c-account-sidebar-item__icon"
									/>
								)}
								<span className="c-account-sidebar-item__text">{info.text}</span>
							</div>
						</Link>
					);
				})}
			</div>
			{/* <div className="c-account-sidebar__sign-out">
				<MediumButton text="SIGN OUT" />
			</div> */}
		</div>
	);
}

export default AccountSidebar;
