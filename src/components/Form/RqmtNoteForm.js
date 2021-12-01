import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Input/TextInput';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

RqmtNoteForm.propTypes = {
	notes: PropTypes.array,
	onNoteChange: PropTypes.func,
	placeHolder: PropTypes.object,
};

RqmtNoteForm.defaultProps = {
	notes: null,
	onNoteChange: null,
	placeHolder: null,
};

function RqmtNoteForm(props) {
	const { notes, notesVN, onNoteChange, placeHolder } = props;
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';

	if (!notes) return <Fragment />;
	return (
		<div className="c-rqmt-note-form">
			{notes.map((note, index) => {
				return (
					<div key={index} className="c-rqmt-note-form__input">
						{onNoteChange ? (
							<TextInput
								label={`${t('summary.note')} ${index + 1}`}
								value={note}
								onChange={(e) => onNoteChange(e, index)}
								placeHolder={placeHolder ? placeHolder[i18n.language][index] : null}
							/>
						) : (
							<>
							<TextInput
								label={`${t('summary.note')} ${index + 1}`}
								value={note}
								// onChange={(e) => onNoteChange(e, index)}
								disabled
							/>
							<div className="c-rqmt-note-form__translate">{notesVN && notesVN[index] ? `(${notesVN[index]})`: ""}</div> 
							</>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default RqmtNoteForm;
