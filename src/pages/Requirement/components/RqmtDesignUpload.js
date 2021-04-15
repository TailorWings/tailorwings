import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MultipleFileUpload from '../../../components/FileUpload/MultipleFileUpload';

RqmtDesignUpload.propTypes = {
	setDesignFiles: PropTypes.func,
};

RqmtDesignUpload.defaultProps = {
	setDesignFiles: null,
};

function RqmtDesignUpload(props) {
	const { setDesignFiles } = props;

	if (!setDesignFiles) return <Fragment />;
	return (
		<div className="c-rqmt-design-upload">
			<MultipleFileUpload setFiles={setDesignFiles} />
		</div>
	);
}

export default RqmtDesignUpload;
