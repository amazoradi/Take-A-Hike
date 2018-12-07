import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button } from 'semantic-ui-react';

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
              <img src={hike.imgSqSmall} alt=""></img>
              <div className="cardText">
                <h2>{hike.name}</h2>
                <h4>{hike.location}</h4>
                <h5>{hike.length} miles. {hike.stars} stars out of 5</h5>
                <p>{hike.summary}</p>
              </div>
              <div className="cardButtons"> 
                <Button className="btn" onClick={() => console.log("heloooo 1")}>Add Message</Button>
                <Button className="btn" onClick={() => console.log("to itinerary")}>Add to my Itinerary</Button>
                <Button className="btn" onClick={() => console.log("delte")}>Delete</Button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}