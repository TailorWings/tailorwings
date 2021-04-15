import React from 'react';
import PropTypes from 'prop-types';
import MediumButton from '../Button/MediumButton';
import { Link } from 'react-router-dom';

FabricContent.propTypes = {
	onSelectFabricOnline: PropTypes.func,
	onSendFabricOffline: PropTypes.func,
};

FabricContent.defaultProps = {
	onSelectFabricOnline: null,
	onSendFabricOffline: null,
};

function FabricContent(props) {
	const { onSelectFabricOnline, onSendFabricOffline } = props;

	return (
		<div className="c-fabric-popup-content">
			<div className="c-fabric-popup-content__title">
				<span>Do you have your favorite fabric?</span>
			</div>
			<div className="c-fabric-popup-content__subtitle">
				<p>
					If you have your own fabric, we will contact with you later to get your fabric and send to
					the tailor. Otherwise, you can select fabric collection of Tailor Wings.
				</p>
			</div>
			<div className="c-fabric-popup-content__button">
				<div
					className="c-fabric-popup-content__online"
					onClick={() => {
						onSelectFabricOnline();
					}}
				>
					<MediumButton text="I want select fabric" isActive={true} />
				</div>
				<div
					className="c-fabric-popup-content__offline"
					onClick={() => {
						onSendFabricOffline();
					}}
				>
					<MediumButton text="I have my own fabric" />
				</div>
			</div>
			<Link to="/requirement" className="c-fabric-popup-content__back">
				<span>Back</span>
			</Link>
		</div>
	);
}

export default FabricContent;
