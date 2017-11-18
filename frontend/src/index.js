import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Navbar, Nav, NavItem, MenuItem, form, FormGroup, FormControl,ControlLabel, Button} from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYmFzaW1zYWhhZiIsImEiOiJjamE0bGNhdm43aThwMndwZ2N4Zmk0MnVtIn0.QxAL61I204c3tnV-xz4A4w"
});


class NavbarMenu extends React.Component {
  render(){
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>

          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class TwoSections extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="leftSideBar">
          <div className="logo">Polygon</div>
          <div className="tagLine">Map your dream</div>
          <div class="gps_ring">
            <div class="gps_ring1">
              <div class="gps_ring2"></div>
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
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}>
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
            </Layer>
        </Map>
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
