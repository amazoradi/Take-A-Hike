import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button } from 'semantic-ui-react';

export default class Itinerary extends Component {
  state={
    hikes:[],
    currentUserId: this.props.getCurrentUser()
  }

 componentDidMount() {
    const newState={}
    APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))    
  }

  deleteItineraryItem = id => {
    APIManager.deleteEntry("hikes", id)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`) )
      .then( hikes => this.setState({ hikes:hikes }))
  }

  render() {
    return (
      <div>
      {
        this.state.hikes.map(hike => 
          <div key={hike.id}>
            <img src={hike.imageUrl} alt=""></img>
            <div className="cardText">
              <h2>{hike.name}</h2>
              <h4>{hike.location}</h4>
              <h5>{hike.length} miles. {hike.stars} stars out of 5</h5>
              <p>{hike.summary}</p> 
              </div>
              <div className="cardButtons">
                <Button className="btn" onClick={() => this.deleteItineraryItem(`${hike.id}`)} >Remove</Button>
                <Button className="btn" onClick={() => console.log("to gikes")}>Add to My Hikes</Button>
              </div>
              </div>
              )
      }
      </div>
    )
  }
}
  

// "userId": 1,
//       "name": "Mount Mitchell - Black Mountain Crest Trail #179",
//       "hikeLocation": "Burnsville, North Carolina",
//       "length": 12.1,
//       "stars": 12.1,
//       "summary": "The highest, most airy ridge traverse in the east and a destination hike not to be taken lightly.",
//       "completed": false,
//       "public": false,
//       "date_completed": "",
//       "completed_message": "",
//       "id": 3