import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		customers: null,
		tailors: null
	},
	reducers: {
		updateCustomers(state, action) {
			state.customers = action.payload;
		},
		updateTailors(state, action) {
			state.tailors = action.payload;
		},
	},
});

const { actions, reducer } = adminSlice;
export const { updateCustomers, updateTailors } = actions;
export default reducer;
