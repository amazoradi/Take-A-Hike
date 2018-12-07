import React, { Component } from 'react';
import "./authentication.css"
import { Button, Checkbox, Form, Icon, Input } from 'semantic-ui-react'


export default class Login extends Component {

  render() {
    return (
      
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "loginForm"}>
        <h2> Login Here </h2>
        <Form>
        <Form.Field >
          <label for="loginEmail">Email</label>
            <Input iconPosition='left' icon={<Icon name='at' />} type="email" placeholder='Email@email.com' id="loginEmail" onChange={this.props.handleFieldChange} />
        </Form.Field>
        <Form.Field>
          <label for="password">Password</label>
            <Input iconPosition='left' icon={<Icon name='lock' />} type="password" placeholder='Password' id="loginPassword" onChange={this.props.handleFieldChange}/>
        </Form.Field>
        <Form.Field>
            <Checkbox type="checkbox" id="remember" label='Remember Me' onChange={this.props.handleCheckbox} />
        </Form.Field>
          <Button onClick={() => this.props.handleLogin()}>Login</Button>
      </Form>
        <Button onClick={() => this.props.handleChangeForm()}>New Here? Click here to register.</Button>
        </div>
      </React.Fragment>  
    )
  }
}
