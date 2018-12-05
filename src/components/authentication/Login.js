import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import "./authentication.css"

export default class Login extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "loginForm"}>
          <div>
            <h2> Login Here </h2>
            <FormGroup>
              <Label for="loginEmail">Email</Label>
              <Input type="email" name="email" id="loginEmail" placeholder="Email@email.com" onChange={this.props.handleFieldChange} />
            </FormGroup>
            <FormGroup>
              <Label for="loginPassword">Password</Label>
              <Input type="password" name="password" id="loginPassword" placeholder="Password" onChange={this.props.handleFieldChange} />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="remember" onChange={this.props.handleCheckbox} />{' '}
                Remember Me
            </Label>
            </FormGroup>
            <Button onClick={() => this.props.handleLogin()}>Login</Button>
          </div>
          <button onClick={() => this.props.handleChangeForm()}>New Here? Click here to register.</button>
        </div>
      </React.Fragment>
    )
  }
}

