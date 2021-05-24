import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MaterialAlert from '../../../components/MaterialAlert';
import { updateDocument } from '../../../services/API/firebaseAPI';
import TailorOrder from './TailorOrder';

function TailorTailoringOrders() {
	/*------------------------------*/
	const { pickedOrders } = useSelector((state) => state.tailor);
	const [ alertOpen, setAlertOpen ] = useState(false);
	const [ alertContent, setAlertContent ] = useState({
		content: '',
		serverity: ''
	});
	/*------------------------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	/*------------------------------*/
    function onTailorDone(orderID) {
		if (orderID) {
			updateDocument('tailorOrders', orderID, 'isTailored', true).then(() => {
				setAlertOpen(true);
				setAlertContent({
					content: "Thành công!",
					serverity: 'success'
				})
			}).catch((error) => {
				setAlertContent({
					content: "Lỗi, vui lòng thử lại!",
					serverity: 'error'
				})
			})
		}
    }
    /*------------------------------*/
	return (
		<div className="tailor-finding-orders" style={{ width: '100%' }}>
			{pickedOrders.map((order) => {
				return (
					<div key={order.id}>
						<TailorOrder order={order} onTailorDone={onTailorDone} type="t"/>
					</div>
				);
			})}
			<MaterialAlert
				open={alertOpen}
				setOpen={setAlertOpen}
				content={alertContent?.content || ''}
				serverity={alertContent?.serverity || 'success'}
			/>
		</div>
	);
}

export default TailorTailoringOrders;
