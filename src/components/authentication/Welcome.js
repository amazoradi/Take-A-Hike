import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import Login from "./Login";
import Register from "./Register"

export default class Welcome extends Component {

  // Set initial state
  state = {
    loginEmail: "",
    loginPassword: "",
    remember: false,
    registerEmail: "",
    registerPassword: "",
    registerName: "",
    registerLocation: "",
    hideLoginForm: false,
    currentUser: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    // console.log(stateToChange)
  }

  //handle the checkbox change
  handleCheckbox = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.checked
    this.setState(stateToChange)
  }

  // toggles hideLoginForm state when called
  handleChangeForm = () => {
    const currentState = this.state.hideLoginForm
    this.setState({ hideLoginForm: !currentState })
  };

  // registion functions, cunstructing a new user and posting it to the database
  constructNewUser = () => {
    const user = {
      name: this.state.registerName,
      password: this.state.registerPassword,
      email: this.state.registerEmail,
      location: this.state.registerLocation
    }
    this.registerNewUser(user)
      .then(() => console.log(user))
  }

  registerNewUser = user => {
    return APIManager.addEntry("users", user)
  }
  //  Handle register for new user with form validation and checking database of email
  handleRegister = (e) => {
    if (this.state.registerEmail === "" || this.state.registerName === "" || this.state.registerPassword === "" || this.state.registerLocation === "") {
      alert("No fields should be left blank")
    } else if (this.state.registerEmail.includes("@")) {
      APIManager.getAllEntries("users", `/?email=${this.state.registerEmail}`)
        .then((returns) => {
          if (returns.length > 0) {
            alert("This email is already registered. Please try another.")
          } else {
            this.constructNewUser()
            alert("You are now registered! Please login.")
            this.handleChangeForm()
          }
        })
    } else {
      alert("Please enter a valid email.")
    }
  }


  // Handle for Login (existing user)
  handleLogin = (e) => {
    if (this.state.loginEmail === "" || this.state.loginPassword === "") {
      alert("No fields should be left blank")
    } else {
      APIManager.getAllEntries("users", `/?email=${this.state.loginEmail}&password=${this.state.loginPassword}`)
        .then(returns => {
          if (returns.length < 1) {
            alert("That email doesn't exist or your password doesn't match. Please try again")
          } else if (this.state.remember === false) {
            sessionStorage.setItem("userId", returns[0].id)

            this.setState({
              currentUser: sessionStorage.getItem("userId")
            })

            this.props.history.push("/")
          } else {
            localStorage.setItem("userId", returns[0].id)

            this.setState({
              currentUser: localStorage.getItem("userId")
            })

            this.props.history.push("/")
          }
        })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Login handleLogin={this.handleLogin} handleFieldChange={this.handleFieldChange} handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} handleCheckbox={this.handleCheckbox} />
        <Register constructNewUser={this.constructNewUser} handleFieldChange={this.handleFieldChange} handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} handleRegister={this.handleRegister} />
      </React.Fragment>
    )
  }
}
