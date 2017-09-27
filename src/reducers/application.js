
export default (state = {}, action) => {
	switch (action.type){
		case 'ASYNC_START':
			if(action.subtype === 'APPLICATION') {
				return {...state,inProgress: true};
			}
			break;
		case 'UPDATE_APP_FIELD':
		console.log(action);
	      return { ...state, [action.key]: [action.value] };
	      break;
	    case 'UPDATE_APP_INCOME':
	      return { ...state, [action.key]:[...state.income,action.value] };
	      break;
	   	case 'DELETE_APP_INCOME':
	   	  return { ...state, 
	   	  	[action.key]:[
	   	  	...state.income.slice(0,action.value),
	   	  	...state.income.slice(action.value + 1)
	   	  	]
	   	  }
	   	  break;
	}
	return state;
};