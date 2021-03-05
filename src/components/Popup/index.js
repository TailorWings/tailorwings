import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

Popup.propTypes = {
	show: PropTypes.bool,
	setPopupShow: PropTypes.func,
};

Popup.defaultProps = {
	show: false,
	setPopupShow: null,
};

function Popup(props) {
	const { show, setPopupShow, onConfirm } = props;

	/*********************************
	 *  Description: close popup when click on backdrop
	 */
	function onBackdropClick(e) {
		let target = e.target ? e.target.className : null;
		if (target === 'c-popup__content') {
			setPopupShow(false);
		}
	}
	/************_END_****************/
	return (
		<div
			className={classNames('c-popup', { 'c-popup--show': show })}
			onClick={onBackdropClick && onBackdropClick}
		>
			<div className="c-popup__content">{props.children}</div>
		</div>
	);
}

export default Popup;
