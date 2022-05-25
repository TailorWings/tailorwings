import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClothesDesign, SideEnum } from '../models/clothes-design.model';
import { PhotoSelect } from './photo-select/photo-select';

const TOTAL_FILE_COUNT = 3;
const LABEL_SIDE_MAPPING: { [key: string]: SideEnum } = {
	'frontPhotos': SideEnum.front,
	'backPhotos': SideEnum.back,
	'sidePhotos': SideEnum.side,
	'otherPhotos': SideEnum.other
}

RqmtDesignUpload.propTypes = {
	setDesignFiles: PropTypes.func,
};

RqmtDesignUpload.defaultProps = {
	setDesignFiles: null,
};

function RqmtDesignUpload(props: { setDesignFiles: any; }) {
	const { setDesignFiles } = props;
	const { t } = useTranslation();
	const clothesDesignList: ClothesDesign[] = [];
	Object.keys(LABEL_SIDE_MAPPING).forEach(k => {
		clothesDesignList.push(
			{
				side: LABEL_SIDE_MAPPING[k],
				photoNotes: Array.from(Array(TOTAL_FILE_COUNT)).fill(null)
			}
		)
	});
	const [designListState, setDesignListState] = useState(clothesDesignList);

	useEffect(() => {
		setDesignFiles([...designListState]);
	}, [designListState]);

	function getClothesDesign(side: SideEnum) {
		var clothesDesign = designListState.find(cl => cl.side == side)!;
		clothesDesign.photoNotes = clothesDesign.photoNotes ?? [];
		return clothesDesign;
	}
	function onFileSelect(file: File, side: SideEnum, index: number) {
		var clothesDesign = getClothesDesign(side);
		var photoNote = clothesDesign.photoNotes![index];
		if (photoNote == null) {
			photoNote = {
				file: file,
				note: ''
			};
			clothesDesign.photoNotes![index] = photoNote;
		} else {
			photoNote.file = file;
		}
		setDesignListState([...designListState]);
		// setDesignFiles(designListState);
	}
	function onFileRemove(side: SideEnum, index: number) {
		let clothesDesign = getClothesDesign(side);
		clothesDesign.photoNotes?.splice(index, 1, null);
		setDesignListState([...designListState]);
	}
	function onNoteChange(note: string, side: SideEnum, index: number) {
		var clothesDesign = getClothesDesign(side);
		var photoNote = clothesDesign.photoNotes![index]!;
		photoNote.note = note;
		setDesignListState([...designListState])
	}
	function isPhotoExisted(side: SideEnum, index: number) {
		return designListState.find(cl => cl.side == side)?.photoNotes?.at(index) != null;
	}

	if (!setDesignFiles) return <Fragment />;
	return (
		<div className="c-rqmt-design-upload">
			<p>{t('requirement.description') as ReactNode}</p>
			<Grid container spacing={5}>
				{Object.keys(LABEL_SIDE_MAPPING).map((label: string) => (
					<Grid key={label} container item direction='column' md={6}>
						<div style={{ 'marginBottom': '16px' }}>{t(label)}</div>
						<Grid container wrap='nowrap' spacing={1}>
							{Array.from(Array(TOTAL_FILE_COUNT).keys()).map((index) => (
								<Grid key={index} item container direction='column'>
									<div style={{ 'width': '100%' }}>
										<PhotoSelect 
										onFileSelect={(file: File) => onFileSelect(file, LABEL_SIDE_MAPPING[label], index)}
										onRemove={() => onFileRemove(LABEL_SIDE_MAPPING[label], index)}
										></PhotoSelect>
									</div>
									{isPhotoExisted(LABEL_SIDE_MAPPING[label], index) ? <textarea onChange={(event) => onNoteChange(event.target.value, LABEL_SIDE_MAPPING[label], index)} rows={5} className='write-note' placeholder={t('writeNoteHere')}></textarea>
									: <Fragment/>}
								</Grid>
							))}
						</Grid>
					</Grid>
				))
				}

			</Grid>

			{/* <MultipleFileUpload setFiles={setDesignFiles} /> */}
		</div>
	);
}

export default RqmtDesignUpload;
