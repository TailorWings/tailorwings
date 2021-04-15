import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallButton1 from '../Button/SmallButton1';

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
	if (!designStyle || !designFiles) return <Fragment />;
	return (
		<div className="c-rqmt-sum">
			<div className="c-rqmt-sum__style">
				<SmallButton1 text={designStyle} isActive={true} />
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
				<div className="c-rqmt-sum-fabric__image">
					{fabricType?.image && <img src={fabricType.image} alt="fabric-type" />}
				</div>
				<div className="c-rqmt-sum-fabric__image">
					{fabricPattern && <img src={fabricPattern.image.mockup} alt="fabric-pattern" />}
				</div>
			</div>
		</div>
	);
}

export default RequiremmentSummary;
