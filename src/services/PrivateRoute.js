import { Redirect, Route } from 'react-router';

function PrivateRoute(props) {
	/*------------------------------*/
	if (!props.checkedElem) {
		return <Redirect to={props.redirectTo} />;
	}
	/*------------------------------*/
	return <Route {...props} />;
}

export default PrivateRoute;