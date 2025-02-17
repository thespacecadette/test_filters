import initialState from './filters/initialState';

interface Action {
	type: string;
	payload: any;
}

export default function appReducer(state = initialState, action: Action) {
	switch (action.type) {
		case 'setFilterTypes': {
			return {
				...state,
				...action.payload,
			};
		}
		default:
			return state;
	}
}
