import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import leftArrowIcon from '../../../assets/icons/slider-arrow-left.svg';
import rightArrowIcon from '../../../assets/icons/slider-arrow-right.svg';
import ListOfMesurementDropdown from '../../../components/Dropdown/ListOfMesurementDropdown';
import MeasurementForm from '../../../components/Form/MeasurementForm';

OnlineMethod.propTypes = {
	measurements: PropTypes.array,
};

OnlineMethod.defaultProps = {
	measurements: null,
};

function OnlineMethod(props) {
	const { measurements } = props;

	if (!measurements) return <Fragment />;

	return (
		<div className="c-msmt-online">
			<div className="c-msmt-online-guideline">
				<div className="c-msmt-online-guideline-slider">
					<button className="c-msmt-online-guideline-slider__left">
						<img src={leftArrowIcon} alt="icon" />
					</button>
					<div className="c-msmt-online-guideline-slider__item">
						<div className="c-msmt-online-guideline-slider__video"></div>
					</div>
					{/* {measurements.map((measurement, index) => {
						return (
							<div key={index} className="c-msmt-online-guideline-slider__item">
								<div className="c-msmt-online-guideline-slider__video"></div>
							</div>
						);
					})} */}
					<button className="c-msmt-online-guideline-slider__right">
						<img src={rightArrowIcon} alt="icon" />
					</button>
				</div>
				<div className="c-msmt-online-guideline-bottom">
					<span className="c-msmt-online-guideline-bottom__count">
						TAILORWINGS - How To Measure: Crotch (4/18)
					</span>
					<ListOfMesurementDropdown />
				</div>
			</div>
			<MeasurementForm measurements={measurements} />
		</div>
	);
}

export default OnlineMethod;
