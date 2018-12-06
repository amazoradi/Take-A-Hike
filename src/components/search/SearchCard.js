import React, { Component } from 'react';


export default class SearchResultCard extends Component {

render() {

  return(
    <div key={this.props.trail.id} className="trailCard">
      <img src={this.props.trail.imgSqSmall} atl={this.props.trail.imageUrl}></img>
      <div className="cardText">
        <h2>{this.props.trail.name}</h2>
        <h4>{this.props.trail.location}</h4>
        <h5>{this.props.trail.length} miles. {this.props.trail.stars} stars out of 5</h5>
        <p>{this.props.trail.summary}</p>
        <div className="cardButtons">
          <button className="btn">Add to my Itinerary</button>
          <button className="btn">Add to My Hikes</button>
        </div>
      </div>
    </div>
  )
}

}

