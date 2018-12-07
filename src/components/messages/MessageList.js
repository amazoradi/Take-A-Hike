import React, { Component } from 'react';
import APIManager from "../../modules/APIManager"
import "./messages.css"
import Moment from 'react-moment';
import { Button, Icon, Header, Image, Modal, Input } from 'semantic-ui-react'
import EditMessageForm from './EditMessageForm';

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
    open: false
  }

  componentDidMount() {
    const newState = {}
    this.props.getAllUsers()
      .then(users => newState.users = users)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
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

  //new message functions

  // posts a new message to the database and then gets all messages and puts them in state
  addNewMessage = newMessage => {
    APIManager.addEntry("messages", newMessage)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => this.setState({messages: messages}))
  }

  //constructor function for a a new mesage
  constructNewMessage = () => {
    const message = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      time: new Date(),
      message: this.state.messageText,
      imgUrl: this.state.messageImg
    }
    // basic form validation, will not let an new message be blank or one space
    // if (this.state.messageText === "" || this.state.messageText === " ") {
    //   alert("Please enter a message")
    // } else {
      this.addNewMessage(message)
    // }
  }

  //delete message
  
  deleteMessage = id => {
    APIManager.deleteEntry("messages", id)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => this.setState({ messages: messages }))
  }

  //edit message

  handleEditFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  editMessage = (id, message) => {
    const newState ={}
    APIManager.editEntry("messages", id, message)
      .then(() => APIManager.getAllEntries("messages", "?_sort=time", "&_order=desc", "&_limit=10", "&_expand=user"))
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))


  }

  constructEditedMessage = () => {
    const editedMessage = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      message: this.state.editMessageText,
      imgUrl: this.state.editMessageImg,
      id:this.state.editId
    }
    console.log(editedMessage)
    this.editMessage(editedMessage.id, editedMessage)
  }



  // modal functions
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, dimmer } = this.state

    return (
      <React.Fragment>
        <div>

          <Button onClick={this.show('blurring')}>New Message</Button>

          <Modal dimmer={dimmer} open={open} onClose={this.close}>
            <Modal.Header>Create a New Message</Modal.Header>
            <Modal.Content /*image*/>
              {/* <Image wrapped size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
              <Modal.Description>
                <Header>Take A Hike, Leave a Message</Header>
                <div>
                  <Input icon placeholder='Message'>
                    <input onChange={this.handleFieldChange} id="messageText"/>
                    <Icon name='pencil alternate' />
                  </Input>
                  <br />
                  <br />
                  <Input iconPosition='left' placeholder='Image'>
                    <Icon name='image' />
                    <input onChange={this.handleFieldChange} id="messageImg" />
                  </Input>
                </div>
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
                content="Save"
                onClick={ () => {
                  this.constructNewMessage()
                  this.close()}}
              />
            </Modal.Actions>
          </Modal>
        </div>
        <h2>{this.state.userName}&#39;s Messages</h2>
        <div className="messageHolder">
          {
            this.state.messages.map(message =>
              <div key={message.id} className="messageCard">
                <h2 className="messageUserName">{message.user.name}</h2>
                <div className="messageContent">
                <img src={message.imgUrl} alt="pretty picture"></img>
                <p>{message.message}</p>
                </div>
                <p><Moment format="MM-DD-YYYY hh:mm a">{message.time}</Moment></p>
               
                <Button icon className="btn deleteButton" onClick={() => this.deleteMessage(`${message.id}`)}>
                  <Icon name='trash alternate outline' />
                </Button>
                <EditMessageForm message={message} constructEditedMessage={this.constructEditedMessage} handleEditFieldChange={this.handleEditFieldChange} messageText={this.state.messageText} messageImg={this.state.messageImg} constructEditedMessage={this.constructEditedMessage}/>
              </div>
            )
          }


          {/* <Button icon className="btn newButton" onClick={this.show('blurring')}> <Icon name='plus square outline' /></Button> */}



        </div>
      </React.Fragment>
    )
  }
}