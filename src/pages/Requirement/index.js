import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { setOrderDetail } from '../../app/ReduxSlices/commonSlice';
import MaterialAlert from '../../components/MaterialAlert';
import { STYLES_OF_CLOTHE } from '../../constants';
import RqmtDesignStyle from './components/RqmtDesignStyle';
import RqmtDesignUpload from './components/RqmtDesignUpload';
import RqmtFooter from './components/RqmtFooter';

function RequirementPage() {
	const history = useHistory();
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const orderDetail = useSelector((state) => state.common.orderDetail);
	const dispatch = useDispatch();
	/*--------------*/
	const [alertOpen, setAlertOpen] = useState(false);
	const [designFiles, setDesignFiles] = useState([]);
	const [styles, setStyles] = useState(
		STYLES_OF_CLOTHE.map((style) => {
			return { name: style, active: false };
		})
	);
	/*--------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	useEffect(() => {
		if (orderDetail) {
			/*--------------*/
			setStyles(
				styles.map((style) => {
					return { ...style, active: style.name === orderDetail.designStyle };
				})
			);
			setDesignFiles([...orderDetail.designFiles]);
		}
	}, [orderDetail]);
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
			updatedOrderDetail.designStyle = styles.find((style) => style.active).name || null;
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
					<RqmtFooter onNextClick={handleNextClick} />
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
