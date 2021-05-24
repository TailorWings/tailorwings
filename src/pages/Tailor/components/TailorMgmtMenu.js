import { Link, useRouteMatch } from 'react-router-dom';
import greaterYellowIcon from '../../../assets/icons/greater-yellow.svg'

function TailorMgmtMenu() {
    /*------------------------------*/
    const { url } = useRouteMatch();
    /*------------------------------*/
    return (
        <div className="tailor-mgmt-menu">
            <Link to={`${url}/finding`} className="tailor-mgmt-menu__item">
                <div className="wrapper">
                    <span>Đơn đợi báo giá</span>
                    <i>
                        <img src={greaterYellowIcon} alt="icon" />
                    </i>
                </div>
            </Link>
            <Link to={`${url}/tailoring`} className="tailor-mgmt-menu__item">
                <div className="wrapper">
                    <span>Đơn đang may</span>
                    <i>
                        <img src={greaterYellowIcon} alt="icon" />
                    </i>
                </div>
            </Link>
            <Link to={`${url}/finish`} className="tailor-mgmt-menu__item">
                <div className="wrapper">
                    <span>Đơn đã hoàn thành</span>
                    <i>
                        <img src={greaterYellowIcon} alt="icon" />
                    </i>
                </div>
            </Link>
        </div>
    );
}

export default TailorMgmtMenu;