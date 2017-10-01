import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import Slider from 'react-slick';
import GoogleMapReact from 'google-map-react';
import './GroupView.css';
import Collapsible from 'react-collapsible';
import groupData from '../data/groups.json';
import groups from '../data/groups.json';

const mapToProps = state => ({
  properties: state.home.properties,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'PAGE_LOADED', payload}),
});

class GroupView extends React.Component {

	render (){
		var settings = {
	    	arrows: true,
	    	autoplay: true,
	    }
	    var maps = {
	    	center: {lat: 59.95, lng: 30.33},
		    zoom: 11
	    }
		var groupId = this.props.location.search.split('=')[1];
		var groupNum;
		console.log(groups.length);
		if (groups){
			for (var i = 0; i < groups.length; i++) {
				console.log(groups[i]._id );
				console.log(groupId );

				if(groups[i]._id == groupId){
					groupNum = i;
				}
			};
			console.log(groupNum);
			var group = groups[groupNum];
			console.log(group);
			var images = group.images.map((image, index) => 
				<div key={index}>
				<a target="_blank" href={image}>
	                <img style={{height:"200px", width:"auto"}}className="center-block" alt="Carousel Bootstrap First" src={image}></img>
				</a>
				</div>
			);
			console.log(group.schools);
			var schools = group.schools.map((school, index) =>
				<div key={index} className="container">
					<div className="row">
						<h4>{school.name}</h4>
					</div>
					<div className="row">
						<a href="`${school.website}`">{school.website}</a>
					</div>
					<div className="row">
						<a href="tel:`${school.tel}`">{school.tel}</a>
					</div>	
				</div>

			);
			var trashDays = group.utility.trash.map((day, index) =>
				<li key={index}>{day}</li>
			);
			if(group.utility.recycle){
				var recycle = group.utility.recycle.map((day, index) =>
					<li key={index}>{day}</li>
				);
			}
			console.log(images);
		}
		return (
			<div>
				<div className="container">
					<h1>{group.name}</h1>
					
						<div className="container">
						<div className="row">
							<div className="carousel col-xs-12 col-sm-4">
								<Slider {...settings}>
									{images}
								</Slider>
							</div>
						</div>
							<div className="col-xs-12 col-sm-6">
								<GoogleMapReact
							        defaultCenter={maps.center}
							        defaultZoom={maps.zoom}
						        >
						        </GoogleMapReact>
							</div>
						</div>
					<h3>{group.address}</h3>
					<p>{group.description}</p>
					<Collapsible trigger="Schools">
						{schools}
					</Collapsible>
					<Collapsible trigger="Rules and Regulations">
						<p>Click <a target="_blank" href={group.rules}>here</a> to view the Rules and Regulations for {group.name} </p>
					</Collapsible>
					<Collapsible trigger="General Information">
						<div className="row">
							<div className="col-xs-11">
								<h3>Emergency Contact Information</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-11">
								<ul>
									<li>In case of a life threatning emergency call <b>911</b></li>
									<li><b>Police Department</b>: <a href="tel:`${group.emergency.police}`">{group.emergency.police}</a></li>
									<li><b>Fire Department</b>: <a href="tel:'${group.emergency.fire}`">{group.emergency.fire}</a></li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-11">
								<h3>Utility Contact Information</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-11">
								<ul>
									<li><b>Water and Sewage</b>: {group.utility.water.name} <a href="tel:`${group.utility.water.tel}`">{group.utility.water.tel}</a></li>
									<li><b>Electricity</b>: {group.utility.electricity.name} <a href="tel:`${group.utility.electricity.tel}`">{group.utility.electricity.tel}</a></li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-11">
								<h3>Trash Days</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-11">
								<ul>
									{trashDays}
								</ul>
							</div>
						</div>
						{ recycle &&
							<div>
								<div className="row">
									<div className="col-xs-11">
										<h3>Recycle Days</h3>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-11">
										<ul>
											{recycle}
										</ul>
									</div>
								</div>
							</div>
						}
					</Collapsible>

					<footer/>
					
		        </div>
			</div>
		)
	}
}

export default connect(mapToProps, mapDispatchToProps)(GroupView);
