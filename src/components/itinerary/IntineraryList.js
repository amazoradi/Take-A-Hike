import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"

export default class Itinerary extends Component {
  state={
    hikes:[]
  }

  getItineraryHikes = () => {
    APIManager.getAllEntries("hikes", "/?completed=false" )
  }

  render() {
    return (
      <div>My Itinerary</div>
    )
  }
}