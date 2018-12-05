import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import APIManager from "../../modules/APIManager"
import "./search.css";

export default class Search extends Component {
  state ={
    users: [],
    hikes: []
  }

  // getAllEntries(resourse, ...search) {
  //   return fetch(`${remoteURL}/${resourse}${search}`)
  //     .then(data => data.json())
  // },

getHardCodedHikes = () => {
  const newState ={}
  APIManager.getAllEntries("hikes")
  .then(hikes => newState.hikes = hikes)
  .then( () => this.setState(newState))
}


  render() {
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a hike in a city near you</h2>
          <InputGroup >
            <InputGroupAddon addonType="prepend"><Button onClick={()=> this.getHardCodedHikes()}>Search</Button></InputGroupAddon>
            <Input placeholder="City Name" />
          </InputGroup>
        </div>
        <div className="searchResultHolder">
        {
          this.state.hikes.map(hike => 
            <div key={hike.id} className="hikeCard">
            <h1>{hike.name}</h1>
            <p>{hike.summary}</p>
            </div>
          )
        }

        </div>
      </React.Fragment>
    )
  }
}