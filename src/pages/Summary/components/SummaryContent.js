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
	SHIPPING_INFO,
} from '../../../constants';
import {
	fetchAll,
	fileUpload,
	setDocumentWithID,
	updateDocument,
} from '../../../services/API/firebaseAPI';
import OfflineMeasurement from './OfflineMeasurement';
import OnlineMeasurement from './OnlineMeasurement';
import StandardSizeMeasurement from './StandardSizeMeasurement';
import moment from 'moment';
import { formatLink } from '../../../services/Functions/commonFunctions';
import { resetState, setOrderDetail, controlLogin } from '../../../app/ReduxSlices/commonSlice';
import { useHistory } from 'react-router';
import Popup from '../../../components/Popup';
import OrderConfirmContent from '../../../components/Popup/OrderConfirmContent';
import MaterialAlert from '../../../components/MaterialAlert';
import emailjs from 'emailjs-com';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

import ShippingForm from '../../../components/Form/ShippingForm';
import Accordion from '../../../components/Accordion';
import PaymentInfo from '../../../components/PaymentInfo';

import { removeWhiteSpace } from '../../../services/Functions/commonFunctions';

SummaryContent.propTypes = {
	msmtMethod: PropTypes.object,
};

SummaryContent.defaultProps = {
	msmtMethod: null,
};

// const TEST_ESTIMATE_SIZE_SUM = STANDARD_SIZES.map((size) => {
// 	return { name: size, active: size.toLowerCase() === 'm' };
// });

const NOTE_PLACEHOLDER = {
	en: [
		'Ex: I want the neck 5cm deeper in comparison to the model ...',
		'Ex: I want a comfortable fit, but not too loose',
		'Ex: My arm is quite big, I want to hide it',
		"Ex: Let's stitch a margin as big as possible just incase my body become bigger",
	],
	vn: [
		'Vd: Tôi muốn cổ sâu hơn 5cm so với mẫu ...',
		'Vd: Tôi muốn một bộ quần áo vừa vặn thoải mái nhưng không quá chật',
		'Vd: Cánh tay của tôi khá to, tôi muốn giấu nó đi',
		'Vd: Hãy khâu một lề càng lớn càng tốt để cơ thể tôi trở nên to hơn',
	],
};

