import React from 'react';
import PropTypes from 'prop-types';

AccountDropdown.propTypes = {
	avatar: PropTypes.string,
};

AccountDropdown.defaultProps = {
	avatar: null,
};

function AccountDropdown(props) {
	const { avatar } = props;
	return <div className="c-account-dropdown">{avatar && <img src={avatar} alt="avatar" />}</div>;
}

export default AccountDropdown;
