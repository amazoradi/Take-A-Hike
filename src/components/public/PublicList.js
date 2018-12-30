import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import logo from "../../img/Take-a-Hike-Logo.png"


export default class Public extends Component {

  state = {
    hikes: [],
    currentUserId: this.props.getCurrentUser(),
  }

  componentDidMount() {
    const newState ={}
    APIManager.getAllEntries("hikes", `/?public=true`)
    .then(hikes => newState.hikes = hikes)
    .then(() => this.setState(newState))
  }

  render() {
    return (
      <div>
        <h2> Public Hikes, Get Out There Everyone </h2>
        {
          this.state.hikes.map(hike =>
            <div key={hike.id} className="trailCard public">
              <img src={hike.imageUrl || `${logo}`} alt=""></img>
              <div className="cardText">
                <h2>{hike.name}</h2>
                <h4>{hike.hikeLocation}</h4>
                <h5>{hike.length} miles. {hike.stars} stars out of 5</h5>
                <p>{hike.summary}</p>
                <p>{hike.public_message}</p>
                <p>{hike.public_date}</p>
                </div>
                </div>
          )}
                
      </div>
    )
  }
}