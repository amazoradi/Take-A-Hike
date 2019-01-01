import React, { Component } from 'react'
import APIManager from "../../modules/APIManager"
import "./search.css"
import parameters from "../../config/callParams"
import { Input, Icon, Dropdown, Divider } from 'semantic-ui-react'
import SearchResultCard from './SearchCard'
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
    weather: [],
    weatherLocation: [],
    weaterDescription: [],
    weatherSys: [],
  }

  //calls the hiking project API with lat and lng and a possible search parameter
  getFilteredForgeinTrails = () => {
    const newState = {}
    APIManager.getSearchedHikes(`?lat=${this.state.center.lat}&lon=${this.state.center.lng}&${this.state.searchParam}=${this.state.searchValue}&maxResults=10&key=${parameters.hikingProject}`)
      .then(trails => newState.trails = trails.trails)
      .then(() => this.setState(newState))
  }

  //generic handle function
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //handles the dropdowns for filtering searchs
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
    }
  }

// This functon set the lat and lng of the searched address and calls the function that reutrns the filtered hike results as well as the current weather
  getAnyFilteredLocation = (locationName) => {
    const newState = {}
    return APIManager.getAnyLocation(`?address=${locationName}&key=${parameters.google}`)
      .then(location => {
        newState.lat = location.results[0].geometry.location.lat
        newState.lng = location.results[0].geometry.location.lng
      })
      .then(() => this.setState({ center: newState }))
      .then(() => {
        this.getFilteredForgeinTrails()
        this.getCurrentWeather()
      })
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
  handleSearch = () => {
    if (this.state.location === "") {
      alert("Please enter a location for your next hike.")
    } else {
      this.getAnyFilteredLocation(this.state.location)

    }
  }

//gets current weather information from lat an lng, stores it in state
  getCurrentWeather = () => {
    const newState = {}
    APIManager.getWeather(`lat=${this.state.center.lat}&lon=${this.state.center.lng}&units=imperial&appid=${parameters.weather}`)
      .then(weather => {
        newState.weather = weather.main
        newState.weatherLocation = weather
        newState.weaterDescription = weather.weather[0]
        newState.weatherSys = weather.sys
      })
      .then(() => this.setState(newState))
  }


  render() {
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a Hike Near You</h2>
          <div className="searchInput">
            <Input icon placeholder='City' id="location" onChange={this.handleFieldChange} />
            <Dropdown placeholder='Filters' selection options={searchOptions} id="searchParam" onChange={this.handleDropdownChange} />
            <Input icon placeholder="refine your search" id="searchValue" onChange={this.handleFieldChange} />
            <Icon name='search' link onClick={() => {
              this.handleSearch()
            }} />
          </div>
          <Divider />
        </div>
        <div className={this.state.weather.length === 0 ? "hide" : "weatherWidget"}>
          <div>
            <h3>{this.state.weatherLocation.name}</h3>
            <p>Current temperature: {this.state.weather.temp}° F</p>
          </div>
          <div className="weatherConditions">
            <img src={`http://openweathermap.org/img/w/${this.state.weaterDescription.icon}.png`} alt="current weather" className="weatherIcon"></img>
            <p>{this.state.weaterDescription.description}</p>
          </div>
        </div>
        <div className="searchResultHolder">
          {
            this.state.trails.map(trail =>
              <SearchResultCard key={trail.id} trail={trail} addHikeCard={this.addHikeCard} userCenter={this.state.userCenter} />
            )
          }
        </div>
        <GoogleMapsContainer center={this.state.center} trails={this.state.trails} userCenter={this.state.userCenter} location={this.state.location} />

      </React.Fragment>
    )
  }
}

