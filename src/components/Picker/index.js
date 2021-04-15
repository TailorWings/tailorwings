import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import SmallButton1 from '../Button/SmallButton1';

Picker.propTypes = {
	list: PropTypes.array,
	onItemClick: PropTypes.func,
};

Picker.defaultProps = {
	list: null,
	onItemClick: null,
};

function Picker(props) {
	const { list, onItemClick } = props;

	if (!list) return <Fragment />;
	return (
		<div className="c-picker">
			{list.map((item, index) => {
				return (
					<div
						key={index}
						onClick={onItemClick ? () => onItemClick(index) : null}
						className={`c-picker__item ${onItemClick ? '' : '--disabled'}`}
					>
						<SmallButton1 text={item.name} isActive={item.active} />
					</div>
				);
			})}
		</div>
	);
}

export default Picker;
