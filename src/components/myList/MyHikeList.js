import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button } from 'semantic-ui-react';

export default class MyHikeList extends Component {
  state = {
    hikes:[],
    currentUserId: this.props.getCurrentUser()
  }

  componentDidMount() {
    const newState={}
    APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  deleteMyHike = id => {
    APIManager.deleteEntry("hikes", id)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then( hikes => this.setState({hikes:hikes}))
  }

  addToMyItinerary = (id, hikeCard) => {
    const newState= {}
    APIManager.editEntry("hikes", id, hikeCard)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then(hikes => newState.hikes = hikes)
      .then( () => this.setState(newState))
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
                <Button className="btn" onClick={() => this.addToMyItinerary(`${hike.id}`, {"completed": false})}>Add to my Itinerary</Button>
                <Button className="btn" onClick={() => this.deleteMyHike(hike.id)}>Delete</Button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}