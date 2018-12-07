import React, { Component } from 'react';


export default class SearchResultCard extends Component {
  state ={
    name: "",
    hikeLocation: "",
    length: "",
    stars: "",
    summary: ""
  }

  constructHikeCard = () => {
    const hikeCard = {
      userId: +sessionStorage.getItem("userId") || +localStorage.getItem("userId"),
      name: this.props.trail.name,
      hikeLocation: this.props.trail.location,
      length: this.props.trail.length,
      stars: this.props.trail.length,
      summary: this.props.trail.summary,
      completed: false,
      public: false,
      date_completed: "",
      completed_message: ""
    }
    console.log(hikeCard)
    this.props.addHikeCard(hikeCard)
  }

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
          <button  className="btn" onClick={()=> this.constructHikeCard()} >Add to my Itinerary</button>
          <button  className="btn" onClick={()=>{console.log("my hike")}}>Add to My Hikes</button>
        </div>
      </div>
    </div>
  ) 
}

}
