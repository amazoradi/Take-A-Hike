import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button } from 'semantic-ui-react'
import MyHikeMessage from "./MyHikeMessage"
import 'moment-timezone';

export default class MyHikeList extends Component {
  state = {
    hikes: [],
    currentUserId: this.props.getCurrentUser(),
    completed_message: "",
    date_completed: "",
    editId: "",
    user_rating:"",
    shownForm: null,
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
    console.log(stateToChange)
    this.setState(stateToChange)
  }

  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      completed_message: this.state.completed_message,
      date_completed: this.state.date_completed,
      editId: this.state.editId
    }
    console.log("message to be added", message)
    this.addMessageToCard(message.editId, message)
  }

  addMessageToCard = (id, message) => {
    const newState = {}
    APIManager.editEntry("hikes", id, message)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }


  handleNewEdit = (completed_message, date_completed, editId) => {
    this.setState({
      completed_message: completed_message,
      date_completed: date_completed,
      editId: editId,
    })
  }

  handleEditClick = (completed_message, date_completed, user_rating, editId) => {
    if (this.state.shownForm === null) {
      this.setState({
        shownForm: editId,
        completed_message: completed_message,
        date_completed: date_completed,
        user_rating: user_rating,
        editId: editId
      });
    } else {
      this.setState({
        shownForm: null
      })
    }
  }

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
                <div className={this.state.shownForm ? "hide" : "cardMessage"}>
                  <p>Message: {hike.completed_message}</p>
                  <p>Last Completed On:{hike.date_completed}</p>
                </div>
              </div>
              <div className={this.state.shownForm ? "hide" : "cardButtons"}>
                <Button onClick={() => {
                  this.handleEditClick(hike.completed_message, hike.date_completed, 5, hike.id)
                }}>
                  Add Message</Button>
              </div>
              <MyHikeMessage  hike={hike} handleFieldChange={this.handleFieldChange} constructNewMessage={this.constructNewMessage} handleNewEdit={this.handleNewEdit} shownForm={this.state.shownForm} handleEditClick={this.handleEditClick} />
              
              <div className={this.state.shownForm ? "hide" : "cardButtons"}>
                <Button onClick={() => this.addToMyItinerary(`${hike.id}`, { "completed": false })}>Add to my Itinerary</Button>
                <Button onClick={() => this.deleteMyHike(hike.id)}>Delete</Button>
              </div>
            </div>

          )
        }
      </div>
    )
  }
}