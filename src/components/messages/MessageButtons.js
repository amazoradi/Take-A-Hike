
import React, { Component } from "react"
import {Button, Icon} from "semantic-ui-react"
import EditMessageForm from "./EditMessageForm"

export default class MessageButtons extends Component {
  buttonsForUser = () => {
    if (this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId")) {
      return (
        <div className="button__holder">
          <Button className={this.props.hideEditForm ? "edit__button btn btn_small" : "hide"}
            onClick={() => {
              this.props.handleEditClick()
              this.props.handleNewEdit(this.props.message.message, this.props.message.imgUrl, this.props.message.id)
            }}
          >Edit</Button>
          <EditMessageForm message={this.props.message} hideEditForm={this.props.hideEditForm} handleFieldChange={this.props.handleFieldChange} constructNewMessage={this.props.constructNewMessage} constructEditedMessage={this.props.constructEditedMessage} handleEditClick={this.props.handleEditClick} handleEditFieldChange={this.props.handleEditFieldChange} /> 
          <Button className={this.props.hideEditForm ? "delete__button btn btn_small" : "hide"}
            onClick={() => {
              this.props.deleteMessage(`${this.props.message.id}`)
              this.props.handleEditClick()
            }}
        >
          Delete
                </Button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
  render() {
    return (
      this.buttonsForUser()
    )
  }
}