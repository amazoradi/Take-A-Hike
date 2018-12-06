import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import "./messages.css"

export default class Messages extends Component {

  state = {
    users: [],
    messages: [],
    hideNewForm: true,
    time: "",
    messageText: "",
    messageImg: "",
    editMessageText: "",
    editMessageImg: "",
    editId: "",
    userName: "",
    currentUserId: this.props.getCurrentUser(),
  }

  componentDidMount() {
    const newState = {}
    this.props.getAllUsers()
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("messages"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
    console.log(newState)
    console.log("messages from state", this.state.messages)
  }



  render() {
    return (
      <React.Fragment>
        <h2>My Messages</h2>
        <div className="messageHolder">
          {
            this.state.messages.map(message =>
              <div key={message.id} className="messageCard">
                <p>
                  A note:
                  {message.message}
                </p>
                <img src={message.imgUrl} alt="pretty picture"></img>
              </div>
            )
          }
        </div>
      </React.Fragment>
    )
  }
}