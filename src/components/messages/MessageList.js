import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./messages.css"
import MessageCard from "./MessageCard"
import NewMessageForm from "./NewMessageForm"
import { Divider } from "semantic-ui-react"

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
    currentUserId: this.props.getCurrentUser()
  }

  //loads messages when page is loaded
  componentDidMount() {
    const newState = {}
    this.props.getAllUsers()
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=15", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))

    APIManager.getEntry("users", this.state.currentUserId)
      .then((user) => {
        this.setState({ userName: user.name })
      })
  }

  //targets the imput field value to be the setting the state
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // posts a new message to the database and then gets all messages and puts them in state
  addNewMessage = newMessage => {
    APIManager.addEntry("messages", newMessage)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=15", "&_expand=user"))
      .then(messages => this.setState({ messages: messages }))
  }

  //constructor function for a a new mesage
  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      time: new Date(),
      message: this.state.messageText,
      imgUrl: this.state.messageImg
    }
    this.addNewMessage(message)
  }

  //deletes message
  deleteMessage = id => {
    APIManager.deleteEntry("messages", id)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=15", "&_expand=user"))
      .then(messages => this.setState({ messages: messages }))
  }

  //edit message functions

  handleEditFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  editMessage = (id, message) => {
    const newState = {}
    APIManager.editEntry("messages", id, message)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=15", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
  }

  constructEditedMessage = () => {
    const editedMessage = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      message: this.state.editMessageText,
      imgUrl: this.state.editMessageImg,
      id: this.state.editId
    }
    this.editMessage(editedMessage.id, editedMessage)
  }

  handleNewEdit = (editMessageText, editMessageImg, editId) => {
    this.setState({
      editMessageText: editMessageText,
      editMessageImg: editMessageImg,
      editId: editId,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="messageBoard bryans__class">
          <h2 className="sectionTitle">{this.state.userName}&#39;s Messages</h2>
          <NewMessageForm handleFieldChange={this.handleFieldChange} constructNewMessage={this.constructNewMessage} />
          <Divider />
          <div className="messageHolder">
            {
              this.state.messages.map(message =>
                <MessageCard key={message.id} message={message} constructEditedMessage={this.constructEditedMessage} handleEditFieldChange={this.handleEditFieldChange} messageText={this.state.messageText} messageImg={this.state.messageImg} handleNewEdit={this.handleNewEdit} hideEditForm={this.state.hideEditForm} deleteMessage={this.deleteMessage} />
              )
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}


