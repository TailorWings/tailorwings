import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Picker from '../../../components/Picker';
import Title from '../../../components/Title';

OfflineMeasurement.propTypes = {
	estimatedSize: PropTypes.array,
};

OfflineMeasurement.defaultProps = {
	estimatedSize: null,
};

function OfflineMeasurement(props) {
	const { estimatedSize } = props;
	if (!estimatedSize) return <Fragment />;
	return (
		<div className="c-offline-measurement">
			<div className="c-offline-measurement__header">
				<Title
					title="Measured by TailorWings's tailor"
					subtitle="We have sent you an appointment schedule notice please follow up."
					textStyle="smallLeft"
				/>
			</div>
			<div className="c-offline-measurement__desc">Your Estimated Size</div>
			<div className="c-offline-measurement__size">
				<Picker list={estimatedSize} />
			</div>
		</div>
	);
}

export default OfflineMeasurement;
