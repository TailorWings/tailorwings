import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Picker from '../../../components/Picker';
import Title from '../../../components/Title';
import { RQPAGE_SUBTITLE, RQPAGE_TITLE } from '../../../constants';

RqmtDesignStyle.propTypes = {
	styles: PropTypes.array,
	onStyleClick: PropTypes.func,
};

RqmtDesignStyle.defaultProps = {
	styles: null,
	onStyleClick: null,
};

function RqmtDesignStyle(props) {
	const { styles, onStyleClick } = props;

	if (!styles || !onStyleClick) return <Fragment />;
	return (
		<div className="c-rqmt-design-style">
			<div className="c-rqmt-design-style__title">
				<Title title={RQPAGE_TITLE} />
			</div>
			<div className="c-rqmt-design-style__picker">
				<Picker list={styles} onItemClick={onStyleClick} />
			</div>
		</div>
	);
}

export default RqmtDesignStyle;
