import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"

export default class EditMessageForm extends Component {

  render() {
    return (
      <React.Fragment>
        <div >

          <Form className={this.props.hideEditForm ? "hide" : null} >
            <Form.Field >
              <label>Message</label>
              <input onChange={this.props.handleEditFieldChange} id="editMessageText" defaultValue={this.props.message.message} />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <input onChange={this.props.handleEditFieldChange} id="editMessageImg" defaultValue={this.props.message.imgUrl} />
            </Form.Field>
            <Form.Field>
              <input id="editId" className="hide" defaultValue={this.props.message.id} onChange={this.props.handleEditFieldChange} />
            </Form.Field>
            <Button onClick={this.props.handleEditClick}>Cancel</Button>
            <Button onClick={() => {
              this.props.handleEditClick()
              this.props.constructEditedMessage()
            }}>Submit</Button>
          </Form>
        </div>
      </React.Fragment>
    )
  }

}

