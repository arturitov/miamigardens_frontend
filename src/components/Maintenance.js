import ListErrors from './ListErrors'
import React from 'react';
// import  FileUpload  from './FileUpload';
import {connect} from 'react-redux';
import agent from '../agent';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import './Maintenance.css';
import {Router} from 'react-router';

const superagent = superagentPromise(_superagent, global.Promise);

const mapSateToProps = state => ({ ...state.maintenance,
properties: state.home.properties,
});
const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
	    dispatch({ type: 'PAGE_LOADED', payload}),
	onChangeName: value =>
	    dispatch({ type: 'UPDATE_FIELD', key: 'name', value }),
    onChangeEmail: value =>
	    dispatch({ type: 'UPDATE_FIELD', key: 'email', value }),
    onChangePhone: value =>
	    dispatch({ type: 'UPDATE_FIELD', key: 'phone', value }),
    onChangeDescription: value =>
	    dispatch({ type: 'UPDATE_FIELD', key: 'description', value }),
    onAddFiles: value =>
	    dispatch({ type: 'UPDATE_FILE', key: 'files', value }),
	onChangeFiles: value =>
	    dispatch({ type: 'UPDATE_FIELD', key: 'files', value }),
	onChangeURL: value =>
		dispatch({ type: 'UPDATE_FIELD', key: 'filesUrl', value}),
	onAddURL: value =>
		dispatch({ type: 'UPDATE_URL', key: 'filesUrl', value}),
    onChangeGroup: value =>
	    dispatch({ type: 'UPDATE_FIELD', key: 'group', value }),
	onDeleteImageURL : value =>
		dispatch({ type:'DELETE_FILE_URL', key: 'filesUrl', value}),
	onDeleteImageFile : value =>
		dispatch({ type:'DELETE_FILE', key: 'files', value}),
	onSubmitForm: (name, email, phone, description, group, destination) =>
		dispatch({type: 'MAINTENANCE', 
				payload: 
					agent.Maintenance.upload(name, email, phone, description, group, destination)
				}),
	onSubmitFile: (destination, file, fileName) =>
		dispatch({
			type: 'MAINTENANCE',
			payload: agent.Maintenance.image(destination, file, fileName)
		}),
	clearForm: () =>
		dispatch({
			type: 'CLEAR',
		})
});

class Maintenance extends React.Component {
	constructor(){
		super();
		this.initState = this.state;
		this.changeName = ev => this.props.onChangeName(ev.target.value);
		this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
		this.changePhone = ev => this.props.onChangePhone(ev.target.value);
		this.changeDescription = ev => this.props.onChangeDescription(ev.target.value);
		// this.changeFiles = ev => this.props.onChangeFiles(ev.target.files[0]);
		// this.AddMoreFiles = ev => this.props.onAddFiles(ev.target.files[0]);
		this.changeGroup = ev => this.props.onChangeGroup(ev.target.value);
		this.submitForm = (name, email, phone, description, files, group) => ev => {
			ev.preventDefault();
			document.getElementById("myform").reset();

		    var destination = Math.random().toString(36).substring(2);
		    if(files){
			    for (var i = 0; i < files.length; i++) {
			    	this.props.onSubmitFile(destination, files[i], files[i].name)
			    };
			}

			this.props.onSubmitForm(name, email, phone, description, group, destination);
			window.location.reload();
		};
	}

	_handleImageChange(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		

		reader.onloadend = () => {
			if (!this.props.files) {
				this.props.onChangeFiles(file);
				this.props.onChangeURL(reader.result);
			}
			else{
				this.props.onAddFiles(file);
				this.props.onAddURL(reader.result);
			}
		}

		

		reader.readAsDataURL(file)

	}

	removeImage =(index) => ev =>{
		
		this.props.onDeleteImageURL(index);
		this.props.onDeleteImageFile(index);
	}


	componentWillMount() {
	    this.props.onLoad(agent.Groups.all());
	}

