import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "./authentication.css"

export default class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "loginForm"}>
          <h2> Login Here </h2>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="loginEmail" placeholder="Email@email.com" onChange={this.props.handleFieldChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="loginPassword" placeholder="Password" onChange={this.props.handleFieldChange}/>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" id="remember" onChange={this.props.handleCheckbox}/>{' '}
              Remember Me
            </Label>
          </FormGroup>
          <Button>Login</Button>
        </div>
        <button>New here? Click here to Register</button>
      </React.Fragment>
    )
  }
}

