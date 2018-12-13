import React, { Component } from 'react';
import "./authentication.css"
import { Button, Checkbox, Form, Icon, Input } from 'semantic-ui-react'
import logo from "../../img/Take-a-Hike-Logo.png"


export default class Login extends Component {

  render() {
    return (

      <React.Fragment>
        <div className="welcomePage">
       
        <div className={this.props.hideLoginForm ? "hide" : "loginForm"}>
        <div className="formTitle" >
          <div className="imgDiv">
            <img className="welcomeImg" src={logo} />
          </div>
    
          <h2 className="formTopWords"> Login Here </h2>
          
        </div>
          <Form>
            <Form.Field >
              <label htmlFor="loginEmail">Email</label>
              <Input iconPosition='left' icon={<Icon name='at' />} type="email" placeholder='Email@email.com' id="loginEmail" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">Password</label>
              <Input iconPosition='left' icon={<Icon name='lock' />} type="password" placeholder='Password' id="loginPassword" onChange={this.props.handleFieldChange} />
            </Form.Field>
            <Form.Field>
              <Checkbox type="checkbox" id="remember" label='Remember Me' onChange={this.props.handleCheckbox} />
            </Form.Field>
              <div className="welcomeButton">

            <Button onClick={() => this.props.handleLogin()}>Login</Button>
            <Button onClick={() => this.props.handleChangeForm()}>New Here? Click here to register.</Button>
            </div>
          </Form>
        </div>
         
        </div>
      </React.Fragment>
    )
  }
}
