import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ListOfMesurementDropdown from '../../../components/Dropdown/ListOfMesurementDropdown';
import MeasurementForm from '../../../components/Form/MeasurementForm';
import SelectInput from '../../../components/Input/SelectInput';
import ProcessAction from '../../../components/ProcessAction';
import Slider from '../../../components/Slider';

OnlineMethod.propTypes = {
	measurements: PropTypes.array,
	onMeasurementConfirm: PropTypes.func,
	onGetLatestMsmt: PropTypes.func,
};

OnlineMethod.defaultProps = {
	measurements: null,
	onMeasurementConfirm: null,
	onGetLatestMsmt: null,
};

function OnlineMethod(props) {
	const { measurements, onMeasurementConfirm, onGetLatestMsmt } = props;

	if (!measurements || !onMeasurementConfirm) return <Fragment />;

	return (
		<div className="c-msmt-online">
			<div className="c-msmt-online-guideline">
				<div className="c-msmt-online-guideline-slider">
					<Slider>
						<div className="c-msmt-online-guideline-slider__item">
							<div className="c-msmt-online-guideline-slider__video"></div>
						</div>
					</Slider>
					{/* {measurements.map((measurement, index) => {
						return (
							<div key={index} className="c-msmt-online-guideline-slider__item">
								<div className="c-msmt-online-guideline-slider__video"></div>
							</div>
						);
					})} */}
				</div>
				<div className="c-msmt-online-guideline-bottom">
					<span className="c-msmt-online-guideline-bottom__count">
						TAILORWINGS - How To Measure: Crotch (4/18)
					</span>
					{/* <SelectInput
						selectInfo={measurements.map((msmt) => {
							return msmt.label;
						})}
					/> */}
					{/* <ListOfMesurementDropdown /> */}
				</div>
			</div>
			<div className="c-msmt-online-input">
				<MeasurementForm
					measurements={measurements}
					onSubmit={onMeasurementConfirm}
					onGetLatestMsmt={onGetLatestMsmt}
				/>
			</div>
			<ProcessAction backLink="/fabric" formID="msmt-form" />
		</div>
	);
}

export default OnlineMethod;
