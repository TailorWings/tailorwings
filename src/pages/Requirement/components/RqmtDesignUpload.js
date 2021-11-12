import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MultipleFileUpload from '../../../components/FileUpload/MultipleFileUpload';
import { RQPAGE_SUBTITLE } from '../../../constants';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

RqmtDesignUpload.propTypes = {
	setDesignFiles: PropTypes.func,
};

RqmtDesignUpload.defaultProps = {
	setDesignFiles: null,
};

function RqmtDesignUpload(props) {
	const { setDesignFiles } = props;
	const { t } = useTranslation();

	if (!setDesignFiles) return <Fragment />;
	return (
		<div className="c-rqmt-design-upload">
			<p>{t('requirement.description')}</p>
			<MultipleFileUpload setFiles={setDesignFiles} />
		</div>
	);
}

export default RqmtDesignUpload;
