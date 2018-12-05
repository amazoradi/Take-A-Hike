import React, { Component } from 'react';
import Navbar from "./nav/Navbar"
import Welcome from "./authentication/Welcome"
import ApplicationViews from "./ApplicationViews"
import './TakeAHike.css';


export default class TakeAHike extends Component {


  
  render() {
    return (
      <React.Fragment>
        <Welcome />
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    )
  }

}
