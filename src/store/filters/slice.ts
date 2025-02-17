import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilterTypes: (state, action) => {
			state = {
				types: action.payload,
			};

			return state;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFilterTypes } = filterSlice.actions;

export default filterSlice.reducer;
