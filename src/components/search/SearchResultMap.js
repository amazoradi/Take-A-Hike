import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import parameters from "../../config/callParams"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

 

  static defaultProps = {
    defaultCenter: {
      lat: 34.4208,
      lng: -119.6982
    },
    zoom: 11
  };

  render() {
    console.log("in render", this.props.center)
    console.log("default center", this.props.defaultCenter)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: parameters.google }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          
        >
          {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

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