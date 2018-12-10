import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import { Button, Header, Image, Modal } from 'semantic-ui-react'

export default class MyHikeList extends Component {
  state = {
    hikes: [],
    currentUserId: this.props.getCurrentUser(),
    completed_message: "",
    date_completed: "",
    open: false,
    editId: ""
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

  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      completed_message: this.state.completed_message,
      date_completed: this.state.date_completed,
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


  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
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
                <p>Message: {hike.completed_message}</p>
                <p>Last Completed On: {hike.date_completed}</p>
              </div>
              <div className="cardButtons">


                <Button onClick={this.show('blurring')}>Add Message</Button>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                  <Modal.Header>Select a Photo</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header>Remember this hike by adding a message</Header>
                      <input id="completed_message" type="text" onChange={this.handleFieldChange} />
                      <input type="date" id="date_completed" onChange={this.handleFieldChange} />
                      <input type="text" className="hide" id="editId" onChange={this.handleFieldChange} defaultValue={hike.id} />
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='black' onClick={this.close}>
                      Cancel
            </Button>
                    <Button
                      positive
                      icon='checkmark'
                      labelPosition='right'
                      content="Add Message"
                      onClick={() => {
                        this.constructNewMessage(`${hike.id}`)
                        this.close()
                      }}
                    />
                  </Modal.Actions>
                </Modal>
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