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
				<span>Do you have your own fabric?</span>
			</div>
			<div className="c-fabric-popup-content__options">
				<div
					className="c-fabric-popup-content__option"
					onClick={() => {
						onSelectFabricOnline();
					}}
				>
					<span>No, I don't</span>
					<p>You can select a lot of available fabric in next step</p>
				</div>
				<div
					className="c-fabric-popup-content__option"
					onClick={() => {
						onSendFabricOffline();
					}}
				>
					<span>Yes, I have</span>
					<p>We will contact to pick up your fabric after you place the order</p>
				</div>
			</div>
		</div>
	);
}

export default FabricContent;
