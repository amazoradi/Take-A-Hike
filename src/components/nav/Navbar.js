import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Input, Menu, Segment } from 'semantic-ui-react'


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

              <Link to="/" >
                <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick} />
              </Link>
              <Link to="/itinerary" className="">
                <Menu.Item
                  name='itinerary'
                  active={activeItem === 'itinerary'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="/myHikes" className="">
                <Menu.Item
                  name='My Hikes'
                  active={activeItem === 'My Hikes'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="/messages" className="nav-link">
                <Menu.Item
                  name='messages'
                  active={activeItem === 'messages'}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Link to="/welcome" className="nav-link" onClick={() => this.logoutUser()}>
                <Menu.Item name='Logout' active={activeItem === 'Logout'}
                  onClick={this.handleItemClick} />
              </Link>
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
