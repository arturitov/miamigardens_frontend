import React from 'react';
import './Banner.css';
import { Row, Image } from 'react-bootstrap';
import banner from '../imgs/banner-min.png';


const Banner = () => (
	<div className="image">
	    <Row className="show-grid ">
		  <Image src={banner} alt="Banner" responsive />
	    </Row>
	    <Row className="textCenter caption show-grid ">
	    	<h2><span>Explore our Beautiful Properties Below</span></h2>
	    </Row>

    </div>
)

export default Banner;