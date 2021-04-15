import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageUploadIcon from '../../assets/icons/image-upload.svg';
import SmallButton2 from '../Button/SmallButton2';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

MultipleFileUpload.propTypes = {
	setFiles: PropTypes.func,
};

MultipleFileUpload.defaultProps = {
	setFiles: null,
};

function MultipleFileUpload(props) {
	const { setFiles } = props;
	/*--------------*/
	const designFiles = useSelector((state) => state.common.orderDetail?.designFiles);
	const [tempFiles, setTempFiles] = useState(designFiles ? [...designFiles] : []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		onDrop: (acceptedFiles) => {
			setTempFiles([
				...tempFiles,
				...acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				),
			]);
		},
	});
	/*--------------*/
	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		tempFiles.forEach((file) => {
			if (!file.preview) {
				URL.revokeObjectURL(file.preview);
			}
		});
		/*--------------*/
		setFiles(tempFiles);
	}, [tempFiles]);
	/*--------------*/
	/*********************************
	 *  Description: handle remove click
	 */
	function onRemoveClick(removeIndex) {
		/*--------------*/
		let newFiles = tempFiles.filter((file, index) => {
			if (index !== removeIndex) {
				return file;
			}
			return null;
		});
		if (newFiles) {
			setTempFiles(newFiles);
			setFiles(newFiles);
		}

		/*--------------*/
	}
	/************_END_****************/
	/*--------------*/
	const previewThumbs = tempFiles.map((file, index) => {
		return (
			<li className="c-multiple-file-upload-preview__item" key={index}>
				<img src={file.preview} alt="designs" />
				<div
					className="c-multiple-file-upload-preview__button"
					onClick={() => onRemoveClick(index)}
				>
					<SmallButton2 text="Remove" />
				</div>
			</li>
		);
	});
	/*--------------*/
	return (
		<div className="c-multiple-file-upload">
			<div className="c-multiple-file-upload__wrapper">
				<div {...getRootProps({ className: 'c-multiple-file-upload__dropzone' })}>
					<input {...getInputProps()} />
					<img src={imageUploadIcon} alt="upload-icon" className="c-multiple-file-upload__icon" />
					<p className="c-multiple-file-upload__guide">
						Drop your image here, or <span>browse</span>
					</p>
					<span className="c-multiple-file-upload__support">Supports: JPG, PNG, JPEG</span>
				</div>
			</div>
			<ul className="c-multiple-file-upload-preview__list">{previewThumbs}</ul>
		</div>
	);
}

export default MultipleFileUpload;
