import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import EditMessageForm from "./EditMessageForm"

export default class MessageButtons extends Component {
  buttonsForUser = () => {
    if (this.props.message.userId === +sessionStorage.getItem("userId") || this.props.message.userId === +localStorage.getItem("userId")) {
      return (
        <React.Fragment>
          <div className="messageButtons">
            <div className={this.props.hideEditForm ? "edit__button btn " : "hide"} >
              <Button icon="pencil" className={this.props.hideEditForm ? "edit__button btn btn_small" : "hide"}
                onClick={() => {
                  this.props.handleEditClick()
                  this.props.handleNewEdit(this.props.message.message, this.props.message.imgUrl, this.props.message.id)
                }}
              ></Button>
            </div>
            <div className={this.props.hideEditForm ? "delete__button btn " : "hide"}>
              <Button icon="trash"
                onClick={() => {
                  this.props.deleteMessage(`${this.props.message.id}`)
                  this.props.handleEditClick()
                }}
              >
              </Button>
            </div>
          </div>
          <EditMessageForm message={this.props.message} hideEditForm={this.props.hideEditForm} handleFieldChange={this.props.handleFieldChange} constructNewMessage={this.props.constructNewMessage} constructEditedMessage={this.props.constructEditedMessage} handleEditClick={this.props.handleEditClick} handleEditFieldChange={this.props.handleEditFieldChange} />
        </React.Fragment>
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