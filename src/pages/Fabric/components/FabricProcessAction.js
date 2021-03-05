import React from 'react';
import PropTypes from 'prop-types';
import ProcessAction from '../../../components/ProcessAction';

FabricProcessAction.propTypes = {};

function FabricProcessAction(props) {
	return (
		<div className="c-fabric-process-action">
			<ProcessAction backLink="/requirement" nextLink="/measurement" />
		</div>
	);
}

export default FabricProcessAction;
