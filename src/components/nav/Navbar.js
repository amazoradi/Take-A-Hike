import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';


class HikeNavBar extends Component {

  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  logoutUser = () => {
    localStorage.removeItem("userId")
    sessionStorage.removeItem("userId")
  }

  noNavonLogin = () => {
    if (this.isAuthenticated()) {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand >Take a Hike</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link">Search</Link>
              </NavItem>
              <NavItem>
                <Link to="/itinerary" className="nav-link">Itinerary</Link>
              </NavItem>
              <NavItem>
                <Link to="/myHikes" className="nav-link">My Hikes</Link>
              </NavItem>
              <NavItem>
                <Link to="/messages" className="nav-link">Messages</Link>
              </NavItem>
              <NavItem>
                <Link to="/welcome" className="nav-link" onClick={()=> this.logoutUser()}>Logout</Link>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      )
    } else {
      return (
        <div>
          <h2 className="welcomeTitle">Take A Hike</h2>
        </div>
      )
    }
  }
  render() {
    return (
      this.noNavonLogin()
    )
  }
}

export default HikeNavBar
