import React, { Component } from 'react';
import { Button, Icon, Header, Modal, Input } from 'semantic-ui-react'

export default class NewMessageForm extends Component {

  state = {
    open: false,
  }

  // modal functions
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {

    const { open, dimmer } = this.state

    return (
      <div>

        <Button onClick={this.show('blurring')}>New Message</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create a New Message</Modal.Header>
          <Modal.Content /*image*/>
            {/* <Image wrapped size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
            <Modal.Description>
              <Header>Take A Hike, Leave a Message</Header>
              <div>
                <Input icon placeholder='Message'>
                  <input onChange={this.props.handleFieldChange} id="messageText" />
                  <Icon name='pencil alternate' />
                </Input>
                <br />
                <br />
                <Input iconPosition='left' placeholder='Image'>
                  <Icon name='image' />
                  <input onChange={this.props.handleFieldChange} id="messageImg" />
                </Input>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Save"
              onClick={() => {
                this.props.constructNewMessage()
                this.close()
              }}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}

