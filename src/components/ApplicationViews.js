import React, { Component } from 'react';
import APIManager from '../modules/APIManager'
import { Route, Redirect } from 'react-router-dom'
import Search from './search/Search'
import MyHikeList from "./myList/MyHikeList"
import Itinerary from "./itinerary/IntineraryList"
import Messages from "./messages/MessageList"
import Welcome from "./authentication/Welcome"
import Public from "./public/PublicList"


export default class ApplicationViews extends Component {

  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  getAllUsers = () => APIManager.getAllEntries("users")


  getCurrentUser = () => {
    const currentUser = +sessionStorage.getItem("userId") || +localStorage.getItem("userId")
    return currentUser
  }

  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Search {...props} getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser}/>
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/itinerary" render={(props) => {
          if (this.isAuthenticated()) {
            return <Itinerary {...props} getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/myHikes" render={(props) => {
          if (this.isAuthenticated()) {
            return <MyHikeList {...props} getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/messages" render={(props) => {
          if (this.isAuthenticated()) {
            return <Messages {...props} getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/public" render={(props) => {
          if (this.isAuthenticated()) {
            return <Public {...props} getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />
          } else {
            return <Redirect to="/welcome" />
          }
        }} />
        <Route exact path="/welcome" render={(props) => {
          return (
            <Welcome {...props} getAllUsers={this.getAllUsers} />
          )
        }} />

      </React.Fragment>
    )
  }
}