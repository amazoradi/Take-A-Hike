
import React, { Component } from "react"
import {Button, Icon} from "semantic-ui-react"


export default class MessageButtons extends Component {
  buttonsForUser = () => {
    if (this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId")) {
      return (
        <div className="button__holder">
          <Button className={this.props.hideEditForm ? "edit__button btn btn_small" : "hide"}
            onClick={() => {
              this.props.handleEditClick()
              this.props.handleNewEdit(this.props.message.message, this.props.message.id)
            }}
          >Edit</Button>
          {/* <MessageEditForm message={this.props.message} hideEditForm={this.props.hideEditForm} handleFieldChange={this.props.handleFieldChange} constructNewMessage={this.props.constructNewMessage} constructEditMessage={this.props.constructEditMessage} handleEditClick={this.props.handleEditClick} /> */}
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