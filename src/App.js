import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import TestExcel from './pages/TestExcel';
import TestForm from './pages/TestForm';
import TestTailorDB from './pages/TestTailorDB';
import './styles/main.scss';

const HomePage = React.lazy(() => import('./pages/Home'));
const RequirementPage = React.lazy(() => import('./pages/Requirement'));
const FabricPage = React.lazy(() => import('./pages/Fabric'));
const MeasurementPage = React.lazy(() => import('./pages/Measurement'));
const SummaryPage = React.lazy(() => import('./pages/Summary'));
const AccountPage = React.lazy(() => import('./pages/Account'));
const AdminPage = React.lazy(() => import('./pages/Admin'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));
const TailorProfilePage = React.lazy(() => import('./pages/TailorProfile'));
const TailorDashBoard = React.lazy(() => import('./pages/Tailor'));

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

						{/* TAILOR PROFILE */}
						<Route path="/tailor-profile" component={TailorProfilePage} />

						{/* ADMIN */}
						{/* <Redirect from="/account" to="/account/order" exact /> */}
						<Route path="/admin" component={AdminPage} />

						{/* TAILOR DASHBOARD */}
						<Route path="/tailor" component={TailorDashBoard} />

						{/* TEST FORM */}
						{/* <Route path="/test-form" component={() => <TestForm />} /> */}

						{/* TEST SWIPER */}
						<Route path="/test-excel" component={() => <TestExcel />} />

						{/* TEST SWIPER */}
						<Route path="/test-tailor" component={() => <TestTailorDB />} />

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
