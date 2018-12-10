import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

export default class MyHikeMessage extends Component {

  render() {

    return (
      <div className={this.props.hideMessageForm ? "hide" : null}>
        <Form>
          <Form.Field >
            <label>Message</label>
            <input onChange={this.props.handleFieldChange} id="completed_message" defaultValue={this.props.hike.completed_message} />
          </Form.Field>
          <Form.Field>
            <label>Date Completed</label>
            <input type="date" onChange={this.props.handleFieldChange} id="date_completed" defaultValue={this.props.hike.date_completed} />
          </Form.Field>
          <Form.Field>
            <input id="editId" className="hide" defaultValue={this.props.hike.id} onChange={this.props.handleFieldChange} />
          </Form.Field>
          <Button onClick={this.props.handleAddMessageClick}>Cancel</Button>
          <Button onClick={() => {
            this.props.handleAddMessageClick()
            this.props.constructNewMessage()
          }}>Submit</Button>
        </Form>
      </div>
    )
  }
}

