import React from 'react';
import orangeGallery from '../../../assets/icons/orange-gallery.svg';

function ProductList({ productList }) {
	console.log('productList :>> ', productList);
	return (
		<div className="c-tailor-profile-products">
			<div className="container">
				<h3>Tailored clothes</h3>
				<div className="c-tailor-profile-products__list">
					{productList &&
						productList.map((product, i) => {
							return (
								<div key={i} className="c-tailor-profile-products__item">
									<img src={product} alt="" />
								</div>
							);
						})}
					{/* <div className="c-tailor-profile-products__item"></div>
					<div className="c-tailor-profile-products__item"></div>
					<div className="c-tailor-profile-products__item"></div>
					<div className="c-tailor-profile-products__item"></div>
					<div className="c-tailor-profile-products__item"></div>
					<div className="c-tailor-profile-products__item"></div> */}
				</div>
				<div className="c-tailor-profile-products__view-all">
					<i>
						<img src={orangeGallery} alt="gallery-icon" />
					</i>
					<span>View All</span>
				</div>
			</div>
		</div>
	);
}

export default ProductList;
