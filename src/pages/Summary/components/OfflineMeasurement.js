import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../components/Menu';
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
				<p className="c-offline-measurement__title">Measured by TailorWings's tailor</p>
				<p className="c-offline-measurement__subtitle">
					We have sent you an appointment schedule notice please follow up.
				</p>
			</div>
			<div className="c-offline-measurement__desc">
				Your regular size, which is used only to assist in calculating product prices. Not used to
				tailor products.
			</div>
			<div className="c-offline-measurement__size">
				<Menu list={estimatedSize} />
			</div>
		</div>
	);
}

export default OfflineMeasurement;
