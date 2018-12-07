import React, { Component } from 'react'
import { Button, Icon, Header, Image, Modal, Input, Form, Checkbox } from 'semantic-ui-react'

export default class EditMessageForm extends Component {

  render() {


    return (
      <React.Fragment>
        <div >

          <Form className={this.props.hideEditForm ? 'hide' : null} >
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


{/* <div className={this.props.hideEditForm ? null : "hide"}>
  <Button icon="pencil" onClick={() => {
    this.props.handleEditClick()
    this.props.handleNewEdit(this.props.message.message, this.props.message.imgUrl, this.props.message.id)
  }
  }></Button>
</div> */}

