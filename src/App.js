import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import logo from './assets/images/logo.svg';
import './styles/main.scss';
import Footer from './components/Footer';

const HomePage = React.lazy(() => import('./pages/Home'));
const RequirementPage = React.lazy(() => import('./pages/Requirement'));
const FabricPage = React.lazy(() => import('./pages/Fabric'));
const MeasurementPage = React.lazy(() => import('./pages/Measurement'));
const SummaryPage = React.lazy(() => import('./pages/Summary'));
const AccountPage = React.lazy(() => import('./pages/Account'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<div className="App">
			<Suspense fallback={<PageLoader />}>
				<Navbar logo={logo} isLogin={true} />
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
						<Redirect from="/measurement" to="/measurement/online" exact />
						<Route path="/measurement" component={MeasurementPage} />

						{/* SUMMARY */}
						<Route path="/summary" component={SummaryPage} />

						{/* ACCOUNT */}
						<Redirect from="/account" to="/account/order" exact />
						<Route path="/account" component={AccountPage} />

						{/* NOT FOUND */}
						<Route component={NotFoundPage} />
					</Switch>
				</div>

				<Footer />
			</Suspense>
		</div>
	);
}

export default App;
