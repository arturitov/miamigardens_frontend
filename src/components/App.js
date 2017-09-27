import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Home from './Home';
import agent from '../agent';
import PropTypes from 'prop-types';


const mapStateToProps = state => ({
  appName: state.common.appName
});



class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes ={
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, () => ({}))(App);
