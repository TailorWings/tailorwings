import React from 'react';
import { Fragment } from 'react';

function TailorSquareTag({ title, value, isActive }) {
	if (!title) return <Fragment />;
	return (
		<div className={`tailor-square-tag ${isActive && '--active'}`}>
			<p>{title}</p>
			<span>{value}</span>
		</div>
	);
}

export default TailorSquareTag;
