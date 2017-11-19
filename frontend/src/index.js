import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Image, form, FormGroup, FormControl,ControlLabel, Button} from 'react-bootstrap';
import {Polygon, withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
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
