import React from 'react';
import { Fragment } from 'react';
import SmallButton2 from '../../../components/Button/SmallButton2';

function SpecialityInfo({ speciality }) {
	if (!speciality) return <Fragment />;
	return (
		<div className="c-tailor-profile-speciality">
			<div className="container">
				<h4>Specialities</h4>
				<div className="c-tailor-profile-speciality__list">
					{speciality.map((e, i) => {
						return (
							<div key={i} className="c-tailor-profile-speciality__item">
								<SmallButton2 text={e === 'aodai' ? 'Ao Dai' : e} />
							</div>
						);
					})}
					{/* <div className="c-tailor-profile-speciality__item">
						<SmallButton2 text="Đầm" />
					</div>
					<div className="c-tailor-profile-speciality__item">
						<SmallButton2 text="Áo dài" />
					</div>
					<div className="c-tailor-profile-speciality__item">
						<SmallButton2 text="Chân váy" />
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default SpecialityInfo;
