import React, { Fragment, useState } from 'react';
import SingleFileUpload from '../../../components/FileUpload/SingleFileUpload';
import MultipleFileUpload from '../../../components/FileUpload/MultipleFileUpload';
import TextInput from '../../../components/Input/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setTailor } from '../../../app/ReduxSlices/tailorSlice';
import { fetchAllRealTime } from '../../../services/API/firebaseAPI';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import firebase from 'firebase/app';

import ListLoader from '../../../components/ComponentLoader';
import { fileUpload, setDocument, addDocument } from '../../../services/API/firebaseAPI';
function TailorAdd(props) {

	const history = useHistory();
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
	const [imageList, setImageList] = useState([]);

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

	const onAdd = async () => {
		let errors = formCheck();
		if (Object.keys(errors).length === 0) {
			setIsLoading(true);
			console.log('onAdd start');
			let speciality = [];
			checkedState?.forEach((flag, id) => {
				if (flag) {
					speciality.push(stylesOfClothe[id]?.id);
				}
			});
			let tailor = {
				name: form.name,
				nickName: form.nickName,
				email: form.email,
				username: form.email,
				password: form.password,
				stars: parseFloat(form.stars),
				exp: parseFloat(form.exp),
				description: form.description,
				speciality: speciality,
			};
			console.log('onAdd tailor', tailor);
			addDocument('tailors', tailor)
				.then((docRefId) => {
					console.log('onAdd success');
					console.log("onAdd addDocument success docRefId", docRefId);
					// setIsLoading(false);
					tailor.id = docRefId;
					uploadAvatar(tailor);
					// fetchAllRealTime('tailors', (results) => {
					// 	const action_setTailor = setTailor(results);
					// 	dispatch(action_setTailor);
					// 	history.goBack();
					// });
				})
				.catch(() => {
					console.log('handleDataFabricTypes fail');
					setIsLoading(false);
				});
		}
		console.log('onAdd imageAvatar', imageAvatar);
		console.log('onAdd imageList', imageList);
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
		if (imageList && imageList.length > 0) {
			var path = 'image/tailors/' + data.id;
			let fileUploadPromises = imageList.map((file) => {
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
						history.goBack();
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
		setImageList(files);
	};

	if (isLoading) return <ListLoader />;
	return (
		<div className="c-admin-tailor-add">
			<div className="c-admin-tailor-add__avatar">
				<span className="c-admin-tailor-add__title">Avatar</span>
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
				<MultipleFileUpload setFiles={onSetProductFiles} />
			</div>
			<div className="c-admin-tailor-add__button">
				<span className="c-admin-tailor-add__button--item" onClick={onAdd}>
					Add
				</span>
			</div>
		</div>
	);
}
export default TailorAdd;
