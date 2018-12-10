import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button } from 'semantic-ui-react';

export default class MyHikeList extends Component {
  state = {
    hikes: [],
    currentUserId: this.props.getCurrentUser(),
    completed_message:"",
    date_completed:""
  }

  componentDidMount() {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  deleteMyHike = id => {
    APIManager.deleteEntry("hikes", id)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then(hikes => this.setState({ hikes: hikes }))
  }

  addToMyItinerary = (id, hikeCard) => {
    const newState = {}
    APIManager.editEntry("hikes", id, hikeCard)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log(stateToChange)
  }

  constructNewMessage = id => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      completed_message: this.state.completed_message,
      date_completed: this.state.date_completed,
    }
    this.addMessageToCard(id, message)
  }
  
addMessageToCard = (id, message) => {
  const newState = {}
  APIManager.editEntry("hikes", id, message)
    .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
    .then(hikes => newState.hikes = hikes)
    .then(()=> this.setState(newState))
}

  //TODO:add a way to add a message and a last completed date
  render() {
    return (
      <div>
        {
          this.state.hikes.map(hike =>
            <div key={hike.id} className="hikeCard">
              <img src={hike.imgSqSmall} alt=""></img>
              <div className="cardText">
                <h2>{hike.name}</h2>
                <h4>{hike.location}</h4>
                <h5>{hike.length} miles. {hike.stars} stars out of 5</h5>
                <p>{hike.summary}</p>
              </div>
              <div className="cardButtons">
                <Button className="btn" onClick={() => this.constructNewMessage(`${hike.id}`)}>Add Message</Button>
                <input id="completed_message" type="text" onChange={this.handleFieldChange} />
                <input type="date" id="date_completed" onChange={this.handleFieldChange} />
                <Button className="btn" onClick={() => this.addToMyItinerary(`${hike.id}`, { "completed": false })}>Add to my Itinerary</Button>
                <Button className="btn" onClick={() => this.deleteMyHike(hike.id)}>Delete</Button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}