import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../Button/MediumButton';
import { Link } from 'react-router-dom';

ProcessAction.propTypes = {
	backLink: PropTypes.string,
	nextLink: PropTypes.string,
	backText: PropTypes.string,
	nextText: PropTypes.string,
};

ProcessAction.defaultProps = {
	backLink: null,
	nextLink: null,
	backText: 'back',
	nextText: 'next',
};

function ProcessAction(props) {
	const { backLink, nextLink, backText, nextText } = props;

	if (!backLink || !nextLink) return <Fragment />;
	return (
		<div className="c-process-action">
			<Link to={backLink}>
				<MediumButton text={backText} isActive={false} />
			</Link>
			<Link to={nextLink}>
				<MediumButton text={nextText} isActive={true} />
			</Link>
		</div>
	);
}

export default ProcessAction;
