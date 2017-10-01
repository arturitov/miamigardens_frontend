import React from 'react';
import {Image} from 'react-bootstrap';
import './Application.css';
import {connect} from 'react-redux';
import agent from '../agent';
import groups from '../data/groups.json';
import {modal} from 'react-redux-modal';
import PDF from 'react-pdf-js';
import ReactDOM from 'react-dom';



const mapSateToProps = state => ({ ...state.application,
properties: state.home.properties,
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
	    dispatch({ type: 'PAGE_LOADED', payload}),
	onChangeGroup: value =>
	    dispatch({ type: 'UPDATE_APP_FIELD', key: 'group', value }),
	onChangeVehicleNumber: value =>
	    dispatch({ type: 'UPDATE_APP_FIELD', key: 'vehicleNumber', value }),
	onChangeLicense: value =>
	    dispatch({ type: 'UPDATE_APP_FIELD', key: 'license', value }),
	onChangeIncome: value =>
	    dispatch({ type: 'UPDATE_APP_FIELD', key: 'income', value }),
	onAddIncome: value =>
	    dispatch({ type: 'UPDATE_APP_INCOME', key: 'income', value }),
	onDeleteFile : value =>
		dispatch({ type:'DELETE_APP_INCOME', key: 'income', value}),
	onChangeRulesAgreement: (value) =>
	    dispatch({ type: 'UPDATE_APP_FIELD', key: 'ruleAgreement', value}),
	onChangeField: (k, value) =>
		dispatch({ type: 'UPDATE_APP_FIELD', key: k, value }),
	handleRuleCLick: () => dispatch({type: 'UPDATE_APP_FIELD', key: 'ruleCLick', value: true})
});

class Application extends React.Component{
	constructor(){
		super();
		this.changeGroup = ev => this.props.onChangeGroup(ev.target.value);
		this.changeVehicleNumber = ev => this.props.onChangeVehicleNumber(ev.target.value);
		this.changeRulesAgreement = ev => {
			this.props.onChangeRulesAgreement(ev.target.value);
		}
		this.changeAIFN = ev => {this.props.onChangeField('firstName', ev.target.value); console.log(ev.target)};
		this.changeAIMN = ev =>this.props.onChangeField("midddleName", ev.target.value);
		this.changeAILN = ev =>this.props.onChangeField("lastName", ev.target.value);
		this.changeValue = ev => this.props.onChangeField(ev.target.id, ev.target.value);
		this.handleRuleCLick = ev => {this.props.handleRuleCLick();}
		this.submitForm = (data) => ev => {
			ev.preventDefault();
			var destination = Math.random().toString(36).substring(2);

			
			if(data.license){
				agent.Maintenance.image(destination, data.license[0], data.license[0].name);
			}
			
			if(data.income){
				agent.Maintenance.image(destination, data.income[0], data.income[0].name);
			}

			agent.Application.submit(data, destination);

			console.log("form submitted");
			// window.location.reload();
		};
	}

	componentWillMount() {
	    this.props.onLoad(agent.Groups.all());
	  }

