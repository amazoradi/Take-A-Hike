import React, { Component } from 'react';


class Navbar extends Component {

  logoutUser = () => {
    localStorage.removeItem("userId")
    sessionStorage.removeItem("userId")
  }

  render() {
    return (
      <React.Fragment>
        <div>Navbar</div>
        <ul>
          <li>Search</li>
          <li>My Itinerary</li>
          <li>My hikes</li>
          <li>Messages</li>
        </ul>
        <ul>
          <li>Logout</li>
        </ul>
      </React.Fragment>
    )
  }

}

export default Navbar