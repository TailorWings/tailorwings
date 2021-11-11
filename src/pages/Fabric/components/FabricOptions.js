import React from 'react';
import PropTypes from 'prop-types';
import icFabricBuy from '../../../assets/icons/ic_fabric_buy.png';
import icFabricNoBuy from '../../../assets/icons/ic_fabric_no_buy.png';
import { FABRIC_BUY_TYPES } from '../../../constants';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

FabricOptions.propTypes = {
	setType: PropTypes.func,
	type: PropTypes.string,
};

FabricOptions.defaultProps = {
	type: FABRIC_BUY_TYPES[0].id,
};

function FabricOptions(props) {
	const { type, setType } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	return (
		<div className="c-fabric-options">
			<div className="c-fabric-options__title">
				<span>{t('fabric.title')}</span>
			</div>
			<div className="c-fabric-options__options">
				{FABRIC_BUY_TYPES.map((item) => (
					<div
						className={`c-fabric-options__option ${type == item.id && '--active'}`}
						onClick={() => {
							setType && setType(item.id);
						}}
					>
                        <img src={type == item.id ? icFabricBuy : icFabricNoBuy} />
						<span>{ isENG ? item.title : item.titleVN}</span>
						<p>{ isENG ? item.description : item.descriptionVN}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default FabricOptions;
