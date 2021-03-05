import React, { Fragment } from 'react';
import RequiremmentSummary from '../../../components/RequirementSummary';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import {
	NOTE_SUM_SUBTITLE,
	NOTE_SUM_TITLE,
	RQMT_SUM_SUBTITLE,
	RQMT_SUM_TITLE,
	STANDARD_SIZES,
} from '../../../constants';
import TextInput from '../../../components/TextInput';
import OnlineMeasurement from './OnlineMeasurement';
import OfflineMeasurement from './OfflineMeasurement';
import StandardSizeMeasurement from './StandardSizeMeasurement';

SummaryContent.propTypes = {
	msmtMethod: PropTypes.object,
};

SummaryContent.defaultProps = {
	msmtMethod: null,
};

const TEST_STYLE = 'Dress';
const TEST_PRODUCTS = new Array(3).fill(null);
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
const TEST_NOTE = new Array(4).fill({
	label: 'Note',
	content: 'This is note',
});

const TEST_ESTIMATE_SIZE_SUM = STANDARD_SIZES.map((size) => {
	return { name: size, active: size.toLowerCase() === 'm' };
});

const TEST_STANDARD_SIZE_SUM = STANDARD_SIZES.map((size) => {
	return { name: size, active: size.toLowerCase() === 'm' };
});

function SummaryContent(props) {
	const { msmtMethod } = props;
	/*--------------*/
	/*********************************
	 *  Description:
	 */
	function handleMeasurementInfoRender() {
		let renderComponent = <Fragment />;
		switch (msmtMethod.method) {
			case 'online':
				renderComponent = <OnlineMeasurement measurements={TEST_ONLINE_MEASUREMENTS} />;
				break;
			case 'offline':
				renderComponent = <OfflineMeasurement estimatedSize={TEST_ESTIMATE_SIZE_SUM} />;
				break;
			case 'standard-size':
				renderComponent = (
					<StandardSizeMeasurement
						standardSizeInfo={TEST_STANDARD_SIZE_SUM}
						onStandardSizeClick={handleStandardSizeChange}
					/>
				);
				break;

			default:
				break;
		}
		return renderComponent || <Fragment />;
	}
	/************_END_****************/
	/*********************************
	 *  Description: Handle standard size change
	 */
	function handleStandardSizeChange() {}
	/************_END_****************/

	if (!msmtMethod) return <Fragment />;
	return (
		<div className="c-summary-content">
			<div className="c-summary-content__title">
				<Title title={RQMT_SUM_TITLE} subtitle={RQMT_SUM_SUBTITLE} />
			</div>
			<div className="c-summary-content__rqmt">
				<RequiremmentSummary productStyle={TEST_STYLE} productImages={TEST_PRODUCTS} />
			</div>
			<div className="c-summary-content__msmt">{handleMeasurementInfoRender()}</div>
			<div className="c-summary-content__note">
				<div className="c-summary-content__title">
					<Title title={NOTE_SUM_TITLE} subtitle={NOTE_SUM_SUBTITLE} />
				</div>
				{TEST_NOTE.map((note, index) => {
					return (
						<div key={index} className="c-summary-content__input">
							<TextInput label={`${note.label} ${index}`} content={note.content} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SummaryContent;
