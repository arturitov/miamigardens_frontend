import React from 'react';
import {Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import agent from '../agent';

const mapSateToProps = state => ({...state.contact,
properties: state.home.properties,
});
const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
	    dispatch({ type: 'PAGE_LOADED', payload}),
	onChangeName: value =>
	    dispatch({ type: 'UPDATE_FIELDC', key: 'name', value }),
    onChangeEmail: value =>
	    dispatch({ type: 'UPDATE_FIELDC', key: 'email', value }),
    onChangePhone: value =>
	    dispatch({ type: 'UPDATE_FIELDC', key: 'phone', value }),
	onChangeMessage: value =>
	    dispatch({ type: 'UPDATE_FIELDC', key: 'message', value }),
	onSubmitForm: (name, email, phone, message) =>
		dispatch({type: 'CONTACT', 
				payload: 
					agent.Contact.contact(name, email, phone, message)
				}),
});

class Contact extends React.Component{
	constructor(){
		super();
		this.changeName = ev => this.props.onChangeName(ev.target.value);
		this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
		this.changePhone = ev => this.props.onChangePhone(ev.target.value);
		this.changeMessage = ev => this.props.onChangeMessage(ev.target.value);
		this.submitForm = (name, email, phone, message) => ev => {
			ev.preventDefault();
			this.props.onSubmitForm(name, email, phone, message);
			window.location.reload();
		};
	}
	render(){
		const name = this.props.name;
		const email = this.props.email;
		const phone = this.props.phone;
		const message = this.props.message;
		return(
			<div className="container">

		        <div className="row">
		            <div className="col-md-8">
		                <h3>Send us a Message</h3>
		                <form onSubmit={this.submitForm(name, email, phone, message)}>
		                    <div className="control-group form-group">
		                        <div className="controls">
		                            <label>Full Name:</label>
		                            <input 
		                            	type="text" 
		                            	className="form-control" 
		                            	id="name"
		                            	value={this.props.name} 
					                    onChange={this.changeName}/>
		                            <p className="help-block"></p>
		                        </div>
		                    </div>
		                    <div className="control-group form-group">
		                        <div className="controls">
		                            <label>Phone Number:</label>
		                            <input 
		                            	type="tel" 
		                            	className="form-control" 
		                            	id="phone" 
		                            	value={phone} 
				                        onChange={this.changePhone}/>
		                        </div>
		                    </div>
		                    <div className="control-group form-group">
		                        <div className="controls">
		                            <label>Email Address:</label>
		                            <input 
		                            	type="email" 
		                            	className="form-control" 
		                            	id="email" 
		                            	value={email} 
			                      		onChange={this.changeEmail}/>
		                        </div>
		                    </div>
		                    <div className="control-group form-group">
		                        <div className="controls">
		                            <label>Message:</label>
		                            <textarea 
		                            	rows="10" 
		                            	cols="100" 
		                            	className="form-control" 
		                            	id="message"  
		                            	maxLength="999" 
		                            	style={{resize:"none"}}
		                            	value={message} 
			                      		onChange={this.changeMessage}>
		                            </textarea>
		                        </div>
		                    </div>
		                    <div id="success"></div>
		                    <button type="submit" className="btn btn-primary">Contact</button>
		                </form>
		            </div>
		            <div className="col-md-4">
		                <h3>Contact Details</h3>
		                <p>
		                    9999 Bird Rd<br/>Maimi, FL 33155<br/>
		                </p>
		                <p><i className="fa fa-phone"></i> 
		                    <abbr title="Phone">P</abbr>: (999) 999-9999</p>
		                <p><i className="fa fa-envelope-o"></i> 
		                    <abbr title="Email">E</abbr>: <a href="mailto:miguel@miamigardens2608.com">miguel@miamigardens2608.com</a>
		                </p>
		                <p><i className="fa fa-clock-o"></i> 
		                    <abbr title="Hours">H</abbr>: Monday - Friday: 9:00 AM to 5:00 PM</p>
		                
		            </div>

		        </div>

		    </div>
		);
	}
}

export default connect(mapSateToProps, mapDispatchToProps)(Contact);