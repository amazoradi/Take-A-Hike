import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import "./search.css";
import parameters from "../../config/callParams"
import { Input, Icon } from 'semantic-ui-react'
import SearchResultCard from './SearchCard';
import GoogleMapsContainer from './SearchResultMap'

export default class Search extends Component {
  state = {
    users: [],
    trails: [],
    location: "",
    locationLat: "",
    locationLong: "",
    hikes: [],
    name: "",
    hikeLocation: "",
    length: "",
    stars: "",
    summary: "",
    center: {
      lat: "",
      lng: ""
    },
    userCenter: {
      lat: "",
      lng: ""
    }
  }

  getHardCodedTrails = () => {
    const newState = {}
    APIManager.getAllEntries("trails")
      .then(trails => newState.trails = trails)
      .then(() => this.setState(newState))
  }

  getForgeinTrails = () => {
    const newState = {}
    APIManager.getSearchedHikes(`?lat=${this.state.center.lat}&lon=${this.state.center.lng}&maxDistance=30&maxResults=10&key=${parameters.hikingProject}`)
      .then(trails => newState.trails = trails.trails)
      .then(() => this.setState(newState))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  getHardCodedLocations = (locationName) => {
    const newState = {}
    return APIManager.getAllEntries("locations", `/?name=${locationName}`)
      .then(location => {
        newState.locationLat = location[0].latitude
        newState.locationLong = location[0].longitude
      })
      .then(() => this.setState(newState))
      .then(() => this.getForgeinTrails())
      .catch(error => console.error('Error:', error));
  }

  getAnyLocation = (locationName) => {
    const newState = {}
    return APIManager.getAnyLocation(`?address=${locationName}&key=${parameters.google}`)
      .then(location => {
        newState.lat = location.results[0].geometry.location.lat
        newState.lng = location.results[0].geometry.location.lng
      })
      .then(() => this.setState({ center: newState }))
      .then(() => this.getForgeinTrails())
  }

  addHikeCard = hikeCard => {
    APIManager.addEntry("hikes", hikeCard)
  }

  getUserLocation = () => {
    const newState = {}
    let userId = this.props.getCurrentUser()
    APIManager.getEntry("users", userId)
      .then(user => {
        newState.lat = user.center.lat
        newState.lng = user.center.lng
      })
      .then(() => this.setState({ center: newState }))
  }

  render() {
    // this.getUserLocation()
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a hike in a city near you</h2>
          <Input icon placeholder='City' id="location" onChange={this.handleFieldChange} />
          <Icon name='search' link onClick={() => {
            // this.getHardCodedLocations(this.state.location)
            this.getAnyLocation(this.state.location)
          }} />
        </div>
        <div className="searchResultHolder">
          {
            this.state.trails.map(trail =>
              <SearchResultCard key={trail.id} trail={trail} addHikeCard={this.addHikeCard} userCenter={this.state.userCenter} />
            )
          }
        </div>
        <GoogleMapsContainer center={this.state.center} trails={this.state.trails} userCenter={this.state.userCenter} />

      </React.Fragment>
    )
  }
}

