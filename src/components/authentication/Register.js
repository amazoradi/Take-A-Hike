import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import "./authentication.css"
import logo from "./Take-a-Hike-Logo.png"

export default class Register extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "loginForm" : "hide"}>
          <div className="formTitle" >
            <div className="imgDiv">
              <img className="welcomeImg" src={logo} />
            </div>

            <h2 className="formTopWords"> Register Here </h2>
          </div>
          <Form>
            <Form.Field>
              <label htmlFor="registerName">Name</label>
              <Input iconPosition='left' icon={<Icon name='user outline' />} type="text" placeholder='Joe Shepard' id="registerName" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="registerEmail">Email</label>
              <Input iconPosition='left' icon={<Icon name='at' />} type="email" placeholder='Email@email.com' id="registerEmail" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="registerPassword">Password</label>
              <Input iconPosition='left' icon={<Icon name='lock' />} type="password" placeholder='Password' id="registerPassword" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="registerLocation">Your Location</label>
              <Input iconPosition='left' icon={<Icon name='map outline' />} type="text" placeholder="You're current city" id="registerLocation" onChange={this.props.handleFieldChange} />
            </Form.Field>
          </Form>
          <div className="welcomeButton">
            <Button onClick={() => this.props.handleRegister()}>Register</Button>
            <Button onClick={() => this.props.handleChangeForm()}>Return to login</Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
