import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Menu } from 'semantic-ui-react'


class HikeNavBar extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  logoutUser = () => {
    localStorage.removeItem("userId")
    sessionStorage.removeItem("userId")
  }

  noNavonLogin = () => {
    const { activeItem } = this.state
    if (this.isAuthenticated()) {
      return (
        < div >
          <Menu pointing secondary>
            <Menu.Item name='Take A Hike' />
            <Menu.Menu position='right'>

              <Menu.Item name='search' active={activeItem === 'search'} as={Link} to="/" onClick={this.handleItemClick} />

              <Menu.Item name='itinerary' active={activeItem === 'itinerary'} as={Link} to="/itinerary" onClick={this.handleItemClick} />

              <Menu.Item name='My Hikes' active={activeItem === 'My Hikes'} as={Link} to="/myHikes" onClick={this.handleItemClick} />

              <Menu.Item name='messages' active={activeItem === 'messages'} as={Link} to="/messages" onClick={this.handleItemClick} />

              <Menu.Item name='Logout' active={activeItem === 'Logout'} as={Link} to="/welcome" onClick={() => {
                this.handleItemClick()
                this.logoutUser()
              }} />

            </Menu.Menu>
          </Menu>
        </div >

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
