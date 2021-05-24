import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import commonReducer from './ReduxSlices/commonSlice';
import adminReducer from './ReduxSlices/adminSlice';
import tailorReducer from './ReduxSlices/tailorSlice';

const rootReducer = {
	common: commonReducer,
	admin: adminReducer,
	tailor: tailorReducer
};

const store = configureStore({
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
	reducer: rootReducer,
});

export default store;
