import React from 'react';
import { Fragment } from 'react';

function TailorSquareTag({ title, value, isActive, titleVN = "" }) {
	if (!title) return <Fragment />;
	return (
		<div className={`tailor-square-tag ${isActive && '--active'}`}>
			<p>{title}</p>
			<span>{value}</span>
			{titleVN && <p>({titleVN})</p>}
		</div>
	);
}

export default TailorSquareTag;
