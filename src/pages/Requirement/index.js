import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { setOrderDetail } from '../../app/ReduxSlices/commonSlice';
import MaterialAlert from '../../components/MaterialAlert';
import { STYLES_OF_CLOTHE } from '../../constants';
import RqmtDesignStyle from './components/RqmtDesignStyle';
import RqmtDesignUpload from './components/RqmtDesignUpload';
import RqmtFooter from './components/RqmtFooter';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

function RequirementPage() {
	const history = useHistory();
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const orderDetail = useSelector((state) => state.common.orderDetail);
	const stylesOfClothe = useSelector((state) => state.common.stylesOfClothe);
	const fabricTypes = useSelector((state) => state.common.fabricTypes);
	const dispatch = useDispatch();
	/*--------------*/
	const [alertOpen, setAlertOpen] = useState(false);
	const [confirmDisable, setConfirmDisable] = useState(false);
	const [designFiles, setDesignFiles] = useState([]);
	const { t, i18n } = useTranslation();
	const [styles, setStyles] = useState(
		stylesOfClothe && stylesOfClothe.length
			? stylesOfClothe.map((style) => {
					return {
						id: style.id,
						name: i18n.language == 'en' ? style.name : style.nameVN,
						active: false,
					};
			  })
			: []
	);
	/*--------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		setStyles(
			stylesOfClothe && stylesOfClothe.length
				? stylesOfClothe.map((style) => {
						return {
							id: style.id,
							name: i18n.language == 'en' ? style.name : style.nameVN,
							active: false,
						};
				})
				: []
		);
	}, i18n.language);

	useEffect(() => {
		if (orderDetail) {
			/*--------------*/
			setStyles(
				styles.map((style) => {
					return { ...style, active: style.id === orderDetail.designStyle };
				})
			);
			setDesignFiles([...orderDetail.designFiles]);
		}
	}, [orderDetail]);
	useEffect(() => {
		if (designFiles?.length < 1 || !!!styles?.find((style) => style.active)) {
			console.log('here');
			setConfirmDisable(true);
		} else if (confirmDisable) {
			setConfirmDisable(false);
		}
	}, [designFiles, styles]);
	/*--------------*/
	const alertUser = (e) => {
		e.preventDefault();
		e.returnValue = '';
	};
	useEffect(() => {
		window.addEventListener('beforeunload', alertUser);
		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, []);
	/*********************************
	 *  Description: Handle styles click and change state of styles
	 */
	function handleStylesStatus(activeIndex) {
		let newStatus = styles.map((style, index) => {
			return { ...style, active: activeIndex === index };
		});

		if (newStatus) {
			setStyles(newStatus);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle 'Next' click
	 */
	function handleNextClick() {
		if (designFiles.length > 0 && !!styles.find((style) => style.active)) {
			/*--------------*/
			let updatedOrderDetail = { ...orderDetail };
			updatedOrderDetail.designStyle = styles.find((style) => style.active).id || null;
			updatedOrderDetail.designFiles = [...designFiles];
			/*--------------*/
			const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
			dispatch(action_setOrderDetail);
			/*--------------*/
			history.push('/fabric');
		} else {
			setAlertOpen(true);
		}
	}
	/************_END_****************/
	// if (!currentCustomer) return <Redirect to="/" />;
	return (
		<section className="l-requirement container">
			<RqmtDesignStyle styles={styles} onStyleClick={handleStylesStatus} />
			{styles?.find((style) => style.active) && (
				<>
					<RqmtDesignUpload setDesignFiles={setDesignFiles} />
					<RqmtFooter onNextClick={handleNextClick} disabled={confirmDisable} />
				</>
			)}
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content="Please select a style and upload at least an image of your design!"
				serverity="error"
			/>
		</section>
	);
}

export default RequirementPage;
