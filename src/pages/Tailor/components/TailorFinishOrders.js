import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TailorOrder from './TailorOrder';

function TailorTailoringOrders() {
	/*------------------------------*/
	const { pickedOrders } = useSelector((state) => state.tailor);
	const [finishOrders, setFinishOrders] = useState(null);

	/*------------------------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		if (pickedOrders) {
			let finishList = pickedOrders.filter((order) => order.status === 'finish');
			setFinishOrders(finishList);
		}
	}, [pickedOrders]);
	/*------------------------------*/
	return (
		<div className="tailor-finding-orders" style={{ width: '100%' }}>
			{finishOrders?.map((order) => {
				return (
					<div key={order.id}>
						<TailorOrder order={order} type="d" />
					</div>
				);
			})}
		</div>
	);
}

export default TailorTailoringOrders;
