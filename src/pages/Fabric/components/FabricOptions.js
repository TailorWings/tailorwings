import React from 'react';
import PropTypes from 'prop-types';

FabricOptions.propTypes = {
	setIsOnline: PropTypes.func,
    isOnline: PropTypes.bool
};

FabricOptions.defaultProps = {
	setIsOnline: null,
};

function FabricOptions(props) {
	const { isOnline, setIsOnline } = props;
	return (
		<div className="c-fabric-options">
			<div className="c-fabric-options__title">
				<span>Do you have your own fabric?</span>
			</div>
			<div className="c-fabric-options__options">
				<div
					className={`c-fabric-options__option ${isOnline && '--active'}`}
					onClick={() => {
						setIsOnline && setIsOnline(true)
					}}
				>
					<span>No, I don't</span>
					<p>You can select a lot of available fabrics below</p>
				</div>
				<div
					className={`c-fabric-options__option ${!isOnline && '--active'}`}
					onClick={() => {
						setIsOnline && setIsOnline(false)
					}}
				>
					<span>Yes, I have</span>
					<p>We will contact to pick up your fabric after you place the order</p>
				</div>
			</div>
		</div>
	);
}

export default FabricOptions;
