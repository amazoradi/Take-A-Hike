import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Input } from "semantic-ui-react"
import MyHikeMessage from "./MyHikeMessage"
import "moment-timezone"
import "./MyHike.css"
import logo from "../../img/Take-a-Hike-Logo.png"
import "../search/search.css"

export default class MyHikeList extends Component {
  state = {
    hikes: [],
    currentUserId: this.props.getCurrentUser(),
    completed_message: "",
    date_completed: "",
    editId: "",
    user_rating: "",
    shownForm: null,
    rating: "",
    filterLocation: "",
  }

  //loads all completed hike for the user on page load
  componentDidMount() {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  //loads all completed hike for the user
  getAllHikes = () => {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  //deletes a hike from the completed list
  deleteMyHike = id => {
    APIManager.deleteEntry("hikes", id)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then(hikes => this.setState({ hikes: hikes }))
  }

  //adds a hike to the itinerary list by changing completed to true
  addToMyItinerary = (id, hikeCard) => {
    const newState = {}
    APIManager.editEntry("hikes", id, hikeCard)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=true&userId=${this.state.currentUserId}`))
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  //filters My Hikes by location passed in
  filterHikes = locationState => {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=true&hikeState=${locationState}&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      completed_message: this.state.completed_message,
      date_completed: this.state.date_completed,
      user_rating: this.state.rating,
      editId: this.state.editId
    }
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

  handleRate = (e, { rating }) => {
    this.setState({ rating })
  }

  render() {
    return (
      <div >
        <div className="filterCards">
          <Input id="filterLocation" placeholder="Filter by state name" onChange={this.handleFieldChange} />
          <Button onClick={() => this.filterHikes(this.state.filterLocation)} > Filter </Button>
          <Button onClick={() => this.getAllHikes()} > All of My Hikes </Button>
        </div>
        {
          this.state.hikes.map(hike =>
            <div key={hike.id} className="trailCard">
              <img src={hike.imageUrl || `${logo}`} alt="Take a Hike" ></img>
              <div className="cardText">
                <h2>{hike.name}</h2>
                <h4>{hike.hikeLocation}</h4>
                <h5>{hike.length} miles. <p className={hike.completed_message.length === 0 ? "hide" : null}>{hike.user_rating} stars out of 5</p></h5>
                <p>{hike.summary}</p>
                <div className={this.state.shownForm ? "hide" : "cardText"}>
                  <p>Message: {hike.completed_message}</p>
                  <p>Last completed on:{hike.date_completed}</p>
                </div>
                <div className={this.state.shownForm ? " hide" : "cardButtons"}>
                  <Button size='medium' onClick={() => {
                    this.handleEditClick(hike.completed_message, hike.date_completed, hike.user_rating, hike.id)
                  }}>
                    {hike.completed_message === "" ? "Add Message" : "Edit Message"}</Button>
                  <Button size='medium' onClick={() => this.addToMyItinerary(`${hike.id}`, { "completed": false })}>Add to My Itinerary</Button>
                  <Button icon="trash" onClick={() => this.deleteMyHike(hike.id)}></Button>
                </div>
                <MyHikeMessage hike={hike} handleFieldChange={this.handleFieldChange} constructNewMessage={this.constructNewMessage} handleNewEdit={this.handleNewEdit} shownForm={this.state.shownForm} handleEditClick={this.handleEditClick} getUserRating={this.getUserRating} handleRate={this.handleRate} rating={this.state.rating} user_rating={this.state.user_rating} />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}