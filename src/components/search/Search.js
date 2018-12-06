import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import APIManager from "../../modules/APIManager"
import "./search.css";
import parameters from "../../config/callParams"

export default class Search extends Component {
  state = {
    users: [],
    trails: [],
    location: "",
    locationLat: "",
    locationLong: ""
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

  render() {
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a hike in a city near you</h2>
          <InputGroup >
            <InputGroupAddon addonType="prepend"><Button onClick={() => {
              this.getHardCodedLocations(this.state.location)
            }}
            >Search</Button></InputGroupAddon>
            <Input placeholder="City Name" id="location" onChange={this.handleFieldChange} />
          </InputGroup>
        </div>
        <div className="searchResultHolder">
          {
            this.state.trails.map(trail =>
              <div key={trail.id} className="trailCard">
                <img src={trail.imgSqSmall} atl={trail.imageUrl}></img>
                <div className="cardText">
                  <h2>{trail.name}</h2>
                  <h4>{trail.location}</h4>
                  <h5>{trail.length} miles. {trail.stars} stars out of 5</h5>
                  <p>{trail.summary}</p>
                  <div className="cardButtons">
                    <button className="btn">Add to my Itinerary</button>
                    <button className="btn">Add to My Hikes</button>
                  </div>
                </div>
              </div>
            )
          }

        </div>
      </React.Fragment>
)
  }
}