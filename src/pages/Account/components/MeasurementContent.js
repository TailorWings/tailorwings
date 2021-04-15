import React, { useEffect, useState } from 'react';
import imageUploadIcon from '../../../assets/icons/image-upload.svg';
import SmallButton2 from '../../../components/Button/SmallButton2';
import ComponentLoader from '../../../components/ComponentLoader';
import SingleFileUpload from '../../../components/FileUpload/SingleFileUpload';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import Picker from '../../../components/Picker';
import Title from '../../../components/Title';
import Tooltip from '../../../components/Tooltip';
import { STANDARD_SIZES } from '../../../constants';

const TEST_ONLINE_MEASUREMENTS = [
	'Height',
	'Neck',
	'Shoulder',
	'Bust',
	'Waist',
	'Hip',
	'Upper Bust',
	'Upper Hip',
	'Front bodice',
	'Back bodice',
	'Waist to knee',
	'Waist to ankle',
	'Long Dress',
	'Long Sleeve',
].map((measurement) => {
	return {
		label: measurement,
		value: 45,
	};
});

MeasurementContent.propTypes = {};

function MeasurementContent(props) {
	/*--------------*/
	const [loading, setLoading] = useState(true);
	/*--------------*/
	useEffect(() => {
		/*--------------*/
		let timer = setTimeout(() => {
			setLoading(false);
		}, 500);
		/*--------------*/
		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (loading)
		return (
			<div className="c-account-msmt-content">
				<ComponentLoader />
			</div>
		);
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
						<SmallButton2 text="edit" />
					</div>
					<div className="c-account-msmt-content-header__save">
						<SmallButton2 text="save" isActive />
					</div>
				</div>
			</div>
			<div className="c-account-msmt-content-container">
				<div className="c-account-msmt-content-container-input">
					<MeasurementForm measurements={TEST_ONLINE_MEASUREMENTS} title="List of measurments" />
				</div>
				<div className="c-account-msmt-content-container-standard">
					<p className="c-account-msmt-content-container-standard__title">
						Please choose your estimated size!
					</p>
					<Picker
						list={STANDARD_SIZES.map((size) => {
							return { name: size, active: size.toLowerCase() === 'm' };
						})}
					/>
				</div>
				<div className="c-account-msmt-content-container__tooltip">
					<Tooltip
						title="Lorem ipsum dolor sit"
						content={[
							{
								title: '',
								value:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus viverra laoreet aenean pellentesque ligula. Parturient vitae pharetra orci, risus blandit integer.',
							},
						]}
					/>
				</div>
				<div className="c-account-msmt-content-container-image">
					<Title
						title="Photos of yourself"
						subtitle="Please upload photos of your full body. It helps the tailor to create the best fit for you."
						textStyle="smallLeft"
					/>
					<div className="c-account-msmt-content-container-image__upload">
						<div className="c-account-msmt-content-container-image__input">
							<SingleFileUpload />
						</div>
						<div className="c-account-msmt-content-container-image__input">
							<SingleFileUpload />
						</div>
						<div className="c-account-msmt-content-container-image__input">
							<SingleFileUpload />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MeasurementContent;
