import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://miamigarden.herokuapp.com/api'
const responseBody = res => res.body;

const requests = {
	get: url =>
		superagent.get(`${API_ROOT}${url}`).then(responseBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`,body).then(responseBody),
	postFile: (url, destination, file, fileName) =>
	    superagent.post(`${API_ROOT}${url}`).attach(destination, file, fileName).then(responseBody)
};


const Groups = {
	all: page => requests.get('/groups'),
	// all: page => requests.get('/group'),
};

const Contact = {
	contact: (name, email, phone, message)  => {
		requests.post("/contact", {form:{name, email, phone, message}})
	}
};

const Application = {
	submit: (data, destination)  => {
		requests.post("/application", {form:{data, destination}})
	}
};

const Maintenance ={
	image: (destination, file, fileName) => {
		requests.postFile("/maintenance/image?clientName=Miami%20Gardens%202608%20LLC.",
			destination, file, fileName)
	},
	upload: (name, email, phone, description, group, destination, address) => {
		requests.post("/maintenance/form"
			, {form:{name, email, phone, description, group, destination, address}})
	}
};

export default {
	Groups,
	Maintenance,
	Contact,
	Application
};