	_handleIDChange(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];

		
		reader.onloadend = () => {
			if (!this.props.license) {
				this.props.onChangeLicense(file);
			}
		}
		reader.readAsDataURL(file)
	}

	_handleIncomeChange(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];

		
		reader.onloadend = () => {
			if (!this.props.income) {
				this.props.onChangeIncome(file);
			}
			else{
				this.props.onAddIncome(file);
			}
		}

		reader.readAsDataURL(file)

	}


	handleRadioClick(e) {
		e.preventDefault();
		if(!this.props.ruleCLick){
			console.alert("You must Click and read the Rules and Regulations");
		}
		else{
			this.props.changeRulesAgreement();
		}
	}



	render(){
		const properties = this.props.properties;
		const license = this.props.license;
		const income = this.props.income;
		const vehicleNumber = this.props.vehicleNumber;
		const ruleAgreement = this.props.ruleAgreement;

		var vehicleList = null;
		var vehicles = this.props.vehicles;

		var group = this.props.group;


		var address;

		var propertyInformation = {
			unitNumber : this.props.unitNumber,
			unitMonthlyPay : this.props.unitMonthlyPay,
		}

		var applicantInfo = {
			firstName: this.props.firstName,
			midddleName: this.props.midddleName,
			lastName: this.props.lastName,
			DOB: this.props.DOB,
			email: this.props.email,
			workPhone: this.props.workPhone,
			homePhone: this.props.homePhone,
			cellPhone: this.props.cellPhone,
			socialSecurity: this.props.socialSecurity,
			driversLicense: this.props.driversLicense,
			credit: this.props.credit
		}

		var additionalOccupants = {
			nameOne: this.props.nameOne,
			dobOne: this.props.dobOne,
			relationship2ApplicantOne: this.props.relationship2ApplicantOne,
			nameTwo: this.props.nameTwo,
			dobTwo: this.props.dobTwo,
			relationship2ApplicantTwo: this.props.relationship2ApplicantTwo,
			nameThree: this.props.nameThree,
			dobThree: this.props.dobThree,
			relationship2ApplicantThree: this.props.relationship2ApplicantThree,
			nameFour: this.props.nameFour,
			dobFour: this.props.dobFour,
			relationship2ApplicantFour: this.props.relationship2ApplicantFour,
			nameFive: this.props.nameFive,
			dobFive: this.props.dobFive,
			relationship2ApplicantFive: this.props.relationship2ApplicantFive
		}

		var car = {

		}

		var rentalHistory = {
			currentResidence : {
				address: this.props.CRaddress,
				city: this.props.CRcity,
				state: this.props.CRstate,
				zipCode: this.props.CRzipCode,
				monthlyRent: this.props.CRmonthlyRent,
				datesResidency: this.props.CRdatesResidency,
				reasonForMoving: this.props.CRreasonForMoving,
				ownerName: this.props.CRownerName,
				ownerPhone: this.props.CRownerPhone
			},
			previousResidence : {
				address: this.props.PRaddress,
				city: this.props.PRcity,
				state: this.props.PRstate,
				zipCode: this.props.PRzipCode,
				monthlyRent: this.props.PRmonthlyRent,
				datesResidency: this.props.PRdatesResidency,
				reasonForMoving: this.props.PRreasonForMoving,
				ownerName: this.props.PRownerName,
				ownerPhone: this.props.PRownerPhone
			}
		}

		var employmentHistory = {
			currentEmployer : this.props.currentEmployer,
			occupation: this.props.occupation,
			employerAddress: this.props.employerAddress,
			employerPhone: this.props.employerPhone,
			datesEmployment: this.props.datesEmployment,
			supervisorName: this.props.supervisorName,
			monthlyPay: this.props.monthlyPay,
			additionalPay: this.props.additionalPay
		}

		var personalReferences = {
			name1: this.props.name1,
			relationship1: this.props.relationship1,
			phone1: this.props.phone1,
			name2: this.props.name2,
			relationship2: this.props.relationship2,
			phone2: this.props.phone2,
		}

		var questions = {
			q1Y: this.props.q1Y,
			q2Y: this.props.q2Y,
			q3Y: this.props.q3Y,
			q4Y: this.props.q4Y,
			q5Y: this.props.q5Y,
			q6Y: this.props.q6Y,
			q7Y: this.props.q7Y,
			q1N: this.props.q1N,
			q2N: this.props.q2N,
			q3N: this.props.q3N,
			q4N: this.props.q4N,
			q5N: this.props.q5N,
			q6N: this.props.q6N,
			q7N: this.props.q7N,
			additional: this.props.additional
		}

		var vehicles = {
			model1: this.props.model1,
			make1: this.props.make1,
			color1: this.props.color1,
			year1: this.props.year1,
			license1: this.props.license1,
			insurance1: this.props.insurance1,
			model2: this.props.model2,
			make2: this.props.make2,
			color2: this.props.color2,
			year2: this.props.year2,
			license2: this.props.license2,
			insurance2: this.props.insurance2,
		}
		var data = {
				applicantInfo, 
				additionalOccupants, 
				rentalHistory, 
				employmentHistory, 
				questions, 
				license, 
				income,
				personalReferences,
				propertyInformation,
				vehicles
			 };
		//this.props.applicantInfo;

		if (!this.props.properties) {
			return (
				<div>
					Loading...
				</div>

			);
		}
		if (group){
			if (group[0] == "--") {
				address = "";
				group = undefined;
			}
			else{
				var groupNum;
				console.log(group);
				for (var i = 0; i < groups.length; i++)  {
					if(groups[i]._id == group[0]){
						groupNum = i;
					}
				};
				address = groups[groupNum].address;
				propertyInformation.address = address;
				var rules = groups[groupNum].rules;
			}
		}
		const groupList = properties.map((group) =>
			<option key={group._id} value={group._id}>{group.name}</option>
		);


		return(
			<div className="container page">
				<div className="row center-block">
					<h1>Property Application</h1>
				</div>
				<form onSubmit={this.submitForm(data)}>
					<h3>Property Information</h3>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
			                  	<label> Select property</label>
			                  	<select name="groups" 
			                  	  className="form-control form-control-lg"
			                  	  value={group}
			                  	  onChange={this.changeGroup}>
			                  	    <option>--</option>
			                  		{groupList}
			                  	</select>
			                  </fieldset>
						</div>
					</div>

					{ group &&
					<div>
						<div className="row">
							<div className="col-md-3">
								<fieldset className="form-group">
				                  	<label>Address</label>
				                  	<p>
				                  	    {address}
				                  	</p>
				                  </fieldset>
							</div>
							<div className="col-md-2">
			                  	<fieldset className="form-group">
									<label>Unit Number</label>
										<input
											className="form-control form-control-lg"
											type="text"
											placeholder="203"
											value={propertyInformation.unitNumber}
											onChange={this.changeValue}
											id="unitNumber"/>
								</fieldset>
							</div>
							<div className="col-md-2">
			                  	<fieldset className="form-group">
									<label>Monthly Rent</label>
										<input
											className="form-control form-control-lg"
											type="text"
											placeholder=""
											value={propertyInformation.unitMonthlyPay}
											onChange={this.changeValue}
											id="unitMonthlyPay"/>
								</fieldset>
							</div>
						</div>

					<div className="row">
						<h3>Applicant Information</h3>
					</div>
					<div className="row">
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>First Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="First Name"
									value={applicantInfo.firstName}
									onChange={this.changeValue}
									id="firstName"/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Middle Name</label>
								<input
									className="form-control form-control-lg"
									id="midddleName"
									type="text"
									placeholder="Middle Name"
									value={applicantInfo.midddleName}
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Last Name</label>
								<input
									className="form-control form-control-lg"
									id="lastName"
									type="text"
									placeholder="Last Name"
									value={applicantInfo.lastName}
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>DOB</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="##/##/##"
									value={applicantInfo.DOB}
									id="DOB"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Email Address</label>
								<input
									className="form-control form-control-lg"
									type="email"
									placeholder="Email"
									value={applicantInfo.email}
									id="email"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Home Phone</label>
								<input
									className="form-control form-control-lg"
									type="tel"
									placeholder="999-999-9999"
									value={applicantInfo.homePhone}
									id="homePhone"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Cell Phone</label>
								<input
									className="form-control form-control-lg"
									type="tel"
									placeholder="999-999-9999"
									value={applicantInfo.cellPhone}
									id="cellPhone"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Work Phone</label>
								<input
									className="form-control form-control-lg"
									type="tel"
									placeholder="999-999-9999"
									value={applicantInfo.workPhone}
									id="workPhone"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>

					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Social Security #</label>
								<input
									className="form-control form-control-lg"
									type="password"
									placeholder="xxx-xx-xxxx"
									value={applicantInfo.socialSecurity}
									id="socialSecurity"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Drivers License #</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Driver's License #"
									value={applicantInfo.driversLicense}
									id="driversLicense"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Upload Copy of License</label>
								<input
			                      className="form-control form-control-lg"
			                      type="file"
			                      placeholder="Upload Copy of License"
			                      onChange={(e)=>this._handleIDChange(e)}/>
		                	</fieldset>
		                </div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
			                  	<label>Credit Score</label>
			                  	<select name="groups" 
			                  	  className="form-control form-control-lg"
			                  	  value={applicantInfo.credit}
			                  	  onChange={this.changeValue}
			                  	  id="credit">
			                  	    <option>--</option>
			                  		<option value="< 500">{"<"} 500</option>
			                  		<option value="500 - 600">500 - 600</option>
			                  		<option value="> 600">{">"} 600</option>
			                  	</select>
			                  </fieldset>
						</div>
					</div>
					<h4>Additional Occupants</h4>
					<div className="row">
						<div className="col-md-6">
							<fieldset className="form-group">
							<label>First, Middle, Last Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="First, Middle, Last Name"
									value={additionalOccupants.nameOne}
									id="nameOne"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>DOB</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="##/##/##"
									value={additionalOccupants.dobOne}
									id="dobOne"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={additionalOccupants.relationship2ApplicantOne}
									id="relationship2ApplicantOne"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<fieldset className="form-group">
							<label>First, Middle, Last Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="First, Middle, Last Name"
									value={additionalOccupants.nameTwo}
									id="nameTwo"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>DOB</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="##/##/##"
									value={additionalOccupants.dobTwo}
									id="dobTwo"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={additionalOccupants.relationship2ApplicantTwo}
									id="relationship2ApplicantTwo"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<fieldset className="form-group">
							<label>First, Middle, Last Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="First, Middle, Last Name"
									value={additionalOccupants.nameThree}
									id="nameThree"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>DOB</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="##/##/##"
									value={additionalOccupants.dobThree}
									id="dobThree"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={additionalOccupants.relationship2ApplicantThree}
									id="relationship2ApplicantThree"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<fieldset className="form-group">
							<label>First, Middle, Last Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="First, Middle, Last Name"
									value={additionalOccupants.nameFour}
									id="nameFour"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>DOB</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="##/##/##"
									value={additionalOccupants.dobFour}
									id="dobFour"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={additionalOccupants.relationship2ApplicantFour}
									id="relationship2ApplicantFour"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<fieldset className="form-group">
							<label>First, Middle, Last Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="First, Middle, Last Name"
									value={additionalOccupants.nameFive}
									id="nameFive"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>DOB</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="##/##/##"
									value={additionalOccupants.dobFive}
									id="dobFive"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={additionalOccupants.relationship2ApplicantFive}
									id="relationship2ApplicantFive"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<h3>Rental History</h3>
					</div>
					<h4>Current Residence</h4>
					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Address</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="1234 NW 8th St"
									value={rentalHistory.currentResidence.CRaddress}
									id="CRaddress"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>City</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="City"
									value={rentalHistory.currentResidence.CRcity}
									id="CRcity"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>State</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="FL"
									value={rentalHistory.currentResidence.CRstate}
									id="CRstate"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>Zip Code</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="#####"
									value={rentalHistory.currentResidence.CRzipCode}
									id="CRzipCode"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>Monthly Rent</label>
								<input
									className="form-control form-control-lg"
									type="currency"
									placeholder="$"
									value={rentalHistory.currentResidence.CRmonthlyRent}
									id="CRmonthlyRent"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Dates of Residency (From/To)</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="mm/dd/yy - mm/dd/yy"
									value={rentalHistory.currentResidence.CRdatesResidency}
									id="CRdatesResidency"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-5">
							<fieldset className="form-group">
							<label>Reason for Moving</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={rentalHistory.currentResidence.CRreasonForMoving}
									id="CRreasonForMoving"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Owner/Manager's Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Jane Smith"
									value={rentalHistory.currentResidence.CRownerName}
									id="CRownerName"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Owner/Manarger's Phone Number</label>
								<input
									className="form-control form-control-lg"
									type="tel"
									placeholder="999-999-9999"
									value={rentalHistory.currentResidence.CRownerPhone}
									id="CRownerPhone"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<h4>Previous Residence</h4>
					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Address</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="1234 NW 8th St"
									value={rentalHistory.previousResidence.PRaddress}
									id="PRaddress"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>City</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="City"
									value={rentalHistory.previousResidence.PRcity}
									id="PRcity"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>State</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="FL"
									value={rentalHistory.previousResidence.PRstate}
									id="PRstate"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>Zip Code</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="#####"
									value={rentalHistory.previousResidence.PRzipCode}
									id="PRzipCode"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>Monthly Rent</label>
								<input
									className="form-control form-control-lg"
									type="currency"
									placeholder="$"
									value={rentalHistory.previousResidence.PRmonthlyRent}
									id="PRmonthlyRent"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Dates of Residency (From/To)</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="mm/dd/yy - mm/dd/yy"
									value={rentalHistory.previousResidence.PRdatesResidency}
									id="PRdatesResidency"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-5">
							<fieldset className="form-group">
							<label>Reason for Moving</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={rentalHistory.previousResidence.PRreasonForMoving}
									id="PRreasonForMoving"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Owner/Manager's Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Jane Smith"
									value={rentalHistory.previousResidence.PRownerName}
									id="PRownerName"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Owner/Manarger's Phone Number</label>
								<input
									className="form-control form-control-lg"
									type="tel"
									placeholder="999-999-9999"
									value={rentalHistory.previousResidence.PRownerPhone}
									id="PRownerPhone"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>

					<div className="row">
						<h3>Employment History</h3>
					</div>
					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Current Employer</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={employmentHistory.currentEmployer}
									id="currentEmployer"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Occupation</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={employmentHistory.occupation}
									id="occupation"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<fieldset className="form-group">
							<label>Employer Address</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="1234 NW 8th St Miami, FL 33315"
									value={employmentHistory.employerAddress}
									id="employerAddress"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Employer Phone</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={employmentHistory.employerPhone}
									id="employerPhone"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
							<label>Date of Employment (From/To)</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="mm/dd/yy - mm/dd/yy"
									value={employmentHistory.datesEmployment}
									id="datesEmployment"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
							<label>Supervisors Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={employmentHistory.supervisorName}
									id="supervisorName"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
							<label>Monthly Pay</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={employmentHistory.monthlyPay}
									id="monthlyPay"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
								<label>Additional Monthly Pay <br/> (ie. child support, second job, extra income)</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="$"
									value={employmentHistory.additionalPay}
									id="currentEmployer"
									onChange={this.additionalPay}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<fieldset className="form-group">
								<label>Submit proof on income <br/> (ie. bank statement, pay stub, offer letter)</label>
								<input
			                      className="form-control form-control-lg"
			                      type="file"
			                      placeholder="Upload Proof of Income"
			                      onChange={(e)=>this._handleIncomeChange(e)}/>
							</fieldset>
						</div>
					</div>

					<div className="row">
						<h3>Personal References</h3>
					</div>
					<div className="row">
						<div className="col-md-3">
							<fieldset className="form-group">
								<label>Full Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Jane Smith"
									value={personalReferences.name1}
									id="name1"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
								<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Supervisor"
									value={personalReferences.relationship1}
									id="relationship1"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
								<label>Phone Number</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="(###)-###-####"
									value={personalReferences.phone1}
									id="phone1"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<fieldset className="form-group">
								<label>Full Name</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Jane Smith"
									value={personalReferences.name2}
									id="name2"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
								<label>Relationship to Applicant</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="Supervisor"
									value={personalReferences.relationship2}
									id="relationship2"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-3">
							<fieldset className="form-group">
								<label>Phone Number</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder="(###)-###-####"
									value={personalReferences.phone2}
									id="phone2"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>

					<div className="row">
						<h3>Vehicles</h3>
					</div>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Number of Vehicles</label>
								<input
									className="form-control form-control-lg"
									type="number"
									placeholder="Max 2"/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Make</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.make1}
										id="make1"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Model</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.model1}
										id="model1"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Color</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.color1}
										id="color1"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Year</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.year1}
										id="year1"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>License No.</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.license1}
										id="license1"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Insurance Policy #</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.insurance1}
										id="insurance1"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Make</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.make2}
										id="make2"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Model</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.model2}
										id="model2"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Color</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.color2}
										id="color2"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Year</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.year2}
										id="year2"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>License No.</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.license2}
										id="license2"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
						<div className="col-md-2">
							<fieldset className="form-group">
								<label>Insurance Policy #</label>
									<input
										className="form-control form-control-lg"
										type="text"
										placeholder=""
										value={vehicles.insurance2}
										id="insurance2"
										onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<h3>General Information</h3>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Do you smoke?</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes" 
									value={questions.q1Y}
									id="q1Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no" 
								    value={questions.q1N}
									id="q1N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Do you have any pets?</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes"
									value={questions.q2Y}
									id="q2Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no"
								    value={questions.q2N}
									id="q2N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Have you ever filed for bankruptcy</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes"
									value={questions.q3Y}
									id="q3Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no"
								    value={questions.q3N}
									id="q3N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Do you have any musical instruments?</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes"
									value={questions.q4Y}
									id="q4Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no"
								    value={questions.q4N}
									id="q4N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Do you have any water filled furniture or do you intend to use water filled furniture in the apartment?</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes"
									value={questions.q5Y}
									id="q5Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no"
								    value={questions.q5N}
									id="q5N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Have you ever been convicted for selling, possessing, distributing, or manufacturing illegal drugs or convicted of any other crime?</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes"
									value={questions.q6Y}
									id="q6Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no"
								    value={questions.q6N}
									id="q6N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
							<div className="row">
								<div className="col-md-12">
									<label>Have you ever been evicted for non-payment of rent or any other reason?</label>
								</div>
							</div>
							<div className="row">
								<div className="col-md-1">
									<input type="radio" value="yes"
									value={questions.q7Y}
									id="q7Y"
									onChange={this.changeValue}/> Yes
								</div>
								<div className="col-md-1">
								    <input type="radio" value="no"
								    value={questions.q7N}
									id="q7N"
									onChange={this.changeValue}/> No
								</div>
							</div>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<fieldset className="form-group">
								<label>Please explain any "yes" answers to the above questions:</label>
								<input
									className="form-control form-control-lg"
									type="text"
									placeholder=""
									value={questions.additional}
									id="additional"
									onChange={this.changeValue}/>
							</fieldset>
						</div>
					</div>

					<p>An application fee of <b>$100</b> is required for the cost of processing this application, to obtain credit history and other background information.
					An application fee of <b>$50</b> will also be required for each additional adult.</p>
					<p>Applicant represents that all information given on this application is true and correct. Applicant hereby authorizes verification of all references
					and facts, including but not limited to current and previous landlords and employers, and personal references. Applicant hereby authorizes owner/agent 
					to obtain Unlawful Detainer, Credit Reports, Telechecks, and/or criminal background reports. Applicant understands that incomplete or incorrect information
					provided in the application may cause a delay in processing which ,ay result in denial of tenancy. Applicant hereby waives any claim and releases from liability
					any person providing or obtaining said verification or additional information.</p>



	                 <fieldset className="form-group">

	                 <div className="radio">
				      <label>
				        <input type="radio" 
				        value={ruleAgreement}
				        onChange={this.changeRulesAgreement}
				        disabled={!this.props.ruleCLick}/>
				        I have read and I accept the <a target="_blank" onClick={this.handleRuleCLick} href={rules}>Rules and Regulations</a>
				      </label>
				    </div>
	                </fieldset>

	            {
	            	ruleAgreement != "on" &&
	            	<div className="alert alert-danger" role="alert">
					  <strong>You need to click on the link above to proceed!</strong>
					</div>
	            }

				{
					ruleAgreement == "on" &&
					<div ref="signature">

	                <fieldset>
	                	<p> I, the applicant for this property application, warrant the truthfulness of the information provided in this application.</p>

						<label>Electronic Signature</label>
	                	<input type="text" required placeholder="First and Last Name"/>
	                	<label>
		                	<input id="checkBox" type="checkbox"/> 
		                	I understand that checking this box constitutes a legal signature confirming that I acknowledge and agree to the above Terms of Acceptance.
		                </label>
	                
	                </fieldset>


					<button
						className="btn btn-lg btn-primary pull-xs-right"
						type="submit">
						Submit
					</button>
					</div>
				}

				</div>
			}


	              </form>
			</div>
		);
	}
}


export default connect(mapSateToProps, mapDispatchToProps)(Application);
