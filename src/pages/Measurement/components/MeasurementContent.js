import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import OfflineMethod from './OfflineMethod';
import OnlineMethod from './OnlineMethod';
import StandardSizeMethod from './StandardSizeMethod';
import { STANDARD_SIZES } from '../../../constants';

MeasurementContent.propTypes = {
	match: PropTypes.object,
	measurements: PropTypes.array,
};

MeasurementContent.defaultProps = {
	match: null,
	measurements: null,
};

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
		value: '',
	};
});

const TEST_APMT_INFO = [
	{
		label: 'Phone number',
		value: '',
	},
	{
		label: 'Address',
		value: '',
	},
	{
		label: 'Your best time',
		value: '',
	},
];

function MeasurementContent(props) {
	const { match } = props;
	/*--------------*/
	const [appointmentInfo, setAppointmentInfo] = useState(
		TEST_APMT_INFO.map((info) => {
			return { ...info, content: '' };
		})
	);
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return {
				name: size,
				active: false,
			};
		})
	);
	const [estimatedSizes, setEstimatedSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return {
				name: size,
				active: false,
			};
		})
	);
	/*--------------*/
	/*********************************
	 *  Description: handle appointment info change
	 */
	function handleAppoinmentInfoChange(changeInfo, content) {}
	/************_END_****************/
	/*********************************
	 *  Description: handle standard size change
	 */
	function handleStandardSizeChange(changeIndex) {
		let newStandardSizes = standardSizes.map((size, index) => {
			return { ...size, active: index === changeIndex };
		});

		if (newStandardSizes) {
			setStandardSizes(newStandardSizes);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle standard size change
	 */
	function handleEstimatedSizeChange(changeIndex) {
		let newEstimatedSizes = estimatedSizes.map((size, index) => {
			return { ...size, active: index === changeIndex };
		});

		if (newEstimatedSizes) {
			setEstimatedSizes(newEstimatedSizes);
		}
	}
	/************_END_****************/

	if (!match) return <Fragment />;
	return (
		<div className="c-measurement-content">
			<Switch>
				<Route
					path={`${match.path}/offline`}
					component={() => (
						<OfflineMethod
							match={match}
							estimatedSizes={estimatedSizes}
							appointmentInfo={appointmentInfo}
							onInputChange={handleAppoinmentInfoChange}
							onSizeClick={handleEstimatedSizeChange}
						/>
					)}
					exact
				/>
				<Route
					path={`${match.path}/online`}
					component={() => <OnlineMethod match={match} measurements={TEST_ONLINE_MEASUREMENTS} />}
					exact
				/>
				<Route
					path={`${match.path}/standard-size`}
					component={() => (
						<StandardSizeMethod
							match={match}
							standardSizes={standardSizes}
							onSizeClick={handleStandardSizeChange}
						/>
					)}
					exact
				/>
			</Switch>
		</div>
	);
}

export default MeasurementContent;
