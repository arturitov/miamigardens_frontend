import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';


const Properties = props => {
	if (!props.properties) {
		return (
			<div>
				Loading...
			</div>
		);
	}

	return(
		<div>
			{
				props.properties.map(property => {
					return (
						<div className="col-xs-12 col-sm-6 col-md-6 center-block text-center" key={property._id}>
						<div className="thumbnail">
							<LinkContainer to={`/groups?group=${property._id}`}>
								<h2>{property.name}</h2>
							</LinkContainer>
							<img style={{height:"200px", width:"200px"}} src={property.thumbnail}/>
							<p>{property.address}</p>
						</div>
						</div>
					);
				})
			}
		</div>
	);
}

export default Properties;