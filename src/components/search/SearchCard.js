import React, { Component } from 'react';
import logo from "../../img/Take-a-Hike-Logo.png"


export default class SearchResultCard extends Component {
  state = {
    name: "",
    hikeLocation: "",
    length: "",
    stars: "",
    summary: ""
  }

  constructItineraryHikeCard = () => {
    const hikeCard = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      name: this.props.trail.name,
      hikeLocation: this.props.trail.location,
      hikeState: this.props.trail.location.split(", ")[1],
      length: this.props.trail.length,
      stars: this.props.trail.stars,
      summary: this.props.trail.summary,
      completed: false,
      public: false,
      date_completed: "",
      completed_message: "",
      imageUrl: this.props.trail.imgSqSmall
    }
    this.props.addHikeCard(hikeCard)
  }

  constructCompletedHikeCard = () => {
    const hikeCard = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      name: this.props.trail.name,
      hikeLocation: this.props.trail.location,
      hikeState: this.props.trail.location.split(", ")[1],
      length: this.props.trail.length,
      stars: this.props.trail.stars,
      summary: this.props.trail.summary,
      completed: true,
      public: false,
      date_completed: "",
      completed_message: "",
      imageUrl: this.props.trail.imgSqSmall
    }
    this.props.addHikeCard(hikeCard)
  }

  render() {

    return (
      <div key={this.props.trail.id} className="trailCard">
        <img src={this.props.trail.imgSqSmall || `${logo}`} alt="" ></img>
        <div className="cardText">
          <h2>{this.props.trail.name}</h2>
          <h4>{this.props.trail.location}</h4>
          <h5>{this.props.trail.length} miles. {this.props.trail.stars} stars out of 5</h5>
          <p>{this.props.trail.summary}</p>
          <div className="cardButtons">
            <button className="btn" onClick={() => {
              this.constructItineraryHikeCard()
              alert(`${this.props.trail.name} added to your itinerary. Happy hiking!`)
            }} >Add to My Itinerary</button>
            <button className="btn" onClick={() => {
              this.constructCompletedHikeCard()
              alert(`${this.props.trail.name} added your list of completed hikes. Well done!`)
            }}>Add to My Hikes</button>
          </div>
        </div>
      </div>
    )
  }
}

