import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Input, Modal } from "semantic-ui-react"
import "./itinerary.css"
import logo from "../../img/Take-a-Hike-Logo.png"

export default class Itinerary extends Component {
  state = {
    hikes: [],
    currentUserId: this.props.getCurrentUser(),
    filterLocation: "",
    public: true,
  }

  componentDidMount() {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  deleteItineraryItem = id => {
    APIManager.deleteEntry("hikes", id)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`))
      .then(hikes => this.setState({ hikes: hikes }))
  }

  addToMyHikes = (id, hikeCard) => {
    const newState = {}
    APIManager.editEntry("hikes", id, hikeCard)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`))
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  getAllHikes = () => {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  filterHikes = locationState => {
    const newState = {}
    APIManager.getAllEntries("hikes", `/?completed=false&hikeState=${locationState}&userId=${this.state.currentUserId}`)
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  makeItPublic = (id, hikeCard) => {
    const newState = {}
    APIManager.editEntry("hikes", id, hikeCard)
      .then(() => APIManager.getAllEntries("hikes", `/?completed=false&userId=${this.state.currentUserId}`))
      .then(hikes => newState.hikes = hikes)
      .then(() => this.setState(newState))
  }

  render() {
    return (
      <div >
        <div className="filterItin">
          <Input id="filterLocation" placeholder="Filter by state name" onChange={this.handleFieldChange} />
          <Button onClick={() => this.filterHikes(this.state.filterLocation)} >Filter</Button>
          <Button onClick={() => this.getAllHikes()} > Show Full Itinerary </Button>
        </div>

        {
          this.state.hikes.map(hike =>
            <div key={hike.id} className={hike.public ? "trailCard public" : "trailCard"}>
              <img src={hike.imageUrl || `${logo}`} alt=""></img>
              <div className="cardText">
                <h2>{hike.name}</h2>
                <h4>{hike.hikeLocation}</h4>
                <h5>{hike.length} miles. {hike.stars} stars out of 5</h5>
                <p>{hike.summary}</p>
                <div className="cardButtons">
                  <Button className="btn" onClick={() => this.deleteItineraryItem(`${hike.id}`)} >Remove</Button>
                  <Button className="btn" onClick={() => this.addToMyHikes(`${hike.id}`, { "completed": true })}>Add to My Hikes</Button>
                  <Modal trigger={<Button onClick={() => {
                    this.makeItPublic(`${hike.id}`, { "public": !hike.public })

                  }}
                  > {hike.public ? "Remove from Public list" : "Make Public"} </Button>}>
                    <Modal.Content>
                      <h2>Add a Message to Share this Hike with the Public</h2>
                      <Input id="public_message" icon="pencil" />
                      <Input type="date" id="public_date" icon="calendar alternate outline" />
                    </Modal.Content>
                    <Modal.Actions>
                      <Button negative>No</Button>
                      <Button positive icon='checkmark' labelPosition='right' content='Sumbit' onClick={()=> this.handleFieldChange()}/>
                    </Modal.Actions>
                  </Modal>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}