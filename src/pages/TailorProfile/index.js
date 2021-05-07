import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import BasicInfo from './components/BasicInfo';
import ProductList from './components/ProductList';
import SpecialityInfo from './components/SpecialityInfo';
import queryString from 'query-string';
import { fetchDocument } from '../../services/API/firebaseAPI';
import PageLoader from '../../components/PageLoader';

function TailorProfilePage() {
	const location = useLocation();
	const tailorID = queryString.parse(location.search);
	/*------------------------------*/
	const [currentTailor, setCurrentTailor] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	/*------------------------------*/
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);
	useEffect(() => {
		if (tailorID.id) {
			fetchDocument('tailors', tailorID.id)
				.then((result) => {
					if (result) {
						setCurrentTailor(result);
						setIsLoading(false);
					}
				})
				.catch((error) => {
					console.log(`error`, error);
				});
		}
	}, [tailorID.id]);
	/*------------------------------*/
	if (!tailorID.id) return <Redirect to="/" />;
	if (isLoading || !currentTailor) return <PageLoader />;
	/*------------------------------*/
	const { nickName, description, stars, exp, products, speciality, avatar } = currentTailor;
	/*------------------------------*/
	return (
		<div className="l-tailor-profile-page">
			<BasicInfo name={nickName} desc={description} stars={stars} exp={exp} avatar={avatar} />
			<SpecialityInfo speciality={speciality} />
			<ProductList productList={products}/>
		</div>
	);
}

export default TailorProfilePage;
