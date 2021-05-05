import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import arrowDownLight from '../../assets/icons/arrow-down-light.svg';
import classNames from 'classnames';

Accordion.propTypes = {
	title: PropTypes.string,
	isActive: PropTypes.bool,
};

Accordion.defaultProps = {
	title: 'title',
	isActive: true
};

function Accordion(props) {
	const { title, isActive } = props;
	/*--------------*/
	const [active, setActive] = useState(isActive);
	const contentRef = useRef(null);

	useEffect(() => {
		contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px';
	}, [contentRef, active]);

	const toogleActive = () => {
		setActive(!active);
	};

	/*--------------*/

	return (
		<div className="c-accordion">
			<button className="c-accordion__header" onClick={toogleActive}>
				<span className="c-accordion__title">{title}</span>
				<img
					src={arrowDownLight}
					alt="arrow-icon"
					className={classNames('c-accordion__icon', { 'c-accordion__icon--rotate': active })}
				/>
			</button>
			<div ref={contentRef} className="c-accordion__content">
				{/* {children || <p>Loading...</p>} */}
				{props.children}
			</div>
		</div>
	);
}

export default Accordion;
