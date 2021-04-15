import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { setOrderDetail, setPatterns } from '../../app/ReduxSlices/commonSlice';
import MaterialAlert from '../../components/MaterialAlert';
import Popup from '../../components/Popup';
import FabricContent from '../../components/Popup/FabricContent';
import { FABRIC_TYPES, PATTERN_COLLECTIONS } from '../../constants';
import { fetchAll } from '../../services/API/firebaseAPI';
import FabricPattern from './components/FabricPattern';
import FabricType from './components/FabricType';

function FabricPage() {
	/*--------------*/
	const currentCustomer = useSelector((state) => state.common.currentCustomer);
	const orderDetail = useSelector((state) => state.common.orderDetail);
	const patterns = useSelector((state) => state.common.patterns);
	const dispatch = useDispatch();
	const history = useHistory();

	/*--------------*/
	const [alertOpen, setAlertOpen] = useState(false);
	const [popupShow, setPopupShow] = useState(
		orderDetail?.fabric ? !!!orderDetail.fabric?.isOnline : true
	);
	/*--------------*/
	const [fabricType, setFabricType] = useState(
		FABRIC_TYPES.map((type) => {
			return { ...type, active: false };
		})
	);
	const [patternCollection, setPatternCollection] = useState(
		PATTERN_COLLECTIONS.map((collection, index) => {
			return { ...collection, active: index === 0 };
		})
	);
	const [renderPatterns, setRenderPatterns] = useState(null);
	/*--------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	useEffect(() => {
		if (!patterns) {
			fetchAll('testPatterns').then((result) => {
				const action_setPatterns = setPatterns(result);
				dispatch(action_setPatterns);
			});
		}
	}, [patterns, dispatch]);
	useEffect(() => {
		if (patterns) {
			if (!orderDetail?.fabric.type) {
				setRenderPatterns([...patterns]);
			} else {
				let initilRenderPatterns = patterns.map((pattern) => {
					return { ...pattern, active: false };
				});
				let firstPattern = { ...initilRenderPatterns[0] };
				let selectedPatternIndex =
					initilRenderPatterns.findIndex((pattern) => {
						return pattern.id === orderDetail.fabric.pattern;
					}) || null;
				if (selectedPatternIndex && selectedPatternIndex > 0) {
					initilRenderPatterns[0] = { ...initilRenderPatterns[selectedPatternIndex], active: true };
					initilRenderPatterns[selectedPatternIndex] = { ...firstPattern };
				}
				setRenderPatterns(initilRenderPatterns);
				/*--------------*/

				setFabricType(
					fabricType.map((type) => {
						return { ...type, active: type.id === orderDetail.fabric.type };
					})
				);
			}
		}
	}, [orderDetail, patterns]);
	/*--------------*/
	// useEffect(() => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		behavior: 'smooth',
	// 	});
	// 	/*--------------*/
	// 	fetchAll('testPatterns').then((result) => {
	// 		setPatterns(result || null);
	// 		let selectedPatternId = orderDetail?.farbic?.pattern.id || null;
	// 		let initilRenderPatterns = result.map((pattern) => {
	// 			return {
	// 				...pattern,
	// 				active: selectedPatternId ? pattern.id === selectedPatternId : false,
	// 			};
	// 		});
	// 		if (initilRenderPatterns?.length > 0) {
	// 			if (orderDetail?.fabric.type) {
	// 				let firstPattern = initilRenderPatterns[0];
	// 				let selectedPatternIndex =
	// 					initilRenderPatterns.findIndex((pattern) => {
	// 						return pattern.active;
	// 					}) || null;
	// 				if (selectedPatternIndex) {
	// 					initilRenderPatterns[0] = { ...initilRenderPatterns[selectedPatternIndex] };
	// 					initilRenderPatterns[selectedPatternIndex] = { ...firstPattern };
	// 				}
	//
	// 				setRenderPatterns(initilRenderPatterns);
	// 				/*--------------*/
	// 				console.log(
	// 					'fabricType :>> ',
	// 					fabricType.map((type) => {
	// 						return { ...type, active: type.id === orderDetail.type.id };
	// 					})
	// 				);
	// 				setFabricType(
	// 					fabricType.map((type) => {
	// 						return { ...type, active: type.id === orderDetail.type.id };
	// 					})
	// 				);
	// 			} else {
	// 				setRenderPatterns(initilRenderPatterns);
	// 			}
	// 		}

	// 		// setRenderPatterns(result || null);
	// 	});
	// 	/*--------------*/
	// }, []);
	/*--------------*/
	/*********************************
	 *  Description: handle send fabric offline
	 */
	function onSendFabricOffline() {
		let updatedOrderDetail = { ...orderDetail };
		updatedOrderDetail.fabric = {
			isOnline: false,
		};
		const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
		dispatch(action_setOrderDetail);
		/*--------------*/
		history.push('/measurement/online');
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle send fabric online
	 */
	function onSelectFabricOnline() {
		let updatedOrderDetail = { ...orderDetail };
		updatedOrderDetail.fabric = {
			isOnline: true,
		};
		const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
		dispatch(action_setOrderDetail);
		/*--------------*/
		setPopupShow(false);
	}
	/************_END_****************/
	/*********************************
	 *  Description: update collection active status
	 */
	function handleCollectionStatus(updateIndex) {
		let newPatternCollectionStatus = patternCollection.map((collection, index) => {
			return { ...collection, active: index === updateIndex };
		});
		let newRenderPatterns = [];
		if (patternCollection[updateIndex].id !== 'all') {
			newRenderPatterns = patterns.filter((pattern) => {
				return pattern.idPatternCollection.includes(patternCollection[updateIndex].id);
			});
		} else {
			newRenderPatterns = [...patterns];
		}
		if (newPatternCollectionStatus) {
			setPatternCollection(newPatternCollectionStatus);
		}
		if (newRenderPatterns) {
			setRenderPatterns(null);
			setTimeout(() => {
				setRenderPatterns([...newRenderPatterns]);
			}, 500);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle pattern select
	 */
	function handlePatternSelect(updatedPatterns) {
		if (updatedPatterns) {
			setRenderPatterns(updatedPatterns);
		}
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle confirm
	 */
	function handleConfirm() {
		let selectedFabricType = fabricType.find((type) => {
			return type.active;
		});
		let selectedPattern = renderPatterns.find((pattern) => {
			return pattern.active;
		});

		if (selectedFabricType && selectedPattern) {
			/*--------------*/
			let updatedOrderDetail = {
				...orderDetail,
				fabric: {
					...orderDetail.fabric,
					price: selectedFabricType.price || 0,
					pattern: selectedPattern || null,
					type: selectedFabricType.id.toString() || null,
				},
			};
			const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
			dispatch(action_setOrderDetail);
			/*--------------*/
			history.push('/measurement');
		} else {
			setAlertOpen(true);
		}
	}
	/************_END_****************/
	if (!currentCustomer) return <Redirect to="/" />;
	return (
		<div className="l-fabric container">
			<FabricType fabricType={fabricType} setFabricType={setFabricType} />
			<FabricPattern
				collections={patternCollection}
				patterns={renderPatterns}
				onCollectionClick={handleCollectionStatus}
				onPatternClick={handlePatternSelect}
				onNextClick={handleConfirm}
			/>
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content="Please select fabric type and fabric pattern!"
				serverity="error"
			/>
			<Popup show={popupShow}>
				<FabricContent
					onSendFabricOffline={onSendFabricOffline}
					onSelectFabricOnline={onSelectFabricOnline}
				/>
			</Popup>
		</div>
	);
}

export default FabricPage;
