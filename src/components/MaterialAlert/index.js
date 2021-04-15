import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

MaterialAlert.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	serverity: PropTypes.string,
	content: PropTypes.string,
};

MaterialAlert.defaultProps = {
	open: false,
	setOpen: null,
	serverity: null,
	content: '',
};

function MaterialAlert(props) {
	const { open, setOpen, serverity, content } = props;
	/*--------------*/
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	/*--------------*/
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}
	/************_END_****************/
	if (!serverity || !setOpen) return <Fragment />;
	return (
		<div className="c-material-alert">
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity={serverity}>
					{content}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default MaterialAlert;
