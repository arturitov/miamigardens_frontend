import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import './Header.css';

class Header extends React.Component {
  render(){
    return (
    <Navbar positive navbarCustom staticTop collapseOnSelect style={{margin:'0px'}}>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
              {this.props.appName}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/maintenance">
              <NavItem eventKey={1}>Maintenance Request</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact">
              <NavItem eventKey={2}>Contact Us</NavItem>
            </LinkContainer>
            <LinkContainer to="/application">
              <NavItem eventKey={3}>Application</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
