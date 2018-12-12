import React, { Component } from 'react';
import { Button, Form, Rating } from 'semantic-ui-react'

export default class MyHikeMessage extends Component {

  render() {

    return (
      <div className={`${this.props.shownForm === this.props.hike.id ? null : 'hide'}`}  >
        <Form >
          <Form.Field>
            <Rating icon='star' defaultRating={this.props.hike.user_rating} maxRating={5} onRate={this.props.handleRate} />
            <pre className="hide">{JSON.stringify(this.props.rating, null, 2)}</pre>
          </Form.Field>
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
          <Button onClick={() => {
            this.props.handleEditClick()
          }}>Cancel</Button>
          <Button onClick={() => {
            this.props.handleEditClick()
            this.props.constructNewMessage()
            console.log(this.props.rating)
          }}>Submit</Button>
        </Form>
      </div>
    )
  }
}

