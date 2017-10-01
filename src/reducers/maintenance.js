import { LOCATION_CHANGE } from 'react-router-redux';

export default (state = {}, action) => {
	switch (action.type){
		case LOCATION_CHANGE: {
	      return {};
	    }
		case 'MAINTENANCE':
			return {
				...state,
				inProgress: false,
				errors: action.errors ? action.payload.errors : null
			};
			break;
		case 'ASYNC_START':
			if(action.subtype === 'MAINTENANCE') {
				return {...state,inProgress: true};
			}
			break;
		case 'UPDATE_FIELD':
			console.log(action);
	      return { ...state, [action.key]: [action.value] };
	    case 'UPDATE_FILE':
			console.log(state);
	      return { ...state, [action.key]:[...state.files,action.value] };
	      break;
	    case 'UPDATE_URL':
			console.log(state);
	      return { ...state, [action.key]:[...state.filesUrl,action.value] };
	      break;
	   case 'DELETE_FILE_URL':
	   		console.log(action);
	   	  return { ...state, 
	   	  	[action.key]:[
	   	  	...state.filesUrl.slice(0,action.value),
	   	  	...state.filesUrl.slice(action.value + 1)
	   	  	]
	   	  }
	   	  break;
	   	case 'CLEAR':
	   		return {...state, maintenance: null};
	   		console.log(...state);
	   		break;
	   	case 'DELETE_FILE':
	   		console.log(action);
	   	  return { ...state, 
	   	  	[action.key]:[
	   	  	...state.files.slice(0,action.value),
	   	  	...state.files.slice(action.value + 1)
	   	  	]
	   	  }
	   	  break;
		default:
			return state;
		}
		return state;
};