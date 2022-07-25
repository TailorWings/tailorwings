import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, useLocation, useRouteMatch } from 'react-router-dom';
// import { Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import SmallButton2 from '../../components/Button/SmallButton2';
import { NavFooter } from '../../components/Footer/NavFooter/NavFooter';
import MaterialAlert from '../../components/MaterialAlert';
import { MSMT_METHODS } from '../../constants';
import MeasurementContent from './components/MeasurementContent';
import MeasurementOptions from './components/MeasurementOptions';
import { BODY_METRICS, PRODUCT_METRICS } from './constants/measurement';

function MeasurementPage() {
	/*--------------*/
	const match = useRouteMatch();
	const location = useLocation();
	const subpage = location.pathname.split('/')[2];
	const [methods, setMethods] = useState(null);
	const orderDetail = useSelector((state) => (state as any).common.orderDetail);
	const { t } = useTranslation();
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	/*--------------*/
	const alertUser = (e: { preventDefault: () => void; returnValue: string; }) => {
		e.preventDefault();
		e.returnValue = '';
	};
	useEffect(() => {
		window.addEventListener('beforeunload', alertUser);
		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, []);
	/*--------------*/
	useEffect(() => {
		/*--------------*/
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		/*--------------*/
		let modifiedMethods = MSMT_METHODS.map((method) => {
			const link = method.link.toLowerCase().split('/')[1];
			return { ...method, active: link === subpage };
		});
		if (modifiedMethods) {
			setMethods(modifiedMethods as any);
		}
		/*--------------*/
	}, [subpage]);
	/*--------------*/
	/*********************************
	 *  Description: Handle method click and change status
	 */
	const validators: { [key: string]: () => boolean } = {};
	function nextClicked() {
		let isValid = false;
		// Object.values(validators).forEach(f => isValid = f() && isValid);
		if (isValid) {
			//
		} else {
			setTimeout(() => {
				setAlertMsg('There are some invalid metrics. Please check again.');
				setAlertOpen(true);
			},2000);
			
		}
	}
	function registerValidator(name: string, fn: () => boolean) {
		validators[name] = fn;
	}
	function handleMethodChange(changeIndex: any) {
		let newMethod = (methods as any).map((method: any, index: any) => {
			return { ...method, active: index === changeIndex };
		});
		if (newMethod) {
			setMethods(newMethod);
		}
	}
	function onSubmit(values: any) {
		console.log(values);
	}
	function smallButton(text: string, link: string) {
		return <SmallButton2 onClick={() => window.open(link, "_blank")} text={t(text)}></SmallButton2>;
	}
	/************_END_****************/
	// if (!currentCustomer) return <Redirect to="/" />;
	if (orderDetail.fabric.isOnline === null) return (<Redirect to="/requirement" />)
	return (
		<div>
			<div className='l-measurement-hint'>
				<span className='question'>{t('canTakeMeasurementsYourself')}</span>
				<div className='button-container'>
					<div>
						{smallButton('onlineAppointment', "http://m.me/TailorWings")}
					</div>
					<div className='btn-offline'>
						{smallButton('offlineAppointment', "https://calendly.com/tailorwings/15min")}
					</div>
				</div>

			</div>
			<div className="l-measurement">
				<MeasurementOptions match={match} methods={methods} onMethodClick={handleMethodChange} />
				<MeasurementContent match={match} />
			</div>
		</div>
	);
}

export default MeasurementPage;
