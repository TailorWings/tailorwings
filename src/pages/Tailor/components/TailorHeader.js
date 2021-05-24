import { useHistory } from 'react-router';
import arrowLeftIcon from '../../../assets/icons/arrow-left-white.svg'

function TailorHeader({ title }) {
	const history = useHistory();
	/*------------------------------*/
	return (
		<div className="tailor-header">
			<i onClick={() => history.goBack()}>
				<img src={arrowLeftIcon} alt="arrow-left" />
			</i>
			<p>{title}</p>
		</div>
	);
}

export default TailorHeader;
