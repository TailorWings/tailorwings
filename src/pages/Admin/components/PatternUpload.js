import React, { Fragment, useState } from 'react';
import XLSX from 'xlsx';
import SmallButton2 from '../../../components/Button/SmallButton2';
import MultipleFileUpload from '../../../components/FileUpload/MultipleFileUpload';
import { fileUpload, setDocument } from '../../../services/API/firebaseAPI';
import { SheetJSFT } from './type';
import firebase from 'firebase/app';
import ListLoader from '../../../components/ComponentLoader';

function PatternUpload(props) {
	const [dataArray, setDataArray] = useState(null);
	const [patternImages, setPatternImages] = useState(null);
	const [isImageFileClear, setIsImageFileClear] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	/*------------------------------*/
	function onExcelChange(e) {
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
	function onImageChange(imageFiles) {
		setIsImageFileClear(false);
		setPatternImages(imageFiles);
	}
	function handleImageUpload() {
		let fileUploadPromises = patternImages?.map((file) => {
			return fileUpload(file, `image/patterns/${file.name}`);
		});

		if (fileUploadPromises?.length > 0) {
			setIsLoading(true);
			Promise.all(fileUploadPromises)
				.then(() => {
					setIsImageFileClear(true);
					alert('success');
                    setIsLoading(false);
				})
				.catch(() => {
					alert('Fail!');
					setIsLoading(false);
				});
		}
	}
	function handleDataUpload() {
        let uploadedPatterns = [];
		if (dataArray?.length > 0) {
            setIsLoading(true);
			uploadedPatterns = dataArray.map((data) => {
				return { ...data };
			});

			uploadedPatterns?.forEach(async (data) => {
				let imageRef = `image/patterns`;
				/*--------------*/
				var storageRef = firebase.storage().ref().child(imageRef);
				var res = await storageRef.listAll();
				let itemRefArray = res?.items.filter((itemRef) => {
					return (
						itemRef?.name.toLowerCase()?.split('.')[0]?.split('(')[0]?.trim() ===
						data.name.toLowerCase()?.trim()
					);
				});
				if (itemRefArray.length > 0) {
					let urls = await Promise.all(itemRefArray?.map((itemRef) => itemRef.getDownloadURL()));
					if (urls?.length > 0) {
						let updatePattern = {
							...data,
							image: { ...data?.image, normal: urls.sort()[0], list: [...urls.sort()] },
						};
						setDocument('patterns', updatePattern, updatePattern.id)
							.then(() => {
								setDataArray(null);
								setIsLoading(false);
							})
							.catch(() => {
								alert(`Fail: ${data.id}`);
								setIsLoading(false);
							});
					}
				} else {
					alert(`There is no image for ${data.id}`);
				}
			});
		}
	}
	/*------------------------------*/
	if (isLoading) return <ListLoader />;
	return (
		<div className="admin-pattern-upload">
			<div className="admin-pattern-upload__title">
				<h2>Image Upload</h2>
				<div className="-upload-btn" onClick={handleImageUpload}>
					<SmallButton2 text="Upload" />
				</div>
			</div>
			<div className="admin-pattern-upload__image">
				<MultipleFileUpload setFiles={onImageChange} isClear={isImageFileClear} />
			</div>

			<div className="admin-pattern-upload__title">
				<h2>Data Upload</h2>
				<div className="-upload-btn" onClick={handleDataUpload}>
					<SmallButton2 text="Upload" />
				</div>
			</div>
			<div className="admin-pattern-upload__data">
				<label htmlFor="file-input">
					Browse file
					<input
						type="file"
						style={{ visibility: 'hidden' }}
						id="file-input"
						accept={SheetJSFT}
						onChange={(e) => onExcelChange(e)}
					/>
					{/* <img src={IconUpload} alt="upload-icon" /> */}
				</label>
			</div>
			{dataArray ? (
				dataArray.map((data, index) => {
					return <p key={index}>{JSON.stringify(data)}</p>;
				})
			) : (
				<Fragment />
			)}
		</div>
	);
}

export default PatternUpload;
