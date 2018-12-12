import React, { Component } from 'react';
import { Button, Form, Rating } from 'semantic-ui-react'

export default class MyHikeMessage extends Component {

  state = {}

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })
  
  render() {
    console.log(this.state)
    return (
      <div className={this.props.hideMessageForm ? "hide" : null}>
        <Form >
          <Form.Field>
            <Rating icon='star' defaultRating={3} maxRating={5} onRate={this.handleRate}/>
            <pre className="hide">{JSON.stringify(this.state, null, 2)}</pre>
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

