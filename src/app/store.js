import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import commonReducer from './ReduxSlices/commonSlice';

const rootReducer = {
	common: commonReducer,
};

const store = configureStore({
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
	reducer: rootReducer,
});

export default store;
