import React from 'react';
import PropTypes from 'prop-types';
import imageUploadIcon from '../../../assets/icons/image-upload.svg';

RequirementImageUpload.propTypes = {};

function RequirementImageUpload(props) {
	return (
		<div className="c-rq-image-upload container">
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
