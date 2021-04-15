import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import imageUploadIcon from '../../assets/icons/image-upload.svg';

RequirementImageUpload.propTypes = {
	getRootProps: PropTypes.func,
	getInputProps: PropTypes.func,
};

function RequirementImageUpload(props) {
	const { getInputProps, getRootProps } = props;

	if (!getInputProps || !getRootProps) return <Fragment />;
	return (
		<div {...getRootProps({ className: 'c-rq-image-upload container' })}>
			<input {...getInputProps()} />
			<div className="c-rq-image-upload-input">
				<img src={imageUploadIcon} alt="icon" className="c-rq-image-upload-input__icon" />
				<span className="c-rq-image-upload-input__guide">
					Drop your image here, or <span>browse</span>
				</span>
				<span className="c-rq-image-upload-input__support">Supports: JPG, PNG, JPEG</span>
			</div>
		</div>
	);
}

export default RequirementImageUpload;
