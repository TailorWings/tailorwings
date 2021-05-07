import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import './styles/main.scss';
import Footer from './components/Footer';
import TestForm from './pages/TestForm';
import TestDnDUpload from './pages/TestDnDUpload';
import { fetchAll } from './services/API/firebaseAPI';
import MultirowSwiper from './pages/TestMultiRow';
import TestExcel from './pages/TestExcel';

const HomePage = React.lazy(() => import('./pages/Home'));
const RequirementPage = React.lazy(() => import('./pages/Requirement'));
const FabricPage = React.lazy(() => import('./pages/Fabric'));
const MeasurementPage = React.lazy(() => import('./pages/Measurement'));
const SummaryPage = React.lazy(() => import('./pages/Summary'));
const AccountPage = React.lazy(() => import('./pages/Account'));
const AdminPage = React.lazy(() => import('./pages/Admin'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));
const TailorProfilePage = React.lazy(() => import('./pages/TailorProfile'));

function App() {
	const location = useLocation();
	return (
		<div className="App">
			<Suspense fallback={<PageLoader />}>
				<Navbar />
				<div className="content">
					<Switch>
						{/* HOME */}
						<Redirect from="/home" to="/" exact />
						<Route path="/" component={HomePage} exact />

						{/* REQUIREMENT */}
						<Route path="/requirement" component={RequirementPage} />

						{/* FABRIC */}
						<Route path="/fabric" component={FabricPage} />

						{/* MEASUREMENT */}
						<Redirect from="/measurement" to="/measurement/standard-size" exact />
						<Route path="/measurement" component={MeasurementPage} />

						{/* SUMMARY */}
						<Route path="/summary" component={SummaryPage} />

						{/* ACCOUNT */}
						<Redirect from="/account" to="/account/order" exact />
						<Route path="/account" component={AccountPage} />

						{/* ADMIN */}
						{/* <Redirect from="/account" to="/account/order" exact /> */}
						<Route path="/admin" component={AdminPage} />

						{/* TAILOR PROFILE */}
						<Route path="/tailor-profile" component={TailorProfilePage} />

						{/* TEST FORM */}
						<Route path="/test-form" component={() => <TestForm />} />

						{/* TEST DND */}
						<Route path="/test-dnd" component={() => <TestDnDUpload />} />

						{/* TEST SWIPER */}
						<Route path="/test-swiper" component={() => <MultirowSwiper />} />

						{/* TEST SWIPER */}
						<Route path="/test-excel" component={() => <TestExcel />} />

						{/* NOT FOUND */}
						<Route component={NotFoundPage} />
					</Switch>
				</div>
				{location.pathname === '/' && <Footer />}
			</Suspense>
		</div>
	);
}

export default App;
