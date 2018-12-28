import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import parameters from "../../config/callParams"


class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '80vw',
      height: '60vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
   
    return (
      <React.Fragment>
        <Map
          google={this.props.google}
          center={this.props.center}
          // initialCenter={this.props.userCenter}
          zoom={
            11
          }
          style={style}
        >
          {/* <Marker
            key={1}
            onClick={this.onMarkerClick}
            title={this.props.location}
            position={{ lat: this.props.center.lat, lng: this.props.center.lng }}
            name={this.props.location}
          /> */}
          {this.props.trails.map(trail => (

            <Marker
              key={trail.id}
              onClick={this.onMarkerClick}
              title={trail.name}
              position={{ lat: trail.latitude, lng: trail.longitude }}
              name={trail.name}
              summary={trail.summary}
              length={trail.length}
            />

          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h5>{this.state.selectedPlace.name} </h5>
              <p>{this.state.selectedPlace.summary} </p>
              <p>{this.state.selectedPlace.length} miles</p>
            </div>

          </InfoWindow>
        </Map >
      </React.Fragment >
    );
  }
}
export default GoogleApiWrapper({
  apiKey: (parameters.google)
})(GoogleMapsContainer)