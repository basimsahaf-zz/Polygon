import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Image,Navbar, Nav, NavItem, MenuItem, form, FormGroup, FormControl,ControlLabel, Button} from 'react-bootstrap';
import ReactMapboxGl, {Geocoder,Type, Source, Layer, Feature } from "react-mapbox-gl";
import {Polygon, withScriptjs, withGoogleMap, GoogleMap, Marker, Map } from "react-google-maps"
import Logo from './img/logo.png';
import PolygonCoords from './strings';


var polygonPlot = [];

function outerCoords(){
  for(var i =0; i < PolygonCoords.length; i++){
    var point = {lat: PolygonCoords[i][1], lng: PolygonCoords[i][0]};
    polygonPlot.push(point);
  }
  console.log(polygonPlot)
  return polygonPlot;
}

var meh = [
      {lat:51.160185, lng:  -114.227256}, // north west
      {lat:51.173012, lng: -113.912980}, // south west
      {lat:50.911104, lng: -113.905542}, // south east
      {lat:50.882954, lng: -114.056171},
      {lat:51.008323, lng: -114.167748},  // north east
      {lat:51.093660, lng: -114.242133}  // north east
];




var markers = [[51.1813062, -114.233482],[51.1813062, -114.2011228],
[51.1813062, -114.1687636],
[51.1813062, -114.1364044],
[51.1813062, -114.1040452],
[51.1813062, -114.071686],
[51.1813062, -114.0393268],
[51.1813062, -114.0069676],
[51.1813062, -113.9746084],
[51.1813062, -113.9422492],
[51.2136654, -114.233482],
[51.2136654, -114.2011228],
[51.2136654, -114.1687636],
[51.2136654, -114.1364044],
[51.2136654, -114.1040452],
[51.2136654, -114.071686],
[51.2136654, -114.0393268],
[51.2136654, -114.0069676],
[51.2136654, -113.9746084],
[51.2136654, -113.9422492],
[51.2460246, -114.233482],
[51.2460246, -114.2011228],
[51.2460246, -114.1687636],
[51.2460246, -114.1364044],
[51.2460246, -114.1040452],
[51.2460246, -114.071686],
[51.2460246, -114.0393268],
[51.2460246, -114.0069676],
[51.2460246, -113.9746084],
[51.2460246, -113.9422492],
[51.2783838, -114.233482],
[51.2783838, -114.2011228],
[51.2783838, -114.1687636],
[51.2783838, -114.1364044],
[51.2783838, -114.1040452],
[51.2783838, -114.071686],
[51.2783838, -114.0393268],
[51.2783838, -114.0069676],
[51.2783838, -113.9746084],
[51.2783838, -113.9422492],
[51.310743, -114.233482],
[51.310743, -114.2011228],
[51.310743, -114.1687636],
[51.310743, -114.1364044],
[51.310743, -114.1040452],
[51.310743, -114.071686],
[51.310743, -114.0393268],
[51.310743, -114.0069676],
[51.310743, -113.9746084],
[51.310743, -113.9422492],
[51.3431022, -114.233482],
[51.3431022, -114.2011228],
[51.3431022, -114.1687636],
[51.3431022, -114.1364044],
[51.3431022, -114.1040452],
[51.3431022, -114.071686],
[51.3431022, -114.0393268],
[51.3431022, -114.0069676],
[51.3431022, -113.9746084],
[51.3431022, -113.9422492],
[51.3754614, -114.233482],
[51.3754614, -114.2011228],
[51.3754614, -114.1687636],
[51.3754614, -114.1364044],
[51.3754614, -114.1040452],
[51.3754614, -114.071686],
[51.3754614, -114.0393268],
[51.3754614, -114.0069676],
[51.3754614, -113.9746084],
[51.3754614, -113.9422492],
[51.4078206, -114.233482],
[51.4078206, -114.2011228],
[51.4078206, -114.1687636],
[51.4078206, -114.1364044],
[51.4078206, -114.1040452],
[51.4078206, -114.071686],
[51.4078206, -114.0393268],
[51.4078206, -114.0069676],
[51.4078206, -113.9746084],
[51.4078206, -113.9422492],
[51.4401798, -114.233482],
[51.4401798, -114.2011228],
[51.4401798, -114.1687636],
[51.4401798, -114.1364044],
[51.4401798, -114.1040452],
[51.4401798, -114.071686],
[51.4401798, -114.0393268],
[51.4401798, -114.0069676],
[51.4401798, -113.9746084],
[51.4401798, -113.9422492],
[51.472539, -114.233482],
[51.472539, -114.2011228],
[51.472539, -114.1687636],
[51.472539, -114.1364044],
[51.472539, -114.1040452],
[51.472539, -114.071686],
[51.472539, -114.0393268],
[51.472539, -114.0069676],
[51.472539, -113.9746084],
[51.472539, -113.9422492]];


class RenderMarkers extends React.Component {
  constructor(props){
    super(props);
    outerCoords();
    console.log(polygonPlot);
    this.props = props;
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat:51.065795, lng: -114.094700}}>
    <RenderMarkers props/>
    <Polygon
      options={{
            strokeColor: '#e74c3c',
            fillColor: '#e74c3c',
            strokeOpacity: 0.28,
            strokeWeight: 1,
            fillOpacity: 0.5
        }}
      paths = {[polygonPlot]}
     />
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
  findMarkers(){
    outerCoords();
  }
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
          loadingElement={<div style={{ height: `100%`, width: `125vh`}} />}
          containerElement={<div style={{ height: `100vh`, width: `125vh` }} />}
          mapElement={<div style={{ height: `100%`, width: `125vh` }} />}
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
