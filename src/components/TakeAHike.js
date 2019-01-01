import React, { Component } from 'react'
import HikeNavBar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"
import './TakeAHike.css'

export default class TakeAHike extends Component {

  render() {
    return (
      <React.Fragment>
        <HikeNavBar />
        <ApplicationViews />
      </React.Fragment>
    )
  }

}
