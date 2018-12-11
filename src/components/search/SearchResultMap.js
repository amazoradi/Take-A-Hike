// import React from 'react';
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
// import parameters from "../../config/callParams"

// class GoogleMapsContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {}
//     }
//     // binding this to event-handler functions
//     this.onMarkerClick = this.onMarkerClick.bind(this);
//     this.onMapClick = this.onMapClick.bind(this);
//   }
//   onMarkerClick = (props, marker, e) => {
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
//   }
//   onMapClick = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   }
//   render() {
//     const style = {
//       width: '50vw',
//       height: '75vh',
//       'marginLeft': 'auto',
//       'marginRight': 'auto'
//     }

//     var points = [
//       { lat: 39.648209, lng: -75.711185 }
//       { lat: `${this.props.locationLat}`, lng: `${this.props.locationLong}` }
//     ]
//     var bounds = new this.props.google.maps.LatLngBounds();
//     for (var i = 0; i < points.length; i++) {
//       bounds.extend(points[i]);
//     }


//       return (
//         <React.Fragment>
//         <Map
//           google={this.props.google}
//           initialCenter={{
//             lat: 42.39,
//             lng: -72.52
//           }}
//           bounds={bounds}>
       
//         <Marker
//           onClick={this.onMarkerClick}
//           title={'Changing Colors Garage'}
//           position={{ lat: 39.648209, lng: -75.711185 }}
//           name={'Changing Colors Garage'}
//         />
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//         >

//         </InfoWindow>
//       </Map >
//     </React.Fragment >
//     );
//     }
//   }
//   export default GoogleApiWrapper({
//     apiKey: (parameters.google)
// }) (GoogleMapsContainer)


