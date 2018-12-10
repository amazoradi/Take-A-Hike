import React, { Component } from 'react';


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
      length: this.props.trail.length,
      stars: this.props.trail.stars,
      summary: this.props.trail.summary,
      completed: false,
      public: false,
      date_completed: "",
      completed_message: ""
    }
    this.props.addHikeCard(hikeCard)
  }

  constructCompletedHikeCard = () => {
    const hikeCard = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      name: this.props.trail.name,
      hikeLocation: this.props.trail.location,
      length: this.props.trail.length,
      stars: this.props.trail.stars,
      summary: this.props.trail.summary,
      completed: true,
      public: false,
      date_completed: "",
      completed_message: ""
    }
    this.props.addHikeCard(hikeCard)
  }

  render() {

    return (
      <div key={this.props.trail.id} className="trailCard">
        <img src={this.props.trail.imgSqSmall} alt="" ></img>
        <div className="cardText">
          <h2>{this.props.trail.name}</h2>
          <h4>{this.props.trail.location}</h4>
          <h5>{this.props.trail.length} miles. {this.props.trail.stars} stars out of 5</h5>
          <p>{this.props.trail.summary}</p>
          <div className="cardButtons">
            <button className="btn" onClick={() => this.constructItineraryHikeCard()} >Add to my Itinerary</button>
            <button className="btn" onClick={() => this.constructCompletedHikeCard()}>Add to My Hikes</button>
          </div>
        </div>
      </div>
    )
  }
}

