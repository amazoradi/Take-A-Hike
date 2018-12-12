import React, { Component } from "react"
import MessageButtons from "./MessageButtons"
import Moment from 'react-moment';
import 'moment-timezone';
import { Divider } from 'semantic-ui-react'


export default class MessageCard extends Component {

  state = {
    hideEditForm: true
  }
  handleEditClick = () => {
    const currentState = this.state.hideEditForm;
    this.setState({ hideEditForm: !currentState });
  };

  

  render() {
   
    return (

      <div key={this.props.message.id} className={this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId") ? "usercard messageCard" : "otherscard messageCard"}>

        <h2 className={this.state.hideEditForm ? "messageUserName" : "hide"}>{this.props.message.user.name}</h2>
        <Divider />
        <div className={this.state.hideEditForm ? "messageContent" : "hide"}>
          <img src={this.props.message.imgUrl} alt=""></img>
          <p>{this.props.message.message}</p>
        </div>
        <p className={this.state.hideEditForm ? "messageTime" : "hide"}><Moment format="MM-DD-YYYY hh:mm a">{this.props.message.time}</Moment></p>
        <MessageButtons message={this.props.message} constructEditedMessage={this.props.constructEditedMessage} handleEditFieldChange={this.props.handleEditFieldChange} messageText={this.props.messageText} messageImg={this.props.messageImg} handleNewEdit={this.props.handleNewEdit} handleEditClick={this.handleEditClick} hideEditForm={this.state.hideEditForm} deleteMessage={this.props.deleteMessage} />
      </div>

    )
  }
}


