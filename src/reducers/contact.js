export default (state = {}, action) => {
	switch (action.type){
		case 'CONTACT':
		console.log(action);
			return {
				...state,
				inProgress: false,
				errors: action.errors ? action.payload.errors : null
			};
		case 'ASYNC_START':
			if(action.subtype === 'CONTACT') {
				return {...state,inProgress: true};
			}
			break;
		case 'UPDATE_FIELDC':
			console.log(action);
	      return { ...state, [action.key]: [action.value] };
	   	  break;
	}
	return state;
};