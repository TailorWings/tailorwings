import React, { useEffect, useState } from 'react';
import MediumButton from '../../components/Button/MediumButton';
import { fetchAll, setDocumentWithID } from '../../services/API/firebaseAPI';

function TestTailorDB() {
	/*------------------------------*/
	const [customers, setCustomers] = useState(null);
	const [orders, setOrders] = useState(null);
	useEffect(() => {
		fetchAll('customers')
			.then((result) => {
				if (result) {
					setCustomers(result);
				}
			})
			.catch((error) => {
				console.log(`error`, error);
			});
	}, []);

	useEffect(() => {
		if (customers) {
			let orders = customers.map((customer) => {
				let modifyOrder = customer?.orders?.map(order => {
					return {...order, customer: {
						id: customer.id,
						name: customer.displayName
					}}
				})
				return modifyOrder || [];
			});

			orders && setOrders(orders.flat(Infinity));
		}
	}, [customers]);

	function createTailorOrders() {
		if (orders) {
			let tailorOrders = orders.map((order) => {
				const {
					id,
					designFiles,
					designStyle,
					fabric,
					msmt,
					notes,
					stdSize,
					offers,
					status,
					customer,
					orderDate
				} = order;
				return {
					// id: uuidv4(),
					orderID: id,
					rqmt: {
						designFiles,
						designStyle,
						fabric,
						msmt,
						notes,
						stdSize,
					},
					pickedTailor: offers ? offers.find((offer) => offer.picked)?.tailor?.id || null : null,
					status,
					offers: offers ? [...offers] : null,
					customer,
					orderDate
				};
			});

			console.log('tailorOrders :>> ', tailorOrders);

			if (tailorOrders?.length > 0) {
				let promiseArray = tailorOrders.map((order) => {
					return setDocumentWithID('tailorOrders', order, order.id);
				});

				Promise.all(promiseArray)
					.then(() => {
						alert('Success');
					})
					.catch((error) => {
						alert('Error');
						console.log('error :>> ', error);
					});
			}
		}
	}

	/*------------------------------*/
	return (
		<div style={{ marginTop: '100px', padding: '0 20%' }} onClick={createTailorOrders}>
			<MediumButton text="Create Tailor Orders"></MediumButton>
		</div>
	);
}

export default TestTailorDB;
