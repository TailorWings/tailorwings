import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MEASUREMENTS_STYLES } from '../../../constants';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Dialog,
	DialogActions,
	DialogTitle,
} from '@material-ui/core';
import defaultUser from '../../../assets/icons/user.svg';
import classNames from 'classnames';
import SingleFileUpload from '../../../components/FileUpload/SingleFileUpload';
import MultipleFileUpload from '../../../components/FileUpload/MultipleFileUpload';
import TextInput from '../../../components/Input/TextInput';
import { setTailor } from '../../../app/ReduxSlices/tailorSlice';
import { fetchAllRealTime } from '../../../services/API/firebaseAPI';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app';
import SmallButton2 from '../../../components/Button/SmallButton2';
import { find } from 'lodash';
import { useTranslation } from 'react-i18next';
import imageUploadIcon from '../../../assets/icons/image-upload.svg';
import MaterialAlert from '../../../components/MaterialAlert';
import { useDropzone } from 'react-dropzone';
import ListLoader from '../../../components/ComponentLoader';
import { fileUpload, setDocument, addDocument } from '../../../services/API/firebaseAPI';
import MediumButton from '../../../components/Button/MediumButton';

const TABLE_HEAD = ['avatar', 'name', 'email','stars', 'products'];

function TailorManage({tailors}) {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [clickedTailor, setClickedTailor] = useState({});
	
	const { t } = useTranslation();
	const [form, setForm] = useState({
		name: '',
		nickName: '',
		email: '',
		password: '',
		stars: '',
		exp: '',
		description: '',
	});
	const [formError, setFormError] = useState({});
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const stylesOfClothe = useSelector((state) => state.common.stylesOfClothe);
	const [checkedState, setCheckedState] = useState(new Array(stylesOfClothe.length).fill(false));
	const [imageAvatar, setImageAvatar] = useState(null);
	// const [imageList, setImageList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);
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

	const onFormChange = (e) => {
		let value = e.target.value;
		let id = e.target.id;
		if (value) {
			let errorObj = formError;
			errorObj[id] = '';
			setFormError(errorObj);
		}
		setForm({
			...form,
			[id]: value,
		});
	};

	const formCheck = () => {
		let errorObj = {};
		for (const key in form) {
			const elem = form[key];
			if (!elem) {
				errorObj[key] = 'This field is empty';
			}
		}
		setFormError(errorObj);
		return errorObj;
	};

	const onUpdate = async () => {
		let errors = formCheck();
		if (Object.keys(errors).length === 0) {
			setIsLoading(true);
			console.log('onUpdate start');
			let speciality = [];
			checkedState?.forEach((flag, id) => {
				if (flag) {
					speciality.push(stylesOfClothe[id]?.id);
				}
			});
			let tailor = {
				id: clickedTailor.id,
				name: form.name,
				nickName: form.nickName,
				email: form.email,
				username: form.email,
				password: form.password,
				stars: parseFloat(form.stars),
				exp: parseFloat(form.exp),
				description: form.description,
				speciality: speciality
			};
			if (clickedTailor.avatar) {
				tailor.avatar = clickedTailor.avatar
			}
			if (productList) {
				tailor.products = productList
			}
			console.log('onUpdate tailor', tailor);
			setDocument('tailors', tailor, tailor.id)
				.then((docRefId) => {
					console.log('onUpdate success');
					console.log("onUpdate setDocument success docRefId", docRefId);
					// setIsLoading(false);
					if (imageAvatar && imageAvatar.name != "") {
						updateAvatar(tailor);
						// uploadAvatar(tailor);
					} else {
						uploadImageProducts(tailor)
					}
				})
				.catch(() => {
					console.log('handleDataFabricTypes fail');
					setIsLoading(false);
				});
		}
		console.log('onUpdate imageAvatar', imageAvatar);
		console.log('onUpdate tempFiles', tempFiles);
	};

	const updateAvatar = async (tailor) => {
		setOpen(false);
		setIsLoading(true);
		var imageRef = 'image/tailors/' + tailor.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();
		let itemRefArray = res?.items;
		if (itemRefArray.length > 0) {
			itemRefArray[0]
				.delete()
				.then(() => {
					console.log('Delete old avatar success');
					uploadAvatar(tailor);
				})
				.catch((error) => {
					setIsLoading(false);
					console.log('Delete old avatar fail, error = ', error);
				});
		} else {
			uploadAvatar(tailor);
		}
	};

	const uploadAvatar = (tailor) => {
		console.log("uploadAvatar tailorId", tailor.id);
		if (imageAvatar) {
			var path = 'image/tailors/' + tailor.id;
			let fileUploadPromise = fileUpload(imageAvatar, `${path}/avatar-${imageAvatar.name}`);

			if (fileUploadPromise != null) {
				// setIsLoading(true);
				fileUploadPromise
					.then(() => {
						console.log('uploadAvatar success ');
						handleUploadAvatar(tailor)
					})
					.catch(() => {
						console.log('uploadAvatar Fail ');
						setIsLoading(false);
					});
			}
		} else {
			setIsLoading(false);
		}
	};


	const handleUploadAvatar = async (data) => {
		console.log("handleUploadAvatar data.id", data.id);
		var imageRef = 'image/tailors/' + data.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();

		let itemRefArray = res?.items;
		if (itemRefArray.length > 0) {
			let urls = await Promise.all(itemRefArray?.map((itemRef) => itemRef.getDownloadURL()));
			console.log("handleUploadAvatar urls", urls);

			if (urls?.length > 0) {
				let updateTailor = {
					...data,
					avatar: urls[0]
				};

				setDocument('tailors', updateTailor, data.id)
					.then(() => {
						console.log('handleUploadAvatar success');
						// setIsLoading(false);

						// fetchAllRealTime('tailors', (results) => {
						// 	const action_setTailor = setTailor(results);
						// 	dispatch(action_setTailor);
						// 	// history.goBack();
						// });
					})
					.catch(() => {
						console.log('handleUploadAvatar fail');
						// setIsLoading(false);
					})
					.finally(() => {
						uploadImageProducts(updateTailor);
					})
			}
		} else {
			setIsLoading(false);
			// alert(`There is no image for ${data.id}`);
		}
	};


	const uploadImageProducts = (data) => {
		console.log("uploadImageProducts tailorId", data.id);
		if (tempFiles && tempFiles.length > 0) {
			console.log("uploadImageProducts tempFiles", tempFiles);
			var path = 'image/tailors/' + data.id;
			let fileUploadPromises = tempFiles.map((file) => {
				return fileUpload(file, `${path}/product-${file.name}`);
			});
			if (fileUploadPromises.length > 0) {
				// setIsLoading(true);
				Promise.all(fileUploadPromises)
					.then((results) => {
						console.log('uploadImageProducts success ');
						handleUploadProducts(data);
					})
					.catch(() => {
						console.log('uploadImageProducts Fail ');
						setIsLoading(false);
					});
			}
		}
	};


	const handleUploadProducts = async (data) => {
		console.log("handleUploadAvatar data.id", data.id);
		var imageRef = 'image/tailors/' + data.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();

		let itemRefArray = res?.items;
		if (itemRefArray.length > 0) {
			let urls = await Promise.all(itemRefArray?.map((itemRef) => itemRef.getDownloadURL()));
			console.log("handleUploadProducts urls", urls);

			if (urls?.length > 0) {
				let updateTailor = {
					...data,
					products: urls.slice(1)
				};

				setDocument('tailors', updateTailor, data.id)
					.then(() => {
						console.log('handleUploadProducts success');
						// setIsLoading(false);

						fetchAllRealTime('tailors', (results) => {
							const action_setTailor = setTailor(results);
							dispatch(action_setTailor);
						});
					})
					.catch(() => {
						console.log('handleUploadAvatar fail');
						// setIsLoading(false);
					})
					.finally(() => {
						setIsLoading(false);
						// history.goBack();
					});
			}
		} else {
			setIsLoading(false);
			// alert(`There is no image for ${data.id}`);
		}
	};

	const handleOnChange = (position) => {
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);
		setCheckedState(updatedCheckedState);
	};

	const onSetFileAvatar = (file) => {
		console.log('onSetFileAvatar', file);
		setImageAvatar(file);
	};

	const onSetProductFiles = (files) => {
		console.log('onSetProductFiles', files);
		// setImageList(files);
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

	const onRowClick = (clickedIndex) => {
		setSelectedIndex(clickedIndex)
		let tailor = tailors[clickedIndex]
		setClickedTailor(tailor);
		setForm({
			name: tailor.name,
			nickName: tailor.nickName,
			email: tailor.email,
			password: tailor.password,
			stars: tailor.stars,
			exp: tailor.exp,
			description: tailor.description,
		})
		var updatedCheckedState = checkedState
		stylesOfClothe.forEach((item, id) => {
			updatedCheckedState[id] = false
			tailor?.speciality?.forEach((item2) => {
				if (item.id == item2) {
					updatedCheckedState[id] = true
				}
			});
		});
		setCheckedState(updatedCheckedState);
		setProductList(tailor.products)
	}


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
		var imageRef = 'image/tailors/' + clickedTailor.id;
		var storageRef = firebase.storage().ref().child(imageRef);
		var res = await storageRef.listAll();
		let itemRefArray = res?.items;
		if (itemRefArray.length > 1 && itemRefArray[currentIndex+1]) {
			itemRefArray[currentIndex+1]
				.delete()
				.then(() => {
					console.log('Delete image success');
					handleUploadProducts(clickedTailor)
				})
				.catch((error) => {
					setIsLoading(false);
					console.log('Delete image fail, error = ', error);
				});
		}
	};


	const handleClickUpload = (clickedIndex) => {
		// var fabricSelected = fabricTypes[fabricSelectedIndex];
		// if (fabricSelected && fabricSelected.id) {
		// 	var path = 'image/fabrics/suitableConstume/' + fabricSelected.id;
		// 	let file = tempFiles[clickedIndex];
		// 	let fileUploadPromise = fileUpload(file, `${path}/${file.name}`);

		// 	if (fileUploadPromise != null) {
		// 		setIsLoading(true);
		// 		fileUploadPromise
		// 			.then(() => {
		// 				console.log('handleClickUpload success ');
		// 				handleDataFabricTypes(fabricSelected);
		// 				handleClickCancel(clickedIndex);
		// 			})
		// 			.catch(() => {
		// 				console.log('handleClickUpload Fail ');
		// 				setIsLoading(false);
		// 			});
		// 	}
		// }
	};


	const handleClickCancel = (clickedIndex) => {
		setTempFiles(tempFiles.filter((item) => item.name !== tempFiles[clickedIndex].name));
	};



	const handleShowCusInfo = () => {
		if (clickedTailor && clickedTailor.id) {
			console.log(clickedTailor);
			if (isLoading) return <ListLoader />;
			return (
				<div className='c-admin-tailor-mgmt__details'>
					<p className='c-admin-tailor-mgmt__details__title'>TAILOR DETAIL</p>
					<div className="c-admin-tailor-add">
						<div className="c-admin-tailor-add__avatar">
							<span className="c-admin-tailor-add__title">Avatar</span>
							{(!imageAvatar || (imageAvatar && imageAvatar.length == 0)) && clickedTailor.avatar && <div className='c-admin-tailor-mgmt__details__avatar'>
								<img src={clickedTailor.avatar} />
							</div>}
							<SingleFileUpload setFile={onSetFileAvatar} />
						</div>
						<div className="c-admin-tailor-add__input">
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Name"
									id="name"
									value={form.name}
									onChange={onFormChange}
									errors={formError.name}
								/>
							</div>
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Nick Name"
									id="nickName"
									value={form.nickName}
									onChange={onFormChange}
									errors={formError.nickName}
								/>
							</div>
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Email"
									id="email"
									type="email"
									value={form.email}
									onChange={onFormChange}
									errors={formError.email}
								/>
							</div>
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Password"
									id="password"
									type="password"
									value={form.password}
									onChange={onFormChange}
									errors={formError.password}
								/>
							</div>
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Stars"
									id="stars"
									type="number"
									value={form.stars}
									onChange={onFormChange}
									errors={formError.stars}
								/>
							</div>
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Experience"
									id="exp"
									type="number"
									value={form.exp}
									onChange={onFormChange}
									errors={formError.exp}
								/>
							</div>
							<div className="c-admin-tailor-add__input--item">
								<TextInput
									label="Description"
									id="description"
									value={form.description}
									onChange={onFormChange}
									errors={formError.description}
								/>
							</div>
						</div>
						<div className="c-admin-tailor-add__speciality">
							<span className="c-admin-tailor-add__title">Specialities</span>
							<div className="c-admin-tailor-add__speciality--list">
								{stylesOfClothe.map(({ name }, index) => {
									return (
										<div
											onClick={() => handleOnChange(index)}
											key={index}
											className="c-admin-tailor-add__speciality--item"
										>
											<input
												type="checkbox"
												id={`custom-checkbox-${index}`}
												name={name}
												value={name}
												checked={checkedState[index]}
											/>
											<label for="others">{name}</label>
										</div>
									);
								})}
							</div>
						</div>

						<div className="c-admin-tailor-add__products">
							<span className="c-admin-tailor-add__title">Tailored clothes</span>
							{/* <MultipleFileUpload setFiles={onSetProductFiles} /> */}
							<div className="admin-often-used-mgmt__image-list admin-often-used-mgmt">
								{productList?.map((image, index) => (
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
												{/* <div className="-upload-btn" onClick={() => handleClickUpload(index)}>
													<MediumButton text="Upload" />
												</div>
												<div className="-cancel-btn" onClick={() => handleClickCancel(index)}>
													<MediumButton text="Delete" />
												</div> */}
												<div className="-delete-btn" onClick={() => handleClickCancel(index)}>
													<MediumButton text="Remove" />
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
							
						</div>
						<div className="c-admin-tailor-add__button">
							<span className="c-admin-tailor-add__button--item" onClick={onUpdate}>
								Update
							</span>
						</div>
					</div>
				</div>
			);
		}
	}

	/*--------------*/

	if (!tailors) return <Fragment />;
	return (
		<div className="c-admin-tailor-mgmt">
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{TABLE_HEAD.map((header, index) => {
									return (
										<TableCell key={index} align="center">
											{header}
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{tailors.length > 0 ? (
								tailors.map((row, index) => (
									<TableRow key={index} onClick={() => onRowClick(index)} 
									className={classNames('bg-white', { 'bg-e8': (selectedIndex == index)})}>
										<TableCell align="center">
											<div className="image-wraper">
												<img src={row.avatar || defaultUser} alt="design file" />
											</div>
										</TableCell>
										<TableCell align="center">{row.name || row.id}</TableCell>
										<TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.stars}</TableCell>
										<TableCell align="center">{row.products ? row.products.length : 0}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell>
										<p style={{ textAlign: 'center' }}>No tailors</p>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			{handleShowCusInfo()}

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


export default TailorManage;
