import {
	Dialog,
	DialogActions,
	DialogTitle,
	makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton2 from '../../../components/Button/SmallButton2';
import ListLoader from '../../../components/ComponentLoader';
import firebase from 'firebase/app';
import Picker from '../../../components/Picker';
import { map } from 'lodash';
import { useDropzone } from 'react-dropzone';
import imageUploadIcon from '../../../assets/icons/image-upload.svg';
import MaterialAlert from '../../../components/MaterialAlert';
import { useTranslation } from 'react-i18next';
import { fileUpload, setDocument } from '../../../services/API/firebaseAPI';
import { updateFabricTypes } from '../../../app/ReduxSlices/commonSlice';
import { fetchAllRealTime } from '../../../services/API/firebaseAPI';

function OftenUsedManage({ patterns }) {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);
	const dispatch = useDispatch();
	const fabricTypes = useSelector((state) => state.common.fabricTypes);
	const [fabricSelectedIndex, setFabricSelectedIndex] = useState(0);
	const [imageList, setImageList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const loadFabricTypes = (fabricTypes) => {
		var newFabricTypes =
			fabricTypes && fabricTypes.length
				? fabricTypes.map((type) => {
						return { ...type, active: false };
				})
				: [];

		const fabricTypesList = map(newFabricTypes, 'name');

		setFabricTypes3(
			fabricTypesList.map((style) => {
				return {
					name: style,
					active:
						fabricSelectedIndex == null
							? style == newFabricTypes[0].name
							: style == fabricTypes[fabricSelectedIndex].name,
				};
			})
		);

		if (fabricSelectedIndex >= 0) {
			const newImageList =
				fabricTypes &&
				fabricTypes.length > 0 &&
				fabricTypes[fabricSelectedIndex].info &&
				fabricTypes[fabricSelectedIndex].info.length > 0 &&
				fabricTypes[fabricSelectedIndex].info[0].image
					? fabricTypes[fabricSelectedIndex].info[0].image.list
					: [];
			setImageList(newImageList);
		}
	};

	const [fabricTypes3, setFabricTypes3] = useState([]);

	useEffect(() => {
		loadFabricTypes(fabricTypes);
	}, [fabricTypes]);

	const onStyleClick = function (activeIndex) {
		if (fabricTypes3[activeIndex].active) {
			return;
		}
		let newStatus = fabricTypes3.map((style, index) => {
			return { ...style, active: activeIndex === index };
		});

		if (newStatus) {
			setFabricSelectedIndex(activeIndex);
			setFabricTypes3(newStatus);
			const newImageList =
				fabricTypes &&
				fabricTypes.length > 0 &&
				fabricTypes[activeIndex].info &&
				fabricTypes[activeIndex].info.length > 0 &&
				fabricTypes[activeIndex].info[0].image
					? fabricTypes[activeIndex].info[0].image.list
					: [];
			setImageList(newImageList);
		}
	};

	const [isImageFileClear, setIsImageFileClear] = useState(false);

	const handleClickUpload = (clickedIndex) => {
		var fabricSelected = fabricTypes[fabricSelectedIndex];
		if (fabricSelected && fabricSelected.id) {
			var path = 'image/fabrics/suitableConstume/' + fabricSelected.id;
			let file = tempFiles[clickedIndex];
			let fileUploadPromise = fileUpload(file, `${path}/${file.name}`);

			if (fileUploadPromise != null) {
				setIsLoading(true);
				fileUploadPromise
					.then(() => {
						console.log('handleClickUpload success ');
						handleDataFabricTypes(fabricSelected);
						handleClickCancel(clickedIndex);
					})
					.catch(() => {
						console.log('handleClickUpload Fail ');
						setIsLoading(false);
					});
			}
		}
	};

	const handleDataFabricTypes = async (data) => {
		var imageRef = 'image/fabrics/suitableConstume/' + data.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();

		let itemRefArray = res?.items;
		if (itemRefArray.length > 0) {
			let urls = await Promise.all(itemRefArray?.map((itemRef) => itemRef.getDownloadURL()));
			if (urls?.length > 0) {
				let updateFabricType = {
					...data,
					info: [
						{
							...data?.info[0],
							image: {
								normal: urls.sort()[0],
								list: [...urls.sort()],
							},
						},
						...data?.info.slice(1),
					],
				};

				setDocument('fabricTypes', updateFabricType, data.id)
					.then(() => {
						console.log('handleDataFabricTypes success');
						setIsLoading(false);

						fetchAllRealTime('fabricTypes', (results) => {
							const action_updateFabricTypes = updateFabricTypes(results);
							dispatch(action_updateFabricTypes);
							// loadFabricTypes(results);
						});
					})
					.catch(() => {
						console.log('handleDataFabricTypes fail');
						setIsLoading(false);
					});
			}
		} else {
			setIsLoading(false);
			// alert(`There is no image for ${data.id}`);
		}
	};

	const handleClickCancel = (clickedIndex) => {
		setTempFiles(tempFiles.filter((item) => item.name !== tempFiles[clickedIndex].name));
	};
	const [isClear, setIsClear] = useState(false);
	const [files, setFiles] = useState(false);

	const { t } = useTranslation();

	const [tempFiles, setTempFiles] = useState([]);
	const [alertOpen, setAlertOpen] = useState(false);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg, image/gif',
		onDrop: (acceptedFiles) => {
			let totalFile = [
				...tempFiles,
				...acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				),
			];
			if (totalFile.length > 10) {
				setAlertOpen(true);
			}
			setTempFiles(totalFile.splice(0, 10));
		},
	});
	useEffect(() => {
		if (isClear) {
			setTempFiles([]);
		}
	}, [isClear]);
	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		tempFiles.forEach((file) => {
			if (!file.preview) {
				URL.revokeObjectURL(file.preview);
			}
		});
		setFiles && setFiles(tempFiles);
	}, [tempFiles]);

	const handleClickOpen = (clickedIndex) => {
		setOpen(true);
		setCurrentIndex(clickedIndex);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAgree = async () => {
		setOpen(false);
		setIsLoading(true);
		var fabricSelected = fabricTypes[fabricSelectedIndex];
		var imageRef = 'image/fabrics/suitableConstume/' + fabricSelected.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();
		let itemRefArray = res?.items;
		if (itemRefArray.length > 0 && itemRefArray[currentIndex]) {
			var indexOfImage = currentIndex;
			itemRefArray[currentIndex]
				.delete()
				.then(() => {
					console.log('Delete image success');
					handleDataFabricTypesDeleteImage(fabricSelected);
				})
				.catch((error) => {
					setIsLoading(false);
					console.log('Delete image fail, error = ', error);
				});
		}
	};

	const handleDataFabricTypesDeleteImage = async (data) => {
		var imageRef = 'image/fabrics/suitableConstume/' + data.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();

		let itemRefArray = res?.items;
		if (itemRefArray.length > 0) {
			let urls = await Promise.all(itemRefArray?.map((itemRef) => itemRef.getDownloadURL()));
			if (urls?.length > 0) {
				let updateFabricType = {
					...data,
					info: [
						{
							...data?.info[0],
							image: {
								normal: urls.sort()[0],
								list: [...urls.sort()],
							},
						},
						...data?.info.slice(1),
					],
				};

				setDocument('fabricTypes', updateFabricType, data.id)
					.then(() => {
						console.log('handleDataFabricTypesDeleteImage success');
						setIsLoading(false);

						fetchAllRealTime('fabricTypes', (results) => {
							const action_updateFabricTypes = updateFabricTypes(results);
							dispatch(action_updateFabricTypes);
							// loadFabricTypes(results);
						});
					})
					.catch(() => {
						console.log('handleDataFabricTypesDeleteImage fail');
						setIsLoading(false);
					});
			}
		} else {
			setIsLoading(false);
			// alert(`There is no image for ${data.id}`);
		}
	};

	const useStyles = makeStyles({
		root: {
			width: '80%',
			margin: '0 auto',
		},
		container: {
			maxHeight: 400,
		},
	});
	const classes = useStyles();

	if (isLoading) return <ListLoader />;
	return (
		<div className="admin-often-used-mgmt">
			<h2>Often Used Management</h2>
			<h3>Select fabric type to view/edit list images often used</h3>
			<div className="admin-often-used-mgmt__picker">
				<Picker list={fabricTypes3} onItemClick={onStyleClick} />
			</div>
			<h3>List images</h3>
			<div className="admin-often-used-mgmt__image-list">
				{imageList.map((image, index) => (
					<div className="admin-often-used-mgmt__image-list__image-content" key={index}>
						<img src={image} alt="image" />
						<div className="-delete-btn" onClick={() => handleClickOpen(index)}>
							<MediumButton text="Delete" />
						</div>
					</div>
				))}
				{tempFiles &&
					tempFiles.length > 0 &&
					tempFiles.map((image, index) => (
						<div className="admin-often-used-mgmt__image-list__image-content" key={index}>
							<img src={image.preview} alt="image" />
							<div className="-group-btn">
								<div className="-upload-btn" onClick={() => handleClickUpload(index)}>
									<MediumButton text="Upload" />
								</div>
								<div className="-cancel-btn" onClick={() => handleClickCancel(index)}>
									<MediumButton text="Delete" />
								</div>
							</div>
						</div>
					))}
				<div className="admin-often-used-mgmt__add-more-images">
					<div className="c-multiple-file-upload c-multiple-file-upload__small">
						<div className="c-multiple-file-upload__wrapper  c-multiple-file-upload__wrapper__small">
							<div {...getRootProps({ className: 'c-multiple-file-upload__dropzone' })}>
								<input {...getInputProps()} />
								<img
									src={imageUploadIcon}
									alt="upload-icon"
									className="c-multiple-file-upload__icon"
								/>
								<p className="c-multiple-file-upload__guide">
									{t('requirement.uploadImageDescription')} <span>{t('requirement.browse')}</span>
								</p>
								<span className="c-multiple-file-upload__support">
									{t('requirement.supports')}: JPG, PNG, JPEG
								</span>
							</div>
						</div>
						<MaterialAlert
							open={alertOpen}
							setOpen={setAlertOpen}
							content="Please upload maximum 10 design images!"
							serverity="error"
						/>
					</div>
				</div>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Do you really want delete this image?'}</DialogTitle>
				<DialogActions>
					<div onClick={handleClose}>
						<SmallButton2 text="Disagree" />
					</div>
					<div onClick={handleAgree}>
						<SmallButton2 text="Agree" isActive />
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default OftenUsedManage;
