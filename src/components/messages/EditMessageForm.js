import React, { Component } from 'react'
import { Button, Icon, Header, Image, Modal, Input } from 'semantic-ui-react'

export default class EditMessageForm extends Component {
  state = {
    open: false
  }

  // modal functions
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
       
        <Button icon="pencil" onClick={this.show('blurred')
          
        
        }></Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Edit Your Message</Modal.Header>
          <Modal.Content /*image*/ >
            {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
            <Modal.Description>
              <Header>Take a Hike, Leave an *edited* Message</Header>
              <Input icon>
                <input onChange={this.props.handleEditFieldChange} id="editMessageText" defaultValue={this.props.message.message} />
                <Icon name='pencil alternate' />
              </Input>
              <br />
              <br />
              <Input iconPosition='left' placeholder='Image'>
            <Icon name='image' />
            <input onChange={this.props.handleEditFieldChange} id="editMessageImg" defaultValue={this.props.message.imgUrl} />
          </Input>
          <input id="editId" className="hide" defaultValue={this.props.message.id} onChange={this.props.handleEditFieldChange} />
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
              content="Save Edits"
              onClick={()=> {
                this.props.handleNewEdit(this.props.message.message, this.props.message.imgUrl, this.props.message.id)
                this.props.constructEditedMessage()
                this.close()}}
            />
          </Modal.Actions>
        </Modal>
      </div >
    )
  }

}


{/* <Button icon onClick={() => this.show('blurring')} >
  <Icon name='pencil alternate' className="editButton" />
</Button> */}

  // <Modal dimmer={dimmer} open={open} onClose={this.close}>
  //   <Modal.Header>Create a New Message</Modal.Header>
  //   <Modal.Content /*image*/>
  //     {/* <Image wrapped size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
  //     <Modal.Description>
  //       <Header>Take A Hike, Leave a Message</Header>
  //       <div>
  //         <Input icon placeholder='Message'>
  //           <input onChange={this.props.handleEditFieldChange} id="editMessageText" /*defaultValue={this.props.messageText}*/ />
  //           <Icon name='pencil alternate' />
  //         </Input>
  //         <br />
  //         <br />
  //         <Input iconPosition='left' placeholder='Image'>
  //           <Icon name='image' />
  //           <input onChange={this.props.handleEditFieldChange} id="editMessageImg" /*defaultValue={this.props.messageImg}*/ />
  //         </Input>
  //       </div>
  //     </Modal.Description>
  //   </Modal.Content>
  //   <Modal.Actions>
  //     <Button color='black' onClick={this.close}>
  //       Cancel
  //           </Button>
  //     <Button
  //       positive
  //       icon='checkmark'
  //       labelPosition='right'
  //       content="Save"
  //       onClick={() => {
  //         this.props.constructEditedMessage()
  //         this.close()
  //       }}
  //     />
  //   </Modal.Actions>
  // </Modal>

