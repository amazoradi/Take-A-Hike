import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';


class HikeNavBar extends Component {

  logoutUser = () => {
    localStorage.removeItem("userId")
    sessionStorage.removeItem("userId")
  }
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/">Take a Hike</NavbarBrand>
          <Nav tabs className="ml-auto" navbar>
            <NavItem>
              <Link to="/">Search</Link>
            </NavItem>
            <NavItem>
              <Link to="/itinerary">Itinerary</Link>
            </NavItem>
            <NavItem>
              <Link to="/myHikes">My Hikes</Link>
            </NavItem>
            <NavItem>
              <Link to="/messages">Messages</Link>
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