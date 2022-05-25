import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { FunctionComponent, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import icon from './icon.svg';
type IFile = {
	file: File;
	blobUrl: string;
}
type PhotoSelectProps = {
	onFileSelect?: (file: File) => void;
	onRemove?: () => void;
};

export const PhotoSelect: FunctionComponent<PhotoSelectProps> = (props: PhotoSelectProps) => {

	const [uploadFile, setUploadFile] = useState<IFile | null>(null);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg, image/gif',
		onDrop: (acceptedFiles) => {
			props.onFileSelect?.call(props, acceptedFiles[0]);
			setUploadFile(
				{
					file: acceptedFiles[0],
					blobUrl: URL.createObjectURL(acceptedFiles[0])
				}
			)
		},
	});
	useEffect(() => {
		if (uploadFile != null) {
			// Make sure to revoke the data uris to avoid memory leaks
			try {
				URL.revokeObjectURL(uploadFile!.blobUrl);
			} catch (error) {

			}
			props.onFileSelect?.call(props, uploadFile?.file);

		} else {
			props.onRemove?.call(props);
		}

	}, [uploadFile]);

	function remove(event: any) {
		setUploadFile(null);
	}
	return uploadFile == null ? <div className="cursor-pointer img-upload-container" {...getRootProps()}>
		<input {...getInputProps()} style={{ 'display': 'none' }} />
		<img className="icon" src={icon} />
	</div> :
		<div className="img-upload-container">
			<RemoveCircleIcon onClick={remove} fontSize="large" className="cursor-pointer ic-remove" />
			<img src={uploadFile.blobUrl} />
		</div>
}