import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../Button/SmallButton';

RequiremmentSummary.propTypes = {
	productStyle: PropTypes.string,
	productImages: PropTypes.array,
	fabricType: PropTypes.object,
	fabricPattern: PropTypes.string,
};

RequiremmentSummary.defaultProps = {
	productStyle: null,
	productImages: null,
	fabricType: null,
	fabricPattern: null,
};

function RequiremmentSummary(props) {
	const { productStyle, productImages, fabricType, fabricPattern } = props;

	if (!productStyle || !productImages) return <Fragment />;
	return (
		<div className="c-rqmt-sum">
			<SmallButton text={productStyle} isActive={true} />
			<div className="c-rqmt-sum-product">
				{productImages.map((image, index) => {
					return (
						<div key={index} className="c-rqmt-sum-product__image">
							{image && <img src={image} alt="product" />}
						</div>
					);
				})}
			</div>
			<div className="c-rqmt-sum-fabric">
				<div className="c-rqmt-sum-fabric__image">
					{fabricType && <img src={fabricType} alt="fabric-type" />}
				</div>
				<div className="c-rqmt-sum-fabric__image">
					{fabricPattern && <img src={fabricPattern} alt="fabric-pattern" />}
				</div>
			</div>
		</div>
	);
}

export default RequiremmentSummary;
