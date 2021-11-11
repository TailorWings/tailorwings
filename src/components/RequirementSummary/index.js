import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallButton1 from '../Button/SmallButton1';
import { FABRIC_TYPES } from '../../constants';
import {find} from 'lodash'
import { useSelector } from 'react-redux';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

RequiremmentSummary.propTypes = {
	designStyle: PropTypes.string,
	designFiles: PropTypes.array,
	fabricType: PropTypes.string,
	fabricPattern: PropTypes.object,
};

RequiremmentSummary.defaultProps = {
	designStyle: null,
	designFiles: null,
	fabricType: null,
	fabricPattern: null,
};

function RequiremmentSummary(props) {
	const { designStyle, designFiles, fabricType, fabricPattern } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	const stylesOfClothe = useSelector((state) => state.common.stylesOfClothe);
	const getStyleOfClothe = (id) => {
		return find(stylesOfClothe, {id: id})
	}

	if (!designStyle || !designFiles) return <Fragment />;
	const styleOfClothe = getStyleOfClothe(designStyle)
	const styleOfClotheName = isENG ? styleOfClothe.name : styleOfClothe.nameVN

	return (
		<div className="c-rqmt-sum">
			<div className="c-rqmt-sum__style">
				<SmallButton1 text={styleOfClotheName} isActive={true} />
			</div>
			<div className="c-rqmt-sum-product">
				{designFiles.map((file, index) => {
					if (index < 3) {
						return (
							<div key={index} className="c-rqmt-sum-product__image">
								{file && <img src={file.preview || file} alt="product" />}
							</div>
						);
					} else {
						return <Fragment key={index} />;
					}
				})}
			</div>
			<div className="c-rqmt-sum-fabric">
				{fabricType && (
					<div className="c-rqmt-sum-fabric__image">
						<img
							src={FABRIC_TYPES.find((type) => type.id === fabricType)?.image || ''}
							alt="fabric-type"
						/>

						<div className="-overlay"></div>
						<span>{FABRIC_TYPES.find((type) => type.id === fabricType)?.name || ''}</span>
					</div>
				)}
				{fabricPattern && (
					<div className="c-rqmt-sum-fabric__image">
						<img src={fabricPattern.image.normal} alt="fabric-pattern" />
					</div>
				)}
			</div>
		</div>
	);
}

export default RequiremmentSummary;
