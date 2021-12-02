import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TailorOrder from './TailorOrder';

function TailorFindingOrders() {
	/*------------------------------*/
	const { findingOrders, tailor } = useSelector((state) => state.tailor);
	/*------------------------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const findingOrdersSort = [...(findingOrders || [])];
	findingOrdersSort.sort(function (x, y) {
		return y.timestamp - x.timestamp;
	});

	/*------------------------------*/
	return (
		<div className="tailor-finding-orders" style={{ width: '100%' }}>
			{findingOrdersSort.map((order) => {
				return (
					<div key={order.id}>
						<TailorOrder order={order} tailor={tailor} type="f" />
					</div>
				);
			})}
		</div>
	);
}

export default TailorFindingOrders;