	render () {
		const name = this.props.name;
		const email = this.props.email;
		const phone = this.props.phone;
		const description = this.props.description;
		const files = this.props.files;
		const group = this.props.group;
		const properties = this.props.properties;
		const filesUrl = this.props.filesUrl;
		// const imageURLs = null;
		// 
		
		
		if (!this.props.properties) {
			return (
				<div>
					Loading...
				</div>
			);
		}

		console.log(properties);
		const groupList = properties.map((group) =>
			<option key={group._id} value={group.name}>{group.name}</option>
		);

		

		if(this.props.filesUrl) {
			
			var imageURLs = null
			imageURLs = filesUrl.map((imageURL, index) =>
				<div key={index} className="col-md-3 col-xs-12">
				<div className="img-wrap">
					<span onClick={this.removeImage(index)} className="close">&times;</span>
					<img className="imgPreview" src={imageURL} />
				</div>
				</div>
			);
			
		}

		return (
			<div>
				<div className="container page">
					<div className="row">
						<div className="col-md-12 offset-sm-3 col-xs-12">
							<h1 className="text-center">Maintenance Request</h1>
							<p className="text-center">Please provide as much information as you can below and we will get back to you soon!</p>
						<ListErrors errors={this.props.errors} />
						<form id="myform" onSubmit={this.submitForm(name, email, phone, description, files, group)}>
			                <fieldset>

			                  <fieldset className="form-group">
			                    <input
			                      className="form-control form-control-lg"
			                      type="text"
			                      placeholder="Name" 
			                      defaultValue={this.props.name} 
			                      onChange={this.changeName}/>
			                  </fieldset>

			                  <fieldset className="form-group">
			                    <input
			                      className="form-control form-control-lg"
			                      type="email"
			                      placeholder="Email" 
			                      value={email} 
			                      onChange={this.changeEmail}/>
			                  </fieldset>

			                  <fieldset className="form-group">
			                    <input
			                      className="form-control form-control-lg"
			                      type="tel"
			                      placeholder="Phone Number" 
			                      value={phone} 
			                      onChange={this.changePhone}/>
			                  </fieldset>

			                  <fieldset className="form-group">
			                    <input
			                      className="form-control form-control-lg"
			                      type="text"
			                      placeholder="Description" 
			                      value={description} 
			                      onChange={this.changeDescription}/>
			                  </fieldset>


			                  <fieldset className="form-group">
			                  	<p> Select property: </p>
			                  	<select name="groups" 
			                  	  className="form-control form-control-lg"
			                  	  value={group}
			                  	  onChange={this.changeGroup}>
			                  	    <option>--</option>
			                  		{groupList}
			                  	</select>
			                  </fieldset>


			               	  <div>   

			                  <fieldset className="form-group">
			                  { !filesUrl &&
			                  	<label htmlFor="imageUpload" className="btn btn-default btn-block btn-outlined">Upload a Photo</label>
			                  }
			                  {
			                  	filesUrl  &&
			                  	<label htmlFor="imageUpload" className="btn btn-primary btn-block btn-outlined">Upload More Photos</label>
			                  
			                  }
			                    <input
			                      className="form-control form-control-lg"
			                      type="file"
			                      placeholder="Add photos"
			                      style={{display: "none"}}
			                      id="imageUpload" 

			                      onChange={(e)=>this._handleImageChange(e)}/>
			                  </fieldset>



			                  </div>

			                 <fieldset className="form-group">

			              {
			              	imageURLs &&
			              	<div className="row">
				              	{imageURLs}
				            </div>
			              }
			              	</fieldset>

			                  <button
			                    className="btn btn-lg btn-primary pull-xs-right"
			                    type="submit"
			                    disabled={this.props.inProgress}>
			                    Submit
			                  </button>

			                </fieldset>
			              </form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapSateToProps, mapDispatchToProps)(Maintenance);