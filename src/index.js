import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from './store';

import App from './components/App';
import Home from './components/Home';
import Maintenance from './components/Maintenance';
import GroupView from './components/GroupView';
import Contact from './components/Contact';
import Application from './components/Application';
import Thanks from './components/Thanks';
import ReduxModal from 'react-redux-modal'

import {HashRouter, Route, Link, Router} from 'react-router-dom';


ReactDOM.render((
  <Provider store={store}>
  <HashRouter>
      <div>
	  	<Route path="/" component={App} />
		<Route exact path="/" component={Home} />   
		<Route path="/maintenance" component={Maintenance} />  
		<Route path="/groups" component={GroupView} />
		<Route path="/contact" component={Contact} />    
		<Route path="/application" component={Application} />
		<Route path="/thanks" component={Thanks} />
		<ReduxModal />    
	  </div>
  </HashRouter>
  </Provider>
), document.getElementById('root'));

