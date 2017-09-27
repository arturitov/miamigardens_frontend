import React from 'react';
import Banner from './Banner';
import MainView from './MainView';

class Home extends React.Component{
	render(){
		return (
			<div>
				<Banner />
				<MainView/>
			</div>

		);
	}
}

export default Home;