import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"

export default class MyHikeList extends Component {
  state = {
    hikes:[]
  }

  componentDidMount() {
    const newState={}
    APIManager.getAllEntries("hikes", "/?completed=true")
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  render() {
    return (
      <div>
        {
          this.state.hikes.map(hike =>
            <div key={hike.id}>
              <img src={hike.imgSqSmall} atl={hike.imageUrl}></img>
              <div className="cardText">
                <h2>{hike.name}</h2>
                <h4>{hike.location}</h4>
                <h5>{hike.length} miles. {hike.stars} stars out of 5</h5>
                <p>{hike.summary}</p>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}