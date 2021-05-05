import React from 'react';
import MediumButton from '../../../components/Button/MediumButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

RqmtFooter.propTypes = {
	onNextClick: PropTypes.func,
};

RqmtFooter.defaultProps = {
	onNextClick: null,
};

function RqmtFooter(props) {
	const { onNextClick } = props;

	return (
		<div className="c-rqmt-footer">
			<p className="c-rqmt-footer__text">
				Minimum image size 500 KB. The higher the quality, the better the results.
			</p>
			<div className="c-rqmt-footer__button" onClick={onNextClick}>
				<MediumButton isActive={true} text="next" />
			</div>
			{/* <Link to="/fabric"> */}
			{/* </Link> */}
		</div>
	);
}

export default RqmtFooter;
