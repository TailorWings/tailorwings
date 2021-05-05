import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './type';
import firebase from 'firebase/app';
import { setDocument } from '../../services/API/firebaseAPI';

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

			let promiseArray = uploadedPatterns.map((data) => {
				let imageRef = `image/patterns/${data.id}.jpg`;
				/*--------------*/
				var storageRef = firebase.storage().ref();
				var imgRef = storageRef.child(imageRef);
				/*--------------*/
				return imgRef.getDownloadURL();
			});

			Promise.all(promiseArray)
				.then((result) => {
					if (result) {
						uploadedPatterns = uploadedPatterns.map((pattern, index) => {
							return { ...pattern, image: { mockup: '', normal: result[index] } };
						});
						if (uploadedPatterns) {
							let uploadArray = uploadedPatterns.map((pattern) => {
								return setDocument('patterns', pattern, pattern.id);
							});

                            Promise.all(uploadArray);
						}
					}
				})
				.catch((error) => {
					console.log(`error`, error);
				});
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
		</div>
	);
}

export default TestExcel;
