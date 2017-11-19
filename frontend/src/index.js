import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Image,Navbar, Nav, NavItem, MenuItem, form, FormGroup, FormControl,ControlLabel, Button} from 'react-bootstrap';
import ReactMapboxGl, {Geocoder,Type, Source, Layer, Feature } from "react-mapbox-gl";
import {Polygon, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Logo from './img/logo.png';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYmFzaW1zYWhhZiIsImEiOiJjamE0bGNhdm43aThwMndwZ2N4Zmk0MnVtIn0.QxAL61I204c3tnV-xz4A4w"
});

var outerCoords = [
      {lat:51.160185, lng:  -114.227256}, // north west
      {lat:51.173012, lng: -113.912980}, // south west
      {lat:50.911104, lng: -113.905542}, // south east
      {lat:50.882954, lng: -114.056171},
      {lat:51.008323, lng: -114.167748},  // north east
      {lat:51.093660, lng: -114.242133}  // north east
];

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat:51.065795, lng: -114.094700}}>
    <Polygon
      paths={[outerCoords]}
  />
  <Polygon
    paths={[outerCoords]}
/>
    {props.isMarkerShown && <Marker position={{ lat:51.065795, lng: -114.094700 }} />}
    {props.isMarkerShown && <Marker position={{ lat:52.065795, lng: -112.094700 }} />}
  </GoogleMap>
))


class TryLayer extends React.Component {
  render() {
    return (
    <Layer
      id = 'maine'
      type= 'fill'
      source = {{
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [[[-67.13734351262877, 45.137451890638886],
            [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573401557249, 43.090083319667144],
          [-70.75102474636725, 43.08003225358635],
          [-70.79761105007827, 43.21973948828747],
          [-70.98176001655037, 43.36789581966826],
          [-70.94416541205806, 43.46633942318431],
          [-71.08482, 45.3052400000002],
          [-70.6600225491012, 45.46022288673396],
          [-70.30495378282376, 45.914794623389355],
          [-70.00014034695016, 46.69317088478567],
          [-69.23708614772835, 47.44777598732787],
          [-68.90478084987546, 47.184794623394396],
          [-68.23430497910454, 47.35462921812177],
          [-67.79035274928509, 47.066248887716995],
          [-67.79141211614706, 45.702585354182816],
          [-67.13734351262877, 45.137451890638886]]]
        }
      }
    }}
    layout = {{}}
    paint={{ 'fill-color': '#088',
        'fill-opacity': 0.8 }}/>
      )
    }
}


class MapBoxCustom extends React.Component {
  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[-70.79761105007827, 43.21973948828747]}
        zoom="5"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>
        <TryLayer/>
      </Map>
    );
  }
}


var onSelect = function() {
  return 0;
}


class TwoSections extends React.Component {



  render() {
    return (
      <div className="container">
        <div className="leftSideBar">
          <div className="logo">
            <Image src={Logo} responsive/>
          </div>
          <div className="gps_ring">
            <div className="gps_ring1">
              <div className="gps_ring2"></div>
            </div>
          </div><div className="location"> Calgary, Alberta </div>
          <form className="formFields">
          <h3 className="fieldNames">Enter a location</h3>
            <FormGroup bsSize="large">
              <FormControl type="text" placeholder="Enter a location" />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
        <ControlLabel>Businesss Type</ControlLabel>
        <FormControl componentClass="select" placeholder="Select">
          <option value="none"></option>
          <option value="coffee">Coffee Shop</option>
          <option value="retail">Retail Store</option>
          <option value="restaurant">Restaurant</option>
          <option value="other">...</option>
        </FormControl>
      </FormGroup>
      <h3 className="fieldNames">Enter Monthy Rental Budget($)</h3>
        <FormGroup bsSize="large">
          <FormControl type="text" placeholder="Eg 1000" />
        </FormGroup>
        <h3 className="fieldNames">Keywords (Optional)</h3>
          <FormGroup bsSize="large">
            <FormControl type="text" placeholder="Eg downtown, park etc." />
          </FormGroup>
          </form>
          <Button className="clickButton" bsSize="large" block>Predict</Button>
        </div>
        <div className="rightSideBar">
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%`, width: `150vh`}} />}
          containerElement={<div style={{ height: `100vh`, width: `150vh` }} />}
          mapElement={<div style={{ height: `100%`, width: `150vh` }} />}
        />
        </div>
      </div>
    );
  }
}




class MainPage extends React.Component {
    render(){
        return (
          <div className="main">
            <TwoSections/>
          </div>
        );
    }
}



ReactDOM.render(<MainPage/>, document.getElementById('root'));
