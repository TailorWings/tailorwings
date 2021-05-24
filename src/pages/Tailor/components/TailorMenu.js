import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import cartIcon from '../../../assets/icons/cart-white.svg';
import personIcon from '../../../assets/icons/person-white.svg';
import Navbar from '../../../components/Navbar';

function TailorMenu() {
    /*------------------------------*/
    const {url} = useRouteMatch();
	const {tailor} = useSelector(state => state.tailor)
    /*------------------------------*/
	return (
		<div className="tailor-menu-page">
			<Navbar type="tailor" />
			<div className="tailor-menu-page__header">
				<p>Welcom to Tailor Wings Dashboard</p>
			</div>
			<div className="tailor-menu-page__list">
				<Link to={`${url}/manage`} className="tailor-menu-page__item">
					<i>
						<img src={cartIcon} alt="cart-icon" />
					</i>
					<p>Xử lý đơn hàng</p>
				</Link>
				<Link to={`/tailor-profile?id=${tailor?.id}`} className="tailor-menu-page__item">
					<i>
						<img src={personIcon} alt="person-icon" />
					</i>
					<p>Thông tin cá nhân</p>
				</Link>
			</div>
		</div>
	);
}

export default TailorMenu;
