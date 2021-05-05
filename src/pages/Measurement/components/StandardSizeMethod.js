import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Picker from '../../../components/Picker';
import ProcessAction from '../../../components/ProcessAction';
import standardSizeImg from '../../../assets/images/standard-size.jpg';

StandardSizeMethod.propTypes = {
	standardSizes: PropTypes.array,
	onSizeClick: PropTypes.func,
	onNextClick: PropTypes.func,
};

StandardSizeMethod.defaultProps = {
	standardSizes: null,
	onSizeClick: null,
	onNextClick: null,
};

function StandardSizeMethod(props) {
	const { standardSizes, onSizeClick, onNextClick } = props;

	if (!standardSizes || !onSizeClick) return <Fragment />;
	return (
		<div className="c-msmt-standard-size">
			<p className="c-msmt-standard-size__title">List of Standard Sizes</p>
			<div className="c-msmt-standard-size__selection">
				<Picker list={standardSizes} onItemClick={onSizeClick} />
			</div>
			<div className="c-msmt-standard-size__image">
				<img src={standardSizeImg} alt="standard-size"/>
			</div>
			<ProcessAction
				backLink="/fabric"
				formID="msmt-form"
				onNextClick={onNextClick && onNextClick}
			/>
		</div>
	);
}

export default StandardSizeMethod;
