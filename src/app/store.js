import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import commonReducer from './ReduxSlices/commonSlice';
import adminReducer from './ReduxSlices/adminSlice';

const rootReducer = {
	common: commonReducer,
	admin: adminReducer,
};

const store = configureStore({
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
	reducer: rootReducer,
});

export default store;
