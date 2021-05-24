import { Fragment } from 'react';

function TailorRoundTag({ text }) {
	if (!text) return <Fragment />;
	return (
		<div className="tailor-round-tag">
			<span>{text}</span>
		</div>
	);
}

export default TailorRoundTag;
