import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../components/Menu';

StandardSizeMethod.propTypes = {
	standardSizes: PropTypes.array,
	onSizeClick: PropTypes.func,
};

StandardSizeMethod.defaultProps = {
	standardSizes: null,
	onSizeClick: null,
};

function StandardSizeMethod(props) {
	const { standardSizes, onSizeClick } = props;

	if (!standardSizes || !onSizeClick) return <Fragment />;
	return (
		<div className="c-msmt-standard-size">
			<p className="c-msmt-standard-size__title">List of Standard Sizes</p>
			<div className="c-msmt-standard-size__selection">
				<Menu list={standardSizes} onItemClick={onSizeClick} />
			</div>
			<div className="c-msmt-standard-size__image"></div>
		</div>
	);
}

export default StandardSizeMethod;
