import React, { Component } from 'react';
// import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Button, Checkbox, Form, Icon, Input } from 'semantic-ui-react'

export default class Register extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "loginForm" : "hide"}>
          <h2> Register Here </h2>
          <Form>
            <Form.Field>
              <label for="registerName">Name</label>
              <Input iconPosition='left' icon={<Icon name='user outline' />} type="text" placeholder='Joe Shepard' id="registerName" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <label for="registerEmail">Email</label>
              <Input iconPosition='left' icon={<Icon name='at' />} type="email" placeholder='Email@email.com' id="registerEmail" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <label for="registerPassword">Password</label>
              <Input iconPosition='left' icon={<Icon name='lock' />} type="password" placeholder='Password' id="registerPassword" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field check>
              <label for="registerLocation">Your Location</label>
              <Input iconPosition='left' icon={<Icon name='map outline' />} type="text" placeholder="You're current city" id="registerLocation" onChange={this.props.handleFieldChange} />
            </Form.Field>
          </Form>
          <Button onClick={() => this.props.handleRegister()}>Register</Button>
          <Button onClick={() => this.props.handleChangeForm()}>Return to login</Button>
        </div>
      </React.Fragment>
    )
  }
}
