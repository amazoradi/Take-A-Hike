import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import APIManager from "../../modules/APIManager"
import "./search.css";

export default class Search extends Component {
  state ={
    users: [],
    trails: []
  }

  // getAllEntries(resourse, ...search) {
  //   return fetch(`${remoteURL}/${resourse}${search}`)
  //     .then(data => data.json())
  // },

getHardCodedTrails = () => { 
  const newState ={}
  APIManager.getAllEntries("trails")
  .then(trails => newState.trails = trails)
  .then( () => this.setState(newState))
}


  render() {
    return (
      <React.Fragment>
        <div className="searchField">
          <h2>Search for a hike in a city near you</h2>
          <InputGroup >
            <InputGroupAddon addonType="prepend"><Button onClick={()=> this.getHardCodedTrails()}>Search</Button></InputGroupAddon>
            <Input placeholder="City Name" />
          </InputGroup>
        </div>
        <div className="searchResultHolder">
        {
          this.state.trails.map(trail => 
            <div key={trail.id} className="trailCard">
            <h1>{trail.name}</h1>
                <img src={trail.imgSqSmall} atl={trail.imageUrl}></img>
            <p>{trail.summary}</p>
            </div>
          )
        }

        </div>
      </React.Fragment>
    )
  }
}