import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './type';
import firebase from 'firebase/app';
import { fileUpload, setDocument } from '../../services/API/firebaseAPI';
import MultipleFileUpload from '../../components/FileUpload/MultipleFileUpload';
import MediumButton from '../../components/Button/MediumButton';
import { formatLink } from '../../services/Functions/commonFunctions';

TestExcel.propTypes = {};

function TestExcel(props) {
	const [dataArray, setDataArray] = useState(null);
	const [images, setImages] = useState(null);

	function onFileChange(e) {
		let files = e.target.files;
		if (files && files[0]) {
			files = files[0];
			/*--------------*/
			const reader = new FileReader();
			const rABS = !!reader.readAsBinaryString;
			reader.onload = (e) => {
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, {
					type: rABS ? 'binary' : 'array',
					bookVBA: true,
				});
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json(ws);
				console.log(`data`, data);
				setDataArray(data.length > 0 ? data : null);
				// setCols(make_cols(ws["!ref"]));
				// updateUploadData(data);
			};

			if (rABS) {
				reader.readAsBinaryString(files);
			} else {
				reader.readAsArrayBuffer(files);
			}
			/*--------------*/
		}
	}

	function onUpload() {
		let uploadedPatterns = [];
		if (dataArray.length > 0) {
			uploadedPatterns = dataArray.map((data) => {
				return { ...data };
			});

			uploadedPatterns.forEach(async (data) => {
				let imageRef = `image/testPatterns`;
				/*--------------*/
				var storageRef = firebase.storage().ref().child(imageRef);
				var res = await storageRef.listAll();
				let itemRefArray = res?.items.filter((itemRef) => {
					return (
						itemRef?.name.toLowerCase()?.split('.')[0]?.split('_')[0].trim() === data.name.toLowerCase().trim()
					);
				});
				// res.items.forEach((itemRef) => {
				// All the items under listRef.

				// if (
				// 	itemRef?.name.toLowerCase()?.split('.')[0]?.split('_')[0] === data.name.toLowerCase()
				// ) {
				// 	console.log('here')
				// 	promiseArray.push(itemRef.getDownloadURL());
				// }
				// });
				/*--------------*/
				// return true;
				// return imgRef.getDownloadURL();
				if (itemRefArray.length > 0) {
					let urls = await Promise.all(itemRefArray?.map((itemRef) => itemRef.getDownloadURL()));
					if (urls?.length > 0) {
						// uploadedPatterns = uploadedPatterns.map((pattern) => {
						// 	return { ...pattern, image: { mockup: '', normal: [...urls] } };
						// });
						let updatePattern = {
							...data,
							image: { ...data?.image, normal: urls.sort()[0], list: [...urls.sort()] },
						};
						console.log(`updatePattern`, updatePattern);
						// setDocument('patterns', updatePattern, updatePattern.id);
					}
					// if (uploadedPatterns) {
					// console.log('uploadedPatterns :>> ', uploadedPatterns);
					// let uploadArray = uploadedPatterns.map((pattern) => {
					// return setDocument('patterns', pattern, pattern.id);
					// });
					// Promise.all(uploadArray).then(() => alert('success'));
					// }
				}
			});
			// Promise.all(promiseArray)
			// 	.then((result) => {console.log('result :>> ', result);})

			// Promise.all(promiseArray)
			// 	.then((result) => {
			// 		if (result) {
			// 			uploadedPatterns = uploadedPatterns.map((pattern, index) => {
			// 				return { ...pattern, image: { mockup: '', normal: result[index] } };
			// 			});
			// 			console.log('uploadedPatterns :>> ', uploadedPatterns);
			// if (uploadedPatterns) {
			// 	let uploadArray = uploadedPatterns.map((pattern) => {
			// 		return setDocument('patterns', pattern, pattern.id);
			// 	});

			// 	Promise.all(uploadArray);
			// }
			// }
			// })
			// .catch((error) => {
			// console.log(`error`, error);
			// });
		}
	}

	function onSetFiles(files) {
		let fileUploadPromises = files.map((file) => {
			return fileUpload(file, `image/testPatterns/${file.name}`);
		});

		console.log('fileUploadPromises :>> ', fileUploadPromises);
		if (fileUploadPromises.length > 0) {
			Promise.all(fileUploadPromises).then(() => alert('success'));
		}
	}

	return (
		<div>
			<label>
				Tải lên *.
				<input type="file" id="file" accept={SheetJSFT} onChange={(e) => onFileChange(e)} />
				{/* <img src={IconUpload} alt="upload-icon" /> */}
			</label>
			<button onClick={onUpload}>Upload</button>

			{dataArray ? (
				dataArray.map((data) => {
					return <p>{JSON.stringify(data)}</p>;
				})
			) : (
				<Fragment />
			)}

			<br />
			<br />
			<br />
			<MultipleFileUpload setFiles={onSetFiles} />

			<div>
				<MediumButton text="Upload" />
			</div>
		</div>
	);
}

export default TestExcel;
