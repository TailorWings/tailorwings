import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
	name: 'admin',
	initialState: {
		customers: null,
	},
	reducers: {
		updateCustomers(state, action) {
			state.customers = action.payload;
		},
	},
});

const { actions, reducer } = commonSlice;
export const { updateCustomers } = actions;
export default reducer;
