import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { setOrderDetail, setPatterns } from '../../app/ReduxSlices/commonSlice';
import MaterialAlert from '../../components/MaterialAlert';
import Popup from '../../components/Popup';
import FabricContent from '../../components/Popup/FabricContent';
import ProcessAction from '../../components/ProcessAction';
import { FABRIC_TYPES, PATTERN_COLLECTIONS, STYLE_ESTIMATE_PRICE, FABRIC_BUY_TYPES } from '../../constants';
import { fetchAll } from '../../services/API/firebaseAPI';
import { estimatePriceCalc } from '../../services/Functions/commonFunctions';
import FabricOptions from './components/FabricOptions';
import FabricPattern from './components/FabricPattern';
import FabricType from './components/FabricType';

function FabricPage() {
	/*--------------*/
	const orderDetail = useSelector((state) => state.common.orderDetail);
	const patterns = useSelector((state) => state.common.patterns);
	const dispatch = useDispatch();
	const history = useHistory();

	/*--------------*/
	const [alertOpen, setAlertOpen] = useState(false);
	// const [popupShow, setPopupShow] = useState(
	// 	orderDetail?.fabric ? !!!orderDetail.fabric?.isOnline : true
	// );
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
	const [estPrice, setEstPrice] = useState('');
	const [fabricBuyType, setFabricBuyType] = useState(FABRIC_BUY_TYPES[0].id);
	const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
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
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	useEffect(() => {
		if (!patterns) {
			fetchAll('patterns').then((result) => {
				const action_setPatterns = setPatterns(result);
				dispatch(action_setPatterns);
			});
		}
	}, [patterns, dispatch]);
	useEffect(() => {
		if (patterns) {
			let initilRenderPatterns = patterns.map((pattern) => {
				return { ...pattern, active: false };
			});
			if (!orderDetail?.fabric?.type) {
				setRenderPatterns(initilRenderPatterns);
			} else {
				let firstPattern = { ...initilRenderPatterns[0] };
				let selectedPatternIndex = initilRenderPatterns.findIndex((pattern) => {
					return pattern.id === orderDetail.fabric.pattern.id;
				});
				if (selectedPatternIndex > -1) {
					// initilRenderPatterns[0] = { ...initilRenderPatterns[selectedPatternIndex], active: true };
					initilRenderPatterns[0] = { ...orderDetail?.fabric?.pattern };
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
	}, []);
	useEffect(() => {
		let selectedFabricType = fabricType?.find((type) => {
			return type.active;
		});
		let selectedPattern = renderPatterns?.find((pattern) => {
			return pattern.active;
		});

		if (selectedFabricType && selectedPattern) {
			setIsConfirmDisabled(false);
		} else if (!isConfirmDisabled) {
			setIsConfirmDisabled(true);
		}
	}, [fabricType, renderPatterns]);
	/*------------------------------*/
	// useEffect(() => {
	// handleCollectionStatus(0);
	/*------------------------------*/
	// let newRenderPatterns = patterns?.filter((pattern) =>
	// 	pattern?.idFabricType?.includes(fabricType?.find((type) => type?.active)?.id)
	// );
	// if (newRenderPatterns) {
	// 	setRenderPatterns(null);
	// 	setTimeout(() => {
	// 		setRenderPatterns(
	// 			newRenderPatterns.map((pattern) => {
	// 				return { ...pattern, active: false };
	// 			})
	// 		);
	// 	}, 500);
	// }
	// }, [patterns, fabricType]);
	/*------------------------------*/
	useEffect(() => {
		let currentFabricType = fabricType.find((type) => type.active);
		if (orderDetail.designStyle && currentFabricType) {
			let designEstimate = STYLE_ESTIMATE_PRICE.find(
				(price) => price.id === orderDetail.designStyle
			);
			if (designEstimate) {
				let currentEstPrice = estimatePriceCalc(
					designEstimate.estPrice,
					currentFabricType.price,
					designEstimate.fabricLength
				);
				setEstPrice(currentEstPrice);
			}
		}
	}, [fabricType]);
	/*********************************
	 *  Description: handle send fabric offline
	 */
	function onSendFabric(type) {
		let updatedOrderDetail = { ...orderDetail };
		updatedOrderDetail.fabric = {
			fabricBuyType: type,
		};
		const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
		dispatch(action_setOrderDetail);
		/*--------------*/
		history.push('/measurement/standard-size');
	}
	/************_END_****************/
	/*********************************
	 *  Description: handle fabric type set
	 */
	function onFabricTypeSet(thisFabricType) {
		/*------------------------------*/
		let newRenderPatterns = patterns?.filter((pattern) =>
			pattern.idFabricType?.includes(thisFabricType?.find((type) => type?.active)?.id)
		);
		if (newRenderPatterns) {
			setRenderPatterns(null);
			setTimeout(() => {
				setRenderPatterns(
					newRenderPatterns.map((pattern) => {
						return { ...pattern, active: false };
					})
				);
			}, 500);
		}
		/*------------------------------*/
		setFabricType(thisFabricType);
		// let widthScreen = window.innerWidth;
		// let patternSection = document.querySelector('.c-fabric-type .c-fabric-type__gallery');
		// if (widthScreen < 769) {
		// if (patternSection) {
		// 	window.scrollTo({
		// 		top: patternSection.offsetTop - 40,
		// 		behavior: 'smooth',
		// 	});
		// }
		// }
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
			if (fabricType.find((type) => type.active)) {
				newRenderPatterns = patterns.filter((pattern) => {
					return (
						pattern.idPatternCollection.includes(patternCollection[updateIndex].id) &&
						pattern.idFabricType.includes(fabricType.find((type) => type.active)?.id)
					);
				});
			} else {
				newRenderPatterns = patterns.filter((pattern) => {
					return pattern.idPatternCollection.includes(patternCollection[updateIndex].id);
				});
			}
		} else {
			let activeFabricType = fabricType.find((type) => type.active) || null;
			if (activeFabricType) {
				newRenderPatterns = patterns.filter((pattern) => {
					return pattern.idFabricType.includes(activeFabricType.id);
				});
			} else {
				newRenderPatterns = patterns ? [...patterns] : null;
			}
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
	function handlePatternSelect(updatedPatterns, clickedIndex) {
		console.log('updatedPatterns :>> ', updatedPatterns, clickedIndex);
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
					fabricBuyType: fabricBuyType, 
					price: selectedFabricType.price || 0,
					pattern: selectedPattern || null,
					type: selectedFabricType.id.toString() || null,
				},
			};
			const action_setOrderDetail = setOrderDetail(updatedOrderDetail);
			dispatch(action_setOrderDetail);
			/*--------------*/
			history.push('/measurement/standard-size');
		} else {
			setAlertOpen(true);
		}
	}
	/************_END_****************/
	if (!orderDetail.designStyle || !orderDetail.designFiles) return <Redirect to="/requirement" />;
	return (
		<div className="l-fabric container">
			<FabricOptions setType={setFabricBuyType} type={fabricBuyType} />
			{ fabricBuyType == FABRIC_BUY_TYPES[0].id && (
				<Fragment>
					<FabricType fabricType={fabricType} setFabricType={onFabricTypeSet} />
					{fabricType.find((type) => type.active) && (
						<FabricPattern
							collections={patternCollection}
							patterns={renderPatterns}
							onCollectionClick={handleCollectionStatus}
							onPatternClick={handlePatternSelect}
							onNextClick={handleConfirm}
							estPrice={estPrice}
							isConfirmDisabled={isConfirmDisabled}
						/>
					)}

					<MaterialAlert
						open={alertOpen}
						setOpen={setAlertOpen}
						content="Please select fabric type and fabric pattern!"
						serverity="error"
					/>
				</Fragment>
			)}
			{fabricBuyType != FABRIC_BUY_TYPES[0].id && (
				<div
					style={{
						display: 'block',
						marginTop: '10%',
					}}
				>
					<ProcessAction backLink="/requirement" onNextClick={() => onSendFabric(fabricBuyType)} />
				</div>
			)}

			{/* <Popup show={popupShow}>
				<FabricContent
					onSendFabricOffline={onSendFabricOffline}
					onSelectFabricOnline={onSelectFabricOnline}
				/>
			</Popup> */}
		</div>
	);
}

export default FabricPage;
