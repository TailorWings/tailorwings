import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
	name: 'common',
	initialState: {
		isLoginOpen: false,
		currentCustomer: null,
		orderDetail: {
			designFiles: [],
			designStyle: null,
			fabric: {
				isOnline: true,
				type: null,
				pattern: null,
				price: null,
			},
			msmt: null,
			stdSize: null,
		},
		patterns: null,
	},
	reducers: {
		controlLogin(state, action) {
			state.isLoginOpen = action.payload;
		},
		setCurrentCustomer(state, action) {
			if (action.payload) {
				state.currentCustomer = { ...action.payload };
			} else {
				state.currentCustomer = null;
			}
		},
		setOrderDetail(state, action) {
			state.orderDetail = action.payload ? { ...action.payload } : null;
		},
		setPatterns(state, action) {
			state.patterns = action.payload ? [...action.payload] : null;
		},
		resetState(state) {
			state.isLoginOpen = false;
			state.orderDetail = {
				designFiles: [],
				designStyle: null,
				fabric: {
					isOnline: true,
					type: null,
					pattern: null,
					price: null,
				},
				msmt: null,
				stdSize: null,
			};
			state.patterns = null;
		},
	},
});

const { actions, reducer } = commonSlice;
export const {
	controlLogin,
	setCurrentCustomer,
	setOrderDetail,
	setPatterns,
	resetState,
} = actions;
export default reducer;
