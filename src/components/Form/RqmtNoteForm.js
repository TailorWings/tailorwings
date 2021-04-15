import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Input/TextInput';

RqmtNoteForm.propTypes = {
	notes: PropTypes.array,
	onNoteChange: PropTypes.func,
};

RqmtNoteForm.defaultProps = {
	notes: null,
	onNoteChange: null,
};

function RqmtNoteForm(props) {
	const { notes, onNoteChange } = props;

	if (!notes) return <Fragment />;
	return (
		<div className="c-rqmt-note-form">
			{notes.map((note, index) => {
				return (
					<div key={index} className="c-rqmt-note-form__input">
						{onNoteChange ? (
							<TextInput
								label={`Note ${index + 1}`}
								value={note}
								onChange={(e) => onNoteChange(e, index)}
							/>
						) : (
							<TextInput
								label={`Note ${index + 1}`}
								value={note}
								// onChange={(e) => onNoteChange(e, index)}
								disabled
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default RqmtNoteForm;
