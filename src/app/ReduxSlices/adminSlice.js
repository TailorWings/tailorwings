import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
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

const { actions, reducer } = commonSlice;
export const { updateCustomers, updateTailors } = actions;
export default reducer;
