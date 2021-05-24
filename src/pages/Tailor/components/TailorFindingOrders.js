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
	/*------------------------------*/
	return (
		<div className="tailor-finding-orders" style={{ width: '100%' }}>
			{findingOrders.map((order) => {
				return (
					<div key={order.id}>
						<TailorOrder order={order} tailor={tailor} type="f"/>
					</div>
				);
			})}
		</div>
	);
}

export default TailorFindingOrders;
