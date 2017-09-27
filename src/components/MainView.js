import Properties from './Properties.js';
import React from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import agent from '../agent';
import Footer from './Footer';
import groupData from '../data/groups.json';



const mapToProps = state => ({
  properties: state.home.properties,
  appName: state.common.appName

});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'PAGE_LOADED', payload}),
});



class MainView extends React.Component {
  componentWillMount() {
    this.props.onLoad(groupData);
  }

  render (){
	  return (
	  	<div>
		    <Grid>
		      <Row>
		        <Col xs={12}>
		          <h1 className="text-center">Properties</h1>
		        </Col>
		      </Row>
		      <Row>
			      <Col xs={12}>
			        <Properties
			          properties={this.props.properties}/>
			      </Col>
		      </Row>
		    </Grid>
	    	<Footer/>
	    </div>
		);
	}
}

export default connect(mapToProps, mapDispatchToProps)(MainView);