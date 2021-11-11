import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallButton1 from '../../../components/Button/SmallButton1';
import whiteStarIcon from '../../../assets/icons/white-star.svg';
import grayStarIcon from '../../../assets/icons/gray-star.svg';
import classNames from 'classnames';

MeasurementMethod.propTypes = {
	name: PropTypes.string,
	desc: PropTypes.string,
	buttonText: PropTypes.string,
	isActive: PropTypes.bool,
};

MeasurementMethod.defaultProps = {
	name: null,
	desc: null,
	buttonText: null,
	isActive: false,
};

function MeasurementMethod(props) {
	const { name, desc, buttonText, isActive } = props;

	if (!name || !desc || !buttonText) return <Fragment />;
	return (
		<div className={classNames('c-msmt-method', { 'c-msmt-method--active': isActive })}>
			{/* <div className="c-msmt-method__icon">
				<img src={isActive ? whiteStarIcon : grayStarIcon} alt="icon" />
			</div> */}
			<p className="c-msmt-method__name">{name}</p>
			<p className="c-msmt-method__desc">{desc}</p>
			<div className="c-msmt-method__button">
				<SmallButton1 text={buttonText} isActive={isActive} />
			</div>
		</div>
	);
}

export default MeasurementMethod;
