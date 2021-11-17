import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import commonReducer from './ReduxSlices/commonSlice';
import adminReducer from './ReduxSlices/adminSlice';
import tailorReducer from './ReduxSlices/tailorSlice';
import throttle from 'lodash.throttle';

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch {
		// ignore write errors
	}
};
const persistedState = loadState();

const rootReducer = {
	common: commonReducer,
	admin: adminReducer,
	tailor: tailorReducer,
};

const store = configureStore({
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
	reducer: rootReducer,
	preloadedState: persistedState,
});
// store.subscribe(throttle(() => {
// 	saveState(store.getState());
//   }, 1000));

export default store;
