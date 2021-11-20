import React, { Fragment, useState } from 'react';
import MultipleFileUpload from '../../../components/FileUpload/MultipleFileUpload';

function TailorAdd(props) {
	const [isImageFileClear, setIsImageFileClear] = useState(false);

	function onImageChange(imageFiles) {
		// setIsImageFileClear(false);
		// setPatternImages(imageFiles);
	}

	return (
		<div className="c-admin-tailor-add">
			<div className="c-admin-tailor-add__avatar">
				<span className="c-admin-tailor-add__title">Avatar</span>
				<MultipleFileUpload setFiles={onImageChange} isClear={isImageFileClear} />
			</div>
			<div className="c-admin-tailor-add__input">
				<div className="c-admin-tailor-add__input--item">
					<span className="c-admin-tailor-add__title">Name</span>
					<input type="text" />
				</div>
				<div className="c-admin-tailor-add__input--item">
					<span className="c-admin-tailor-add__title">Nick Name</span>
					<input type="text" />
				</div>
				<div className="c-admin-tailor-add__input--item">
					<span className="c-admin-tailor-add__title">Username</span>
					<input type="text" />
				</div>
				<div className="c-admin-tailor-add__input--item">
					<span className="c-admin-tailor-add__title">Password</span>
					<input type="text" />
				</div>
				<div className="c-admin-tailor-add__input--item">
					<span className="c-admin-tailor-add__title">Description</span>
					<input type="text" />
				</div>
			</div>
			<div className="c-admin-tailor-add__speciality">
				<span className="c-admin-tailor-add__title">Speciality</span>
				<div className="c-admin-tailor-add__speciality--list">
					<div className="c-admin-tailor-add__speciality--item">
						<input type="checkbox" id="dress" name="dress" value="dress" />
						<label for="dress">Dress</label>
					</div>
					<div className="c-admin-tailor-add__speciality--item">
						<input type="checkbox" id="shirts" name="shirts" value="shirts" />
						<label for="shirts">Shirts</label>
					</div>
					<div className="c-admin-tailor-add__speciality--item">
						<input type="checkbox" id="pants" name="pants" value="pants" />
						<label for="pants">Pants</label>
					</div>
					<div className="c-admin-tailor-add__speciality--item">
						<input type="checkbox" id="skirts" name="skirts" value="skirts" />
						<label for="skirts">Skirts</label>
					</div>
					<div className="c-admin-tailor-add__speciality--item">
						<input type="checkbox" id="aodai" name="aodai" value="aodai" />
						<label for="aodai">AoDai</label>
					</div>
					<div className="c-admin-tailor-add__speciality--item">
						<input type="checkbox" id="others" name="others" value="others" />
						<label for="others">Others</label>
					</div>
				</div>
			</div>
			<div className="c-admin-tailor-add__button">
				<span className="c-admin-tailor-add__button--item">Add</span>
			</div>
		</div>
	);
}
export default TailorAdd;
