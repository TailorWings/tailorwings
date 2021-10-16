import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import MediumButton from '../../../components/Button/MediumButton';
import SmallButton2 from '../../../components/Button/SmallButton2';
import ListLoader from '../../../components/ComponentLoader';
import firebase from 'firebase/app';
import { deleteDocument } from '../../../services/API/firebaseAPI';

function PatternManage({ patterns }) {
	const [open, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);

	const handleClickOpen = (clickedIndex) => {
		setOpen(true);
		setCurrentIndex(clickedIndex);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleAgree() {
		let imageDeleteRefs = [];
		let deletedPattern = patterns[currentIndex];
		if (deletedPattern?.image?.list) {
			deletedPattern.image.list.forEach((link) => {
				let fileName = link.split('?')[0];
				fileName = fileName?.split('/')?.pop()?.trim();
				fileName = fileName?.replace(/%20/g, ' ').replace(/%2F/g, '/').trim();

				if (fileName) {
					var imgRef = firebase.storage().ref().child(fileName);
					imageDeleteRefs.push(imgRef);
				}
			});
			deleteDocument('patterns', deletedPattern.id)
				.then(() => {
					if (imageDeleteRefs?.length > 0) {
						Promise.all(imageDeleteRefs.map((ref) => ref.delete()))
							.then(() => {
								alert('Success');
								setOpen(false);
							})
							.catch(() => {
								alert('Fail!');
								setOpen(false);
							});
					}
				})
				.catch(() => {
					alert('Fail!');
					setOpen(false);
				});
		} else if (deletedPattern?.image?.normal) {
			let fileName = deletedPattern.image.normal.split('?')[0];
			fileName = fileName?.split('/')?.pop()?.trim();
			fileName = fileName?.replace(/%20/g, ' ').replace(/%2F/g, '/').trim();
			let deletedRef = '';
			if (fileName) {
				deletedRef = firebase.storage().ref().child(fileName);
			}
			deleteDocument('patterns', deletedPattern.id)
				.then(() => {
					if (deletedRef) {
						deletedRef
							.delete()
							.then(() => {
								alert('Success');
								setOpen(false);
							})
							.catch(() => {
								alert('Fail!');
								setOpen(false);
							});
					}
				})
				.catch(() => {
					alert('Fail!');
					setOpen(false);
				});
		}
	}
	/*------------------------------*/
	const useStyles = makeStyles({
		root: {
			width: '80%',
			margin: '0 auto',
		},
		container: {
			maxHeight: 400,
		},
	});
	const classes = useStyles();
	/*------------------------------*/
	if (!patterns) return <ListLoader />;
	return (
		<div className="admin-pattern-mgmt">
			<h2>Pattern Management</h2>
			<div className="admin-pattern-mgmt__table">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="center">ID</TableCell>
									<TableCell align="center">Image</TableCell>
									<TableCell align="center">Name</TableCell>
									<TableCell align="center">Price</TableCell>
									<TableCell align="center">Type</TableCell>
									<TableCell align="center">Collection</TableCell>
									<TableCell align="center">Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{patterns?.length > 0 ? (
									patterns.map((pattern, index) => (
										<TableRow key={index}>
											<TableCell align="center">{pattern.id}</TableCell>
											<TableCell align="center">
												<div className="image-wraper">
													<img src={pattern?.image?.normal} alt="pattern" />
												</div>
											</TableCell>
											<TableCell align="center">{pattern.name}</TableCell>
											<TableCell align="center">{pattern.price}</TableCell>
											<TableCell align="center">{pattern.idFabricType}</TableCell>
											<TableCell align="center">{pattern.idPatternCollection}</TableCell>
											<TableCell align="center">
												<div className="-delete-btn" onClick={() => handleClickOpen(index)}>
													<MediumButton text="Delete" />
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>
											<p style={{ textAlign: 'center' }}>No order</p>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Do you really want delete this pattern?'}
				</DialogTitle>
				{/* 				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
					</DialogContentText>
				</DialogContent> */}
				<DialogActions>
					<div onClick={handleClose}>
						<SmallButton2 text="Disagree" />
					</div>
					<div onClick={handleAgree}>
						<SmallButton2 text="Agree" isActive />
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default PatternManage;
