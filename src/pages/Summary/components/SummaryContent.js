import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import RqmtNoteForm from '../../../components/Form/RqmtNoteForm';
import ProcessAction from '../../../components/ProcessAction';
import RequiremmentSummary from '../../../components/RequirementSummary';
import Title from '../../../components/Title';
import {
	NOTE_SUM_SUBTITLE,
	NOTE_SUM_TITLE,
	ONLINE_MEASUREMENTS,
	RQMT_SUM_SUBTITLE,
	RQMT_SUM_TITLE,
	STANDARD_SIZES,
} from '../../../constants';
import { fileUpload, updateDocument } from '../../../services/API/firebaseAPI';
import OfflineMeasurement from './OfflineMeasurement';
import OnlineMeasurement from './OnlineMeasurement';
import StandardSizeMeasurement from './StandardSizeMeasurement';
import moment from 'moment';
import { formatLink } from '../../../services/Functions/commonFunctions';
import { resetState, setOrderDetail } from '../../../app/ReduxSlices/commonSlice';
import { useHistory } from 'react-router';

SummaryContent.propTypes = {
	msmtMethod: PropTypes.object,
};

SummaryContent.defaultProps = {
	msmtMethod: null,
};

const TEST_ESTIMATE_SIZE_SUM = STANDARD_SIZES.map((size) => {
	return { name: size, active: size.toLowerCase() === 'm' };
});

function SummaryContent(props) {
	const history = useHistory();
	const { msmtMethod } = props;
	/*--------------*/
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const orderDetail = useSelector((state) => state.common.orderDetail);
	const [onlineMsmt, setOnlineMsmt] = useState(null);
	const [notes, setNotes] = useState(new Array(4).fill(''));
	const [standardSizes, setStandardSizes] = useState(
		STANDARD_SIZES.map((size) => {
			return { name: size, active: false };
		})
	);
	const dispatch = useDispatch();
	/*--------------*/
	useEffect(() => {
		if (orderDetail) {
			/*--------------*/
			let onlineMsmtTitle = ONLINE_MEASUREMENTS.find(
				(msmt) => msmt.style === orderDetail.designStyle
			);
			let modifiedOnlineMsmt = [];
			if (onlineMsmtTitle) {
				if (orderDetail.msmt) {
					modifiedOnlineMsmt = onlineMsmtTitle.msmts.map((msmt) => {
						return {
							...msmt,
							value: orderDetail.msmt[msmt.id],
						};
					});
				} else {
					modifiedOnlineMsmt = onlineMsmtTitle.msmts.map((msmt) => {
						return {
							...msmt,
							value: '',
						};
					});
				}
				setOnlineMsmt(modifiedOnlineMsmt);
			} else {
				setOnlineMsmt(null);
			}
			/*--------------*/
			if (orderDetail.stdSize) {
				let updatedStandardSizes = standardSizes.map((size) => {
					return { ...size, active: size.name.toLowerCase() === orderDetail.stdSize.toLowerCase() };
				});
				setStandardSizes([...updatedStandardSizes]);
			}
		}
	}, [orderDetail, orderDetail.stdSize]);
	/*********************************
	 *  Description:
	 */
	function handleMeasurementInfoRender() {
		let renderComponent = <Fragment />;
		switch (msmtMethod.method) {
			case 'online':
				renderComponent = <OnlineMeasurement measurements={onlineMsmt} />;
				break;
			case 'offline':
				renderComponent = <OfflineMeasurement estimatedSize={TEST_ESTIMATE_SIZE_SUM} />;
				break;
			case 'standard-size':
				renderComponent = (
					<StandardSizeMeasurement standardSizeInfo={standardSizes} onStandardSizeClick={null} />
				);
				break;

			default:
				break;
		}
		return renderComponent || <Fragment />;
	}
	/************_END_****************/
	/*********************************
	 *  Description: on notes change
	 */
	function handleNoteChange(e, changedIndex) {
		e.preventDefault();
		let value = e.target.value;
		if (value !== null && value !== undefined && changedIndex > -1) {
			let changedNotes = [...notes];
			changedNotes[changedIndex] = value;
			setNotes(changedNotes);
			/*--------------*/
			let modifiedOrderDetail = { ...orderDetail, notes: changedNotes };
			const action_setOrderDetail = setOrderDetail(modifiedOrderDetail);
			dispatch(action_setOrderDetail);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle form confirm
	 */
	function onConfirm() {
		if (orderDetail) {
			const { designStyle, fabric, msmt, stdSize } = orderDetail;
			let orderDetailId = uuidv4();
			let currentOrderDetail = {
				id: orderDetailId,
				status: 'finding',
				orderDate: moment().format('L') + moment().format('LT'),
				receiveDate: null,
				finishDate: null,
				offers: [],
				designFiles: [],
				designStyle,
				fabric: {
					...fabric,
					pattern: {
						id: fabric.pattern.id,
						image: fabric.pattern.image,
					},
				},
				msmt,
				stdSize,
				notes: [...notes],
			};
			let uploadOrderDetail = currentCustomer.orders ? [...currentCustomer.orders] : [];
			/*--------------*/
			let fileUploadPromises = orderDetail.designFiles.map((file) => {
				return fileUpload(
					file,
					`image/customerDesigns/${currentCustomer.id}/${formatLink(file.name)}`
				);
			});
			if (fileUploadPromises.length > 0) {
				Promise.all(fileUploadPromises)
					.then((results) => {
						currentOrderDetail.designFiles = results && [...results];
						uploadOrderDetail.push(currentOrderDetail);
						updateDocument('customers', currentCustomer.id, 'orders', uploadOrderDetail);
						/*--------------*/
						const action_resetState = resetState();
						dispatch(action_resetState);
						/*--------------*/
						history.push(`/account/detail?id=${orderDetailId}`);
					})
					.catch((error) => {
						console.log('error :>> ', error);
					});
			}
		}
	}
	/************_END_****************/
	if (!msmtMethod || !orderDetail) return <Fragment />;
	return (
		<div className="c-summary-content">
			<div className="c-summary-content__title">
				<Title title={RQMT_SUM_TITLE} subtitle={RQMT_SUM_SUBTITLE} />
			</div>
			<div className="c-summary-content__rqmt">
				<RequiremmentSummary
					designStyle={orderDetail.designStyle}
					designFiles={orderDetail.designFiles}
					fabricType={orderDetail.fabric.type}
					fabricPattern={orderDetail.fabric.pattern}
				/>
			</div>
			<div className="c-summary-content__msmt">{handleMeasurementInfoRender()}</div>
			<div className="c-summary-content-note">
				<div className="c-summary-content-note__title">
					<Title title={NOTE_SUM_TITLE} subtitle={NOTE_SUM_SUBTITLE} />
				</div>
				<div className="c-summary-content-note__form">
					<RqmtNoteForm notes={notes} onNoteChange={handleNoteChange} />
				</div>
			</div>
			<ProcessAction
				backLink={`/measurement/${msmtMethod.method}`}
				nextText="Find tailor"
				onNextClick={onConfirm}
			/>
		</div>
	);
}

export default SummaryContent;
