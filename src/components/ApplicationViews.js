import React, { Component } from 'react';
import APIManager from '../modules/APIManager'
import { Route, Redirect } from 'react-router-dom'
import Search from './search/Search'

export default class ApplicationViews extends Component {

  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  getAllUsers = () => APIManager.getAllEntries("users")

  render(){
    return(
      <React.Fragment>
        <div>ApplicationViews</div>
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Search {...props} />
          } else {
            return <Redirect to="/welcome" />
          }
        }} /> 


      </React.Fragment>
    )
  }
}


// render() {
//   return (
//     <React.Fragment>
//       <Route exact path="/news" render={(props) => {
//         if (this.isAuthenticated()) {
//           return <NewsList getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />
//         } else {
//           return <Redirect to="/welcome" />
//         }
//       }} />

//       <Route exact path="/" render={(props) => {
//         if (this.isAuthenticated()) {
//           return <MessageList {...props}
//             getAllUsers={this.getAllUsers}
//             getCurrentUser={this.getCurrentUser}
//           />
//         } else {
//           return <Redirect to="/welcome" />
//         }
//       }} />
//       <Route exact path="/todos" render={(props) => {
//         if (this.isAuthenticated()) {
//           return <TodoList getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />
//         } else {
//           return <Redirect to="/welcome" />
//         }
//       }} />
//       <Route exact path="/events"
//         render={(props) => {
//           if (this.isAuthenticated()) {
//             return <EventList {...props}
//               getAllUsers={this.getAllUsers}
//               getCurrentUser={this.getCurrentUser} />
//           } else {
//             return <Redirect to="/welcome" />
//           }
//         }} />
//       <Route path="/welcome" render={props => {
//         return (
//           <Welcome getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} {...props} />)
//       }} />
//     </React.Fragment>
//   )
// }