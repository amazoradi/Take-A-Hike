import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import APIManager from "../../modules/APIManager"
import "./search.css";

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
    APIManager.getSearchedHikes(`?lat=${this.state.locationLat}&lon=${this.state.locationLong}&maxDistance=40&maxResults=25&key=200389138-ef8557e5084696c009019bc9fc1f5687`)
      .then(trails => newState.trails = trails.trails)
      .then(() => this.setState(newState))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // searchHandler = (locationName) => {
  //   APIManager.getAllEntries("locations")
  // }


  getHardCodedLocations = (locationName) => {
    const newState = {}
    return APIManager.getAllEntries("locations", `/?name=${locationName}`)
      .then(location => {
        // console.log(location)
        newState.locationLat = location[0].latitude
        newState.locationLong = location[0].longitude
      })
      .then(() => this.setState(newState))
      .then( () => this.getForgeinTrails())
      .catch(error => console.error('Error:', error));
  }

  // onClick = {() => this.getHardCodedTrails()

  gethikes = () => {
    const newState ={}
    return fetch("https://www.hikingproject.com/data/get-trails?lat=34.4208&lon=-119.6982&maxDistance=40&maxResults=70&key=200389138-ef8557e5084696c009019bc9fc1f5687")
      .then(data => data.json())
      .then(trails => newState.trails = trails.trails)
      .then (() => console.log(newState))
      .then(() => this.setState(newState))
      .then(() => console.log(this.state.trails))
  }


 


  render() {
    return (
      <React.Fragment>
        <div className="searchField">
          <h2 onClick={this.gethikes}>Search for a hike in a city near you</h2>
          <InputGroup >
            <InputGroupAddon addonType="prepend"><Button onClick={() => {
              //  this.getHardCodedTrails()
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
                    <button>Add to my Itinerary</button>
                    <button >Add to My Hikes</button>
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