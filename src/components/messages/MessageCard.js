import React, { Component } from "react"
import MessageButtons from "./MessageButtons"
import Moment from 'react-moment';
import 'moment-timezone';


export default class MessageCard extends Component {


  render() {
    return (

    <div key={this.props.message.id} className="messageCard">
    
      <h2 /*className={this.state.hideEditForm ? "messageUserName" : "hide"}*/>{this.props.message.user.name}</h2>
      <div /*className={this.state.hideEditForm ? "messageContent" : "hide"}*/>
        <img src={this.props.message.imgUrl} alt="pretty picture"></img>
        <p>{this.props.message.message}</p>
      </div>
      <p><Moment format="MM-DD-YYYY hh:mm a">{this.props.message.time}</Moment></p>
      <MessageButtons message={this.props.message} constructEditedMessage={this.props.constructEditedMessage} handleEditFieldChange={this.props.handleEditFieldChange} messageText={this.props.messageText} messageImg={this.props.messageImg} handleNewEdit={this.props.handleNewEdit} handleEditClick={this.props.handleEditClick} hideEditForm={this.props.hideEditForm} deleteMessage={this.props.deleteMessage} />
    </div> 

    )
  }
}


