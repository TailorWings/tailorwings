import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactDom from 'react-dom';

Popup.propTypes = {
	show: PropTypes.bool,
	setPopupShow: PropTypes.func,
};

Popup.defaultProps = {
	show: false,
	setPopupShow: null,
};

function Popup(props) {
	const { show, setPopupShow } = props;

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
	return reactDom.createPortal(
		<div
			className={classNames('c-popup', { 'c-popup--show': show })}
			onClick={setPopupShow && onBackdropClick}
		>
			<div className="c-popup__content">{props.children}</div>
		</div>, document.querySelector('body')
	);
}

export default Popup;
