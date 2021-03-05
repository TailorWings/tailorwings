import React from 'react';
import MediumButton from '../../../components/Button/MediumButton';
import Menu from '../../../components/Menu';
import TextInput from '../../../components/TextInput';
import Tooltip from '../../../components/Tooltip';
import { STANDARD_SIZES } from '../../../constants';
import imageUploadIcon from '../../../assets/icons/image-upload.svg';

MeasurementContent.propTypes = {};

function MeasurementContent(props) {
	return (
		<div className="c-account-msmt-content">
			<div className="c-account-msmt-content-header">
				<div className="c-account-msmt-content-header__left">
					<p className="c-account-msmt-content-header__title">Measurement</p>
					<div className="c-account-msmt-content-header__subtitle">
						You can watch the video guidance playlist youtube playlist{' '}
						<a
							href="https://www.youtube.com/"
							target="_blank"
							rel="noreferrer"
							className="c-account-msmt-content-header__ytb-link"
						>
							here
						</a>
						.
					</div>
				</div>
				<div className="c-account-msmt-content-header__right">
					<div className="c-account-msmt-content-header__edit">
						<MediumButton text="edit" />
					</div>
					<div className="c-account-msmt-content-header__save">
						<MediumButton text="save" isActive />
					</div>
				</div>
			</div>
			<div className="c-account-msmt-content-container">
				<div className="c-account-msmt-content-container-input">
					{new Array(12).fill('label').map((label, index) => {
						return (
							<div key={index} className="c-account-msmt-content-container-input__item">
								<TextInput label={label} />
							</div>
						);
					})}
				</div>
				<div className="c-account-msmt-content-container-standard">
					<p className="c-account-msmt-content-container-standard__title">Lorem ipsum</p>
					<Menu
						list={STANDARD_SIZES.map((size) => {
							return { name: size, active: size.toLowerCase() === 'm' };
						})}
					/>
				</div>
				<div className="c-account-msmt-content-container__tooltip">
					<Tooltip
						title="Lorem ipsum dolor sit"
						desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus viverra laoreet aenean pellentesque ligula. Parturient vitae pharetra orci, risus blandit integer."
					/>
				</div>
				<div className="c-account-msmt-content-container-image">
					<p className="c-account-msmt-content-container-image__title">Upload 3 photos</p>
					<p className="c-account-msmt-content-container-image__subtitle">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
					<div className="c-account-msmt-content-container-image__upload">
						<div className="c-account-msmt-content-container-image__area">
							<div className="c-account-msmt-content-container-image__container">
								<img
									src={imageUploadIcon}
									alt="icon"
									className="c-account-msmt-content-container-image__icon"
								/>
								<p className="c-account-msmt-content-container-image__desc">
									Drop your image here, or{' '}
									<span className="c-account-msmt-content-container-image__browse">browse</span>
								</p>
								<p className="c-account-msmt-content-container-image__support">
									Supports: JPG, PNG, JPEG
								</p>
							</div>
						</div>
						<div className="c-account-msmt-content-container-image__area">
							<div className="c-account-msmt-content-container-image__container">
								<img
									src={imageUploadIcon}
									alt="icon"
									className="c-account-msmt-content-container-image__icon"
								/>
								<p className="c-account-msmt-content-container-image__desc">
									Drop your image here, or{' '}
									<span className="c-account-msmt-content-container-image__browse">browse</span>
								</p>
								<p className="c-account-msmt-content-container-image__support">
									Supports: JPG, PNG, JPEG
								</p>
							</div>
						</div>
						<div className="c-account-msmt-content-container-image__area">
							<div className="c-account-msmt-content-container-image__container">
								<img
									src={imageUploadIcon}
									alt="icon"
									className="c-account-msmt-content-container-image__icon"
								/>
								<p className="c-account-msmt-content-container-image__desc">
									Drop your image here, or{' '}
									<span className="c-account-msmt-content-container-image__browse">browse</span>
								</p>
								<p className="c-account-msmt-content-container-image__support">
									Supports: JPG, PNG, JPEG
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MeasurementContent;
