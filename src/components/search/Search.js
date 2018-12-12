import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import "./search.css";
import parameters from "../../config/callParams"
import { Input, Icon, Dropdown, Divider} from 'semantic-ui-react'
import SearchResultCard from './SearchCard';
import GoogleMapsContainer from './SearchResultMap'


const searchOptions = [
  { value: "null", text: "No Filter", id: "null" },
  { value: "maxDistance", text: "Distance from Location", id: "searchParam" },
  { value: "minLength", text: "Minimum Trail Length", id: "searchParam" },
  { value: "minStars", text: "Star rating", id: "searchParam" }
]

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
    },
    searchParam: "",
    searchValue: "",
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
  getFilteredForgeinTrails = () => {
    const newState = {}
    // if (this.state.searchParam !== "") {
      APIManager.getSearchedHikes(`?lat=${this.state.center.lat}&lon=${this.state.center.lng}&${this.state.searchParam}=${this.state.searchValue}&maxResults=10&key=${parameters.hikingProject}`)
        .then(trails => newState.trails = trails.trails)
        .then(() => this.setState(newState))
        .then(()=> console.log("I successfully filtered by:", this.state.searchParam))
    // }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log("id:", evt.target.id, "value:", evt.target.value)
  }

  handleDropdownChange = (evt) => {
    let value;
    const newState = {};
    if (evt.target.className !== "text" && evt.target.firstChild.className !== "text") {
      console.log("do nothing")
    } else if (evt.target.className === "text") {
      if (evt.target.innerText.includes("Distance from Location")) {
        value = "maxDistance"
        newState.searchParam = value
        this.setState(newState)
      } else if (evt.target.innerText.includes("Minimum Trail Length")) {
        value = "minLength"
        newState.searchParam = value
        this.setState(newState)
      } else if (evt.target.innerText.includes("Star rating")) {
        value = "minStars"
        newState.searchParam = value
        this.setState(newState)
      }
      console.log("first if", "state.searchparam:", newState.searchParam);
    } else {
      if (evt.target.firstChild.innerText.includes("Distance from Location")) {
        value = "maxDistance"
        newState.searchParam = value
        this.setState(newState)
      } else if (evt.target.firstChild.innerText.includes("Minimum Trail Length")) {
        value = "minLength"
        newState.searchParam = value
        this.setState(newState)
      } else if (evt.target.firstChild.innerText.includes("Star rating")) {
        value = "minStars"
        newState.searchParam = value
        this.setState(newState)
      }
      console.log("the else:", "state.searchparam:", newState.searchParam);
    }
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
//refactor to an if statement later
  getAnyFilteredLocation = (locationName) => {
    const newState = {}
    return APIManager.getAnyLocation(`?address=${locationName}&key=${parameters.google}`)
      .then(location => {
        newState.lat = location.results[0].geometry.location.lat
        newState.lng = location.results[0].geometry.location.lng
      })
      .then(() => this.setState({ center: newState }))
      .then(() => this.getFilteredForgeinTrails())
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
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a hike near you</h2>
          {/* <Input icon placeholder='City' id="location" onChange={this.handleFieldChange} />
          <Icon name='search' link onClick={() => {
            this.getAnyLocation(this.state.location) */}
          {/* }} /> */}
          <div>

          <Input icon placeholder='City' id="location" onChange={this.handleFieldChange} />
          {/* <br/> */}
          <Dropdown placeholder='Filters' selection options={searchOptions} id="searchParam" onChange={this.handleDropdownChange} />
          <Input icon placeholder="refine your search" id="searchValue" onChange={this.handleFieldChange} />
          <Icon name='search' link onClick={() => {
            console.log("from icon click", "searchparam:", this.state.searchParam, "search value:", this.state.searchValue)
            this.getAnyFilteredLocation(this.state.location)
          }} />
          </div>
          <Divider />
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

