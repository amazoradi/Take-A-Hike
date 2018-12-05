import React, { Component } from 'react';
import Navbar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"
import './TakeAHike.css';


export default class TakeAHike extends Component {


  
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    )
  }

}
