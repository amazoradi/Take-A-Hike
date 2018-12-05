import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export default class Register extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "loginForm" : "hide"}>
          <h2> Register Here </h2>
          <FormGroup>
            <Label for="registerName">Name</Label>
            <Input type="text" name="name" id="registerName" placeholder="Your Name" onChange={this.props.handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="registerEmail">Email</Label>
            <Input type="email" name="email" id="registerEmail" placeholder="Email@email.com" onChange={this.props.handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="registerPassword">Password</Label>
            <Input type="password" name="password" id="registerPassword" placeholder="Password" onChange={this.props.handleFieldChange} />
          </FormGroup>
          <FormGroup check>
            <Label for="registerLocation"> Your Location </Label>
            <Input type="text" name="location" id="registerLocation" placeholder="You're current city" onChange={this.props.handleFieldChange} />

          </FormGroup>
          <Button onClick={() => this.props.handleRegister()}>Register</Button>
          <button onClick={() => this.props.handleChangeForm()}>Return to login</button>
        </div>
      </React.Fragment>
    )
  }
}