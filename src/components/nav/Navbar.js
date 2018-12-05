import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Navbar, NavbarBrand, Nav,NavbarToggler, Collapse, NavItem } from 'reactstrap';


class HikeNavBar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logoutUser = () => {
    localStorage.removeItem("userId")
    sessionStorage.removeItem("userId")
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Take a Hike</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
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
                <Link to="/welcome" className="nav-link">Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
          <Nav>

          <NavItem>
            <Link to="/welcome" className="nav-link">Logout</Link>
          </NavItem>
          </Nav>
          
        </Navbar>
      </div>
    );
  }
}


export default HikeNavBar


//   render() {
//     return (
//       <React.Fragment>
//         <div>Navbar</div>
//         <ul>
//           <li>Search</li>
//           <li>My Itinerary</li>
//           <li>My hikes</li>
//           <li>Messages</li>
//         </ul>
//         <ul>
//           <li>Logout</li>
//         </ul>
//       </React.Fragment>
//     )
//   }

// }