import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SmallButton from '../Button/SmallButton';

Menu.propTypes = {
	list: PropTypes.array,
	onItemClick: PropTypes.func,
};

Menu.defaultProps = {
	list: null,
	onItemClick: null,
};

function Menu(props) {
	const { list, onItemClick } = props;

	if (!list) return <Fragment />;
	return (
		<div className="c-menu">
			{list.map((list, index) => {
				return (
					<div
						key={index}
						onClick={onItemClick ? () => onItemClick(index) : null}
						className="c-menu__item"
					>
						<SmallButton text={list.name} isActive={list.active} />
					</div>
				);
			})}
		</div>
	);
}

export default Menu;
