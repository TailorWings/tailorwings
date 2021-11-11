import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import imageUploadIcon from '../../assets/icons/image-upload.svg';
import { useDropzone } from 'react-dropzone';
import SmallButton2 from '../Button/SmallButton2';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

SingleFileUpload.propTypes = {};

function SingleFileUpload(props) {

	const { t } = useTranslation();

	/*--------------*/
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});
	/*--------------*/
	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach((file) => URL.revokeObjectURL(file.preview));
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
		if (newFiles) setFiles(newFiles);
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
