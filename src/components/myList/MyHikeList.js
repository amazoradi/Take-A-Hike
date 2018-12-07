import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"

export default class MyHikeList extends Component {
  state={
    hikes:[]
  }

  getItineraryHikes = () => {
    APIManager.getAllEntries("hikes", "/?completed=true")
  }

  render() {
    return (
      <div>My Hike List</div>
    )
  }
}