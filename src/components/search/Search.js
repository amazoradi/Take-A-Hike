import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import "./search.css";
import parameters from "../../config/callParams"
import { Input, Icon } from 'semantic-ui-react'
import SearchResultCard from './SearchCard';

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
  }

  getHardCodedTrails = () => {
    const newState = {}
    APIManager.getAllEntries("trails")
      .then(trails => newState.trails = trails)
      .then(() => this.setState(newState))
  }
 
  getForgeinTrails = () => {
    const newState = {}
    APIManager.getSearchedHikes(`?lat=${this.state.locationLat}&lon=${this.state.locationLong}&maxDistance=40&maxResults=25&key=${parameters.hikingProject}`)
      .then(trails => newState.trails = trails.trails)
      .then(() => this.setState(newState))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
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

  constructHikeCard = () => {
    const hikeCard = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      name: this.state.name,
      hikeLocation: this.state.hikeLocation,
      length: this.state.length,
      stars: this.state.stars,
      summary:this.state.summary,
      completed: false,
      public: false,
      date_completed:"",
      completed_message: ""
    }
    console.log(hikeCard)
    // this.addHikeCard(hikeCard)
  }

  addHikeCard = hikeCard => {
    APIManager.addEntry("hikes", hikeCard)
      // .then(() => APIManager.getAllEntries("hikes"))
      // .then(hikes => this.setState({ hikes: hikes }))
  }


  render() {
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a hike in a city near you</h2>
          <Input icon placeholder='City' id="location" onChange={this.handleFieldChange} />
          <Icon name='search' link='true' onClick={() => {
            this.getHardCodedLocations(this.state.location)
          }}/>
        </div>
        <div className="searchResultHolder">
          {
            this.state.trails.map(trail =>
              <SearchResultCard key={trail.id} trail={trail} addHikeCard={this.addHikeCard}/>
            )
          }

        </div>
      </React.Fragment>
)
  }
}