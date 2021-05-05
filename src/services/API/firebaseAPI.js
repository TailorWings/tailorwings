import { database } from '../../firebase';
import { storage } from '../../firebase';
import firebase from 'firebase/app';

export const fetchAllRealTime = (collection, callback) => {
	database.collection(collection).onSnapshot((querySnapshot) => {
		let result = [];
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			// if (data.visibleStatus) {
			data.id = doc.id;
			result.push(data);
			// }
		});
		callback && callback(result);
	});
};

export const fetchAll = (collection) => {
	return database
		.collection(collection)
		.get()
		.then((querySnapshot) => {
			let result = [];
			querySnapshot.forEach((doc) => {
				let data = doc.data();
				data.id = doc.id;
				result.push(data);
			});
			return result;
		});
};

export const fetchDocumentRealtime = (collection, doc, callback) => {
	database
		.collection(collection)
		.doc(doc)
		.onSnapshot((doc) => {
			let data = { ...doc.data() };
			callback && callback(data);
		});
};

export const fetchDocument = (collection, doc) => {
	return database
		.collection(collection)
		.doc(doc)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return doc.data();
			} else {
				return null;
			}
		});
};

export const fetchVisible = (collection) => {
	return database
		.collection(collection)
		.where('visibleStatus', '==', true)
		.get()
		.then((querySnapshot) => {
			let result = [];
			querySnapshot.forEach((doc) => {
				let data = doc.data();
				data.id = doc.id;
				result.push(data);
			});
			return result;
		});
};

/*--------------*/

export const addDocument = (collection, newItem) => {
	database
		.collection(collection)
		.add(newItem)
		.then(function () {
			let isSuccess = true;
			return isSuccess;
		})
		.catch(function (error) {
			let isSuccess = false;
			return isSuccess;
		});
};

export const setDocument = (collection, newItem, docName) => {
	return database
		.collection(collection)
		.doc(docName)
		.set({
			...newItem,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.then(function () {
			let isSuccess = true;
			return isSuccess;
		})
		.catch(function (error) {
			let isSuccess = false;
			return isSuccess;
		});
};

export const updateDocument = (collection, docName, field, value) => {
	return database
		.collection(collection)
		.doc(docName)
		.update({
			[field]: value,
		})
		.then(function () {})
		.catch(function (error) {
			// The document probably doesn't exist.
		});
};

export const deleteDocument = (collection, docName) => {
	return database
		.collection(collection)
		.doc(docName)
		.delete()
		.then(() => {
			console.log('Document successfully deleted!');
		})
		.catch((error) => {
			console.error('Error removing document: ', error);
		});
};

// File upload
// Upload file and metadata to the object 'images/mountains.jpg'
export const fileUpload = (file, childRef) => {
	return new Promise((_resolve, _reject) => {
		var storageRef = storage.ref();
		var uploadTask = storageRef.child(childRef).put(file);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
						break;
					default:
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case 'storage/unauthorized':
						// User doesn't have permission to access the object
						break;
					case 'storage/canceled':
						// User canceled the upload
						break;

					// ...

					case 'storage/unknown':
						// Unknown error occurred, inspect error.serverResponse
						break;

					default:
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				uploadTask.snapshot.ref
					.getDownloadURL()
					.then((downloadURL) => {
						_resolve(downloadURL);
					})
					.catch((error) => {
						_reject(error);
					});
			}
		);
	});
};