function SummaryContent(props) {
	const history = useHistory();
	const { msmtMethod } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
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
	const [tailors, setTailors] = useState(null);
	const [shippingInfo, setShippingInfo] = useState(
		SHIPPING_INFO.map((info) => {
			return info;
		})
	);

	/*---------*/
	const [popupShow, setPopupShow] = useState(false);
	const [isConfirmLoading, setIsConfirmLoading] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState(false);
	const dispatch = useDispatch();
	/*--------------*/
	useEffect(() => {
		if (currentCustomer?.shippingInfo) {
			setShippingInfo(currentCustomer.shippingInfo);
		}
	}, [currentCustomer]);
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
							value: orderDetail.msmt[removeWhiteSpace(msmt.label)],
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
	useEffect(() => {
		async function fetchTailor() {
			let tailors = await fetchAll('tailors');
			if (tailors?.length > 0) {
				setTailors(tailors);
			}
		}
		fetchTailor();
	}, []);
	/*********************************
	 *  Description:
	 */

	function handleMeasurementInfoRender() {
		let renderComponent = <Fragment />;
		switch (msmtMethod.method) {
			case 'online':
				renderComponent = <OnlineMeasurement measurements={onlineMsmt} />;
				break;
			// case 'offline':
			// 	renderComponent = <OfflineMeasurement estimatedSize={TEST_ESTIMATE_SIZE_SUM} />;
			// 	break;
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
	 *  Description: on notes change
	 */
	function checkShippingInfoValid() {
		return shippingInfo.find((info) => info.isRequired && !info.value) == null;
	}
	function handleNextClick() {
		if (!checkShippingInfoValid()) {
			setAlertOpen(true);
			setAlertMessage('Please fill in shipping info');
			return;
		}
		if (currentCustomer) {
			setPopupShow(true);
		} else {
			const action_controlLogin = controlLogin(true);
			dispatch(action_controlLogin);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle form confirm
	 */
	function onConfirm(phoneNumber) {
		updateDocument('customers', currentCustomer.id, 'shippingInfo', shippingInfo);
		if (orderDetail) {
			setIsConfirmLoading(true);
			const { designStyle, fabric, msmt, stdSize } = orderDetail;
			let orderDetailId = uuidv4();
			let currentOrderDetail = {
				id: orderDetailId,
				status: 'finding',
				orderDate: moment().format('L'),
				receiveDate: null,
				finishDate: null,
				offers: [],
				shippingInfo,
				designFiles: [],
				designStyle,
				fabric: {
					...fabric,
					pattern: fabric.pattern
						? {
								id: fabric.pattern?.id || null,
								image: fabric.pattern?.image || null,
						  }
						: null,
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
						if (phoneNumber) {
							updateDocument('customers', currentCustomer.id, 'phoneNumber', phoneNumber);
						}
						/*--------------*/
						const {
							id,
							designFiles,
							designStyle,
							fabric,
							msmt,
							notes,
							stdSize,
							orderDate,
						} = currentOrderDetail;
						let newTailorOrder = {
							orderID: id,
							rqmt: {
								designFiles,
								designStyle,
								fabric,
								msmt,
								notes,
								stdSize,
							},
							pickedTailor: null,
							status: 'finding',
							offers: null,
							customer: {
								id: currentCustomer.id,
								name: currentCustomer.displayName,
								email: currentCustomer.email,
							},
							orderDate,
						};
						setDocumentWithID('tailorOrders', newTailorOrder);
						/*---------*/
						setIsConfirmLoading(false);
						const action_resetState = resetState();
						dispatch(action_resetState);
						/*---------*/
						sendMail();
						/*---------*/
						history.push(`/account/detail?id=${orderDetailId}`);
					})
					.catch((error) => {
						console.log(`error`, error);
						setAlertOpen(true);
						setAlertMessage('ORDER FAILED: Please try again!');
						setIsConfirmLoading(false);
					});
			}
		} else {
		}
	}
	function sendMail() {
		if (tailors?.length > 0) {
			let tailorEmail = tailors
				.reduce((acc, cur) => {
					return [...acc, cur.email.trim()];
				}, [])
				.join(',');
			if (tailorEmail) {
				emailjs
					.send(
						'service_gmail',
						'template_new_order',
						{ cusName: currentCustomer?.displayName || '', email: tailorEmail },
						'user_v3OrYsKqdHUnLHpgB4CgD'
					)
					.then(
						(result) => {
							console.log(result.text);
						},
						(error) => {
							console.log(error.text);
						}
					);
			} else {
				emailjs
					.send(
						'service_gmail',
						'template_new_order',
						{ cusName: currentCustomer?.displayName || '', email: 'cham@tailorwings.com' },
						'user_v3OrYsKqdHUnLHpgB4CgD'
					)
					.then(
						(result) => {
							console.log(result.text);
						},
						(error) => {
							console.log(error.text);
						}
					);
			}
		} else {
			emailjs
				.send(
					'service_gmail',
					'template_new_order',
					{ cusName: currentCustomer?.displayName || '', email: 'cham@tailorwings.com' },
					'user_v3OrYsKqdHUnLHpgB4CgD'
				)
				.then(
					(result) => {
						console.log(result.text);
					},
					(error) => {
						console.log(error.text);
					}
				);
		}
	}

	function handleShippingInfoChange(id, e) {
		let value = e.target.value;
		let updatedShippingInfo = shippingInfo.map((info) => {
			return { ...info, value: id === info.id ? value : info.value };
		});
		setShippingInfo(updatedShippingInfo);
	}

	/************_END_****************/
	if (!msmtMethod || !orderDetail) return <Fragment />;
	return (
		<div className="c-summary-content">
			<div className="c-summary-content-note">
				<div className="c-summary-content-note__title">
					<Title title={t('summary.title')} subtitle={t('summary.subTitle')} />
				</div>
				<div className="c-summary-content-note__form">
					<RqmtNoteForm
						notes={notes}
						onNoteChange={handleNoteChange}
						placeHolder={NOTE_PLACEHOLDER}
					/>
				</div>
			</div>
			<div className="c-summary-content__title">
				<Title title={t('summary.summary')} subtitle={t('summary.description')} />
			</div>
			<div className="c-summary-content__rqmt">
				<RequiremmentSummary
					designStyle={orderDetail.designStyle}
					designFiles={orderDetail.designFiles}
					fabricType={orderDetail.fabric.type}
					fabricPattern={orderDetail.fabric.pattern}
				/>
			</div>
			<div className="c-summary-content--mobile-custom">
				<div className="c-order-detail-shipping-info">
					<Accordion title={t('account.shippingInformation')} isActive={true}>
						<div className="c-order-detail-shipping-info__form">
							<ShippingForm
								shippingInfo={shippingInfo}
								onInputChange={handleShippingInfoChange}
								// disabled={currentOrderDetail.status !== 'finding'}
							/>
						</div>
						<div className="c-order-detail-shipping-info__payment">
							<PaymentInfo buttonText="Choose" />
						</div>
					</Accordion>
				</div>
				<div className="c-summary-content__msmt">{handleMeasurementInfoRender()}</div>
			</div>

			<ProcessAction
				backLink={`/measurement/${msmtMethod.method}`}
				nextText="Next"
				onNextClick={handleNextClick}
			/>
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content={alertMessage}
				serverity="error"
			/>
			<Popup show={popupShow} setPopupShow={setPopupShow}>
				<OrderConfirmContent
					setPopupShow={setPopupShow}
					onFindTailor={onConfirm}
					isPhoneRequired={!!!currentCustomer?.phoneNumber}
					isLoading={isConfirmLoading}
				/>
			</Popup>
		</div>
	);
}

export default SummaryContent;
