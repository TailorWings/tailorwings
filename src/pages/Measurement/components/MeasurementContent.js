import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useHistory } from 'react-router-dom';
// import OfflineMethod from './OfflineMethod';
import OnlineMethod from './OnlineMethod';
import StandardSizeMethod from './StandardSizeMethod';
import { ONLINE_MEASUREMENTS, STANDARD_SIZES } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetail } from '../../../app/ReduxSlices/commonSlice';
import MaterialAlert from '../../../components/MaterialAlert';
import Popup from '../../../components/Popup';
import OnlineMsmtContent from '../../../components/Popup/OnlineMsmtContent';
import { updateDocument } from '../../../services/API/firebaseAPI';
import { removeWhiteSpace } from '../../../services/Functions/commonFunctions';

MeasurementContent.propTypes = {
	match: PropTypes.object,
	measurements: PropTypes.array,
};

MeasurementContent.defaultProps = {
	match: null,
	measurements: null,
};

// const TEST_APMT_INFO = [
// 	{
// 		label: 'Name',
// 		value: '',
// 	},
// 	{
// 		label: 'Phone number',
// 		value: '',
// 	},
// 	{
// 		label: 'Address',
// 		value: '',
// 	},
// 	{
// 		label: 'Your best time',
// 		value: '',
// 	},
// ];

function MeasurementContent(props) {
	const { match } = props;
	const history = useHistory();
	const orderDetail = useSelector((state) => state.common.orderDetail);
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const dispatch = useDispatch();
	/*--------------*/
	const [onlineMsmt, setOnlineMsmt] = useState(null);
	const [alertOpen, setAlertOpen] = useState(false);
	const [popupShow, setPopupShow] = useState(false);
	/*--------------*/
	// const [appointmentInfo, setAppointmentInfo] = useState(
	// 	TEST_APMT_INFO.map((info) => {
	// 		return { ...info, content: '' };
	// 	})
	// );
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return {
				name: size,
				active: !!(size === (orderDetail && orderDetail.stdSize)),
			};
		})
	);
	// const [estimatedSizes, setEstimatedSizes] = useState(
	// 	STANDARD_SIZES.map((size) => {
	// 		return {
	// 			name: size,
	// 			active: false,
	// 		};
	// 	})
	// );
	/*--------------*/
	useEffect(() => {
		if (orderDetail.designStyle) {
			let styleMsmt = ONLINE_MEASUREMENTS.find((msmt) => {
				return (
					msmt.style.toLowerCase().replace(' ', '') ===
					orderDetail.designStyle.toLowerCase().replace(' ', '')
				);
			});
			if (styleMsmt) {
				let modifiedMsmts = styleMsmt.msmts.map((msmt) => {
					return {
						...msmt,
						value: '',
					};
				});
				setOnlineMsmt(modifiedMsmts);
			} else {
				setOnlineMsmt(null);
			}
		}
	}, [orderDetail.designStyle]);
	useEffect(() => {
		if (orderDetail.msmt && onlineMsmt) {
			if (onlineMsmt[0].value === '') {
				let modifiedMsmts = onlineMsmt.map((onlMsmt) => {
					return {
						...onlMsmt,
						value: orderDetail.msmt[onlMsmt.id],
					};
				});
				setOnlineMsmt(modifiedMsmts);
			}
		}
	}, [orderDetail.msmt, onlineMsmt]);
	/*********************************
	 *  Description: handle appointment info change
	 */
	// function handleAppoinmentInfoChange(changeInfo, content) {}
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
	// function handleEstimatedSizeChange(changeIndex) {
	// 	let newEstimatedSizes = estimatedSizes.map((size, index) => {
	// 		return { ...size, active: index === changeIndex };
	// 	});

	// 	if (newEstimatedSizes) {
	// 		setEstimatedSizes(newEstimatedSizes);
	// 	}
	// }
	/************_END_****************/
	/*********************************
	 *  Description: handle form submit
	 */
	function handleOnlineConfirm(value) {
		/*--------------*/
		const action_setOrderDetail = setOrderDetail({ ...orderDetail, msmt: { ...value } });
		dispatch(action_setOrderDetail);
		/*--------------*/
		setPopupShow(true);
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle form submit
	 */
	function handleStandardConfirm() {
		let activeStandardSize = standardSizes.find((size) => size.active);
		if (!activeStandardSize) {
			setAlertOpen(true);
		} else {
			let updatedOrderDetail = { ...orderDetail, stdSize: activeStandardSize.name };
			const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
			dispatch(action_setOrderDetail);
			/*--------------*/
			history.push(`/summary?method=standard-size`);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle saving measurement
	 */
	function handleMsmtSaving(isSave) {
		if (isSave) {
			if (currentCustomer) {
				if (currentCustomer?.msmt?.toString() !== orderDetail.msmt.toString()) {
					updateDocument('customers', currentCustomer.id, 'msmt', orderDetail.msmt);
				}
			}
		}
		history.push(`/summary?method=online`);
	}
	/************_END_****************/
	/*********************************
	 *  Description: handleGetLatestMsmt
	 */
	function handleGetLatestMsmt() {
		if (currentCustomer && currentCustomer?.msmt) {
			let customerMsmt = currentCustomer.msmt && { ...currentCustomer.msmt };
			let updatedOnlineMsmt = [...onlineMsmt];
			if (customerMsmt) {
				updatedOnlineMsmt.forEach((msmt) => {
					msmt.value = customerMsmt[msmt.id] || msmt.value;
				});
				setOnlineMsmt(updatedOnlineMsmt);
			}
		}
	}
	/************_END_****************/

	if (!match) return <Fragment />;
	return (
		<div className="c-measurement-content">
			<Switch>
				{/* <Route
					path={`${match.path}/offline`}
					component={() => (
						<OfflineMethod
							match={match}
							estimatedSizes={estimatedSizes}
							appointmentInfo={appointmentInfo}
							onInputChange={handleAppoinmentInfoChange}
							onSizeClick={handleEstimatedSizeChange}
							onNextClick={handleConfirm}
						/>
					)}
					exact
				/> */}
				<Route
					path={`${match.path}/online`}
					component={() => (
						<OnlineMethod
							match={match}
							measurements={onlineMsmt}
							onMeasurementConfirm={handleOnlineConfirm}
							onGetLatestMsmt={handleGetLatestMsmt}
						/>
					)}
					exact
				/>
				<Route
					path={`${match.path}/standard-size`}
					component={() => (
						<StandardSizeMethod
							match={match}
							standardSizes={standardSizes}
							onSizeClick={handleStandardSizeChange}
							onNextClick={handleStandardConfirm}
						/>
					)}
					exact
				/>
			</Switch>
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content="Please select standard size that fit you!"
				serverity="error"
			/>
			<Popup show={popupShow} setPopupShow={setPopupShow}>
				<OnlineMsmtContent onButtonClick={handleMsmtSaving} />
			</Popup>
		</div>
	);
}

export default MeasurementContent;
