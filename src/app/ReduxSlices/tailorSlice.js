import { createSlice } from '@reduxjs/toolkit';

const tailorSlice = createSlice({
	name: 'tailor',
	initialState: {
		tailor: JSON.parse(localStorage.getItem('tailor')),
		findingOrders: null,
		pickedOrders: null,
	},
	reducers: {
		setTailor(state, action) {
			let tailor = action.payload;
			tailor?.password && delete tailor.password;
			localStorage.setItem('tailor', JSON.stringify(tailor));
			state.tailor = tailor;
		},
		setFindingOrders(state, action) {
			state.findingOrders = action.payload;
		},
		setPickedOrders(state, action) {
			state.pickedOrders = action.payload;
		},
	},
});

const { actions, reducer } = tailorSlice;
export const { setFindingOrders, setPickedOrders, setTailor } = actions;
export default reducer;
