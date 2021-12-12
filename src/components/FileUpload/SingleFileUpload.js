import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import imageUploadIcon from '../../assets/icons/image-upload.svg';
import { useDropzone } from 'react-dropzone';
import SmallButton2 from '../Button/SmallButton2';
import { useTranslation, withTranslation, Trans } from 'react-i18next';


SingleFileUpload.propTypes = {
	setFile: PropTypes.func,
};

SingleFileUpload.defaultProps = {
	setFile: null,
};

function SingleFileUpload(props) {
	const { setFile } = props;

	const { t } = useTranslation();

	/*--------------*/
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			var tempFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			);
			setFiles(
				tempFiles
			);
			setFile && setFile(tempFiles[0]);
		},
	});
	/*--------------*/
	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach((file) => {
			if (!file.preview) {
				URL.revokeObjectURL(file.preview);
			}
		});
	}, [files]);
	/*--------------*/
	/*********************************
	 *  Description: handle remove click
	 */
	function onRemoveClick(removeIndex) {
		/*--------------*/
		let newFiles = files.filter((file, index) => {
			if (index !== removeIndex) {
				return file;
			}
		});
		if (newFiles) {
			setFiles(newFiles);
			setFile(newFiles);
		}
		/*--------------*/
	}
	/************_END_****************/
	/*--------------*/
	return (
		<div className="c-single-file-upload">
			<div
				className={`c-single-file-upload__wrapper ${
					files[0] ? 'c-single-file-upload__wrapper--uploaded' : ''
				}`}
			>
				{files[0] ? (
					<div className="c-single-file-upload__preview">
						<img
							src={files[0]?.preview}
							alt="personal-upload"
							className="c-single-file-upload__image"
						/>
						<div className="c-single-file-upload__button" onClick={() => onRemoveClick(0)}>
							<SmallButton2 text="Remove" />
						</div>
					</div>
				) : (
					<div {...getRootProps({ className: 'c-single-file-upload__dropzone' })}>
						<input {...getInputProps()} />
						<img src={imageUploadIcon} alt="upload-icon" className="c-single-file-upload__icon" />
						<p className="c-single-file-upload__guide">
							{t('requirement.uploadImageDescription')} <span>{t('requirement.browse')}</span>
						</p>
						<span className="c-single-file-upload__support">{t('requirement.supports')}: JPG, PNG, JPEG</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default SingleFileUpload;
