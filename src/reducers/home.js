export default (state = {}, action) => {
	switch (action.type){
		case 'PAGE_LOADED':
			return { ...state, properties: action.payload};
	}
	return state;
};