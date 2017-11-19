import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Alert,Image, form, FormGroup, FormControl,ControlLabel, Button} from 'react-bootstrap';
import {Polygon, withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import Logo from './img/logo.png';
import PolygonCoords from './strings';
import ReactTooltip from 'react-tooltip';
import Bar from './img/bar.png'
import PolygonJson from './data.json';
import $ from 'jquery';


var polygonPlot;
var colors = ["#27ae60", '#e74c3c', '#f1c40f', '#8e44ad'];
var factors = {
  "setFactor1": {
    "parks": 0.2,
    "school": 0.2,
    "food": 0.1,
    "postSec": 0,
    "transit": 0.3,
    "recreation": 0.2
  },
  "setFactor2": {
    "parks": 0.1,
    "school": 0.3,
    "food": 0.2,
    "postSec": 0.1,
    "transit": 0,
    "recreation": 0.3
  },
  "setFactor3": {
    "parks": 0.3,
    "school": 0.1,
    "food": 0,
    "postSec": 0.3,
    "transit": 0.1,
    "recreation": 0.2
  }
}

var businessType = "";


function decideColour(business, scoreJson) {

  var factorType;

  if(business == "coffee"){
    factorType = factors.setFactor1;
  } else if(business == "retail") {
    factorType = factors.setFactor2;
  } else {
    factorType = factors.setFactor3;
  }

  console.log(factorType);

  var scoreFactor = factorType.parks*scoreJson.parks +
  factorType.school*scoreJson.school + factorType.food*scoreJson.food +
  factorType.postSec*scoreJson.postSec + factorType.transit*scoreJson.transit +
  factorType.recreation*scoreJson.recreation;

  if(scoreFactor >=0 && scoreFactor < 0.20){
    return "#a7ff0b";
  } else if (scoreFactor >= 2 && scoreFactor < 4) {
    return "#a8f51F";
  } else if (scoreFactor >= 4 && scoreFactor < 6) {
    return "#52bfd7";
  } else if (scoreFactor >= 6 && scoreFactor < 8) {
    return "#52a4f8";
  } else if (scoreFactor >= 8 && scoreFactor <= 10) {
    return "#d72a2a";
  } else if (scoreFactor > 10) {
    return "#911b1b";
  }
}

function outerCoords(){
  polygonPlot = PolygonCoords;

  // for(var i =0; i < PolygonCoords.length; i++){
  //   var polygon = []
  //   for(var j = 0; j < PolygonCoords[i].length; j++){
  //     var point = {lat: PolygonCoords[i][j][0], lng: PolygonCoords[i][j][1]};
  //     polygon.push(point);
  //   }
  //   polygonPlot.push(polygon);
  // }
  // console.log(polygonPlot)
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

function onHexagonClick() {
  console.log("Hexagon clicked");
};

// const AlertDismissable = React.createClass({
//   getInitialState() {
//     return {
//       alertVisible: true,
//     };
//   },
//
//   render() {
//     if (this.state.alertVisible) {
//       return (
//         <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
//           <h4>Oh snap! You got an error!</h4>
//           <p>Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
//           <p>
//             <Button bsStyle="danger">Take this action</Button>
//             <span> or </span>
//             <Button onClick={this.handleAlertDismiss}>Hide Alert</Button>
//           </p>
//         </Alert>
//       );
//     }
//
//     return (
//       <Button onClick={this.handleAlertShow}>Show Alert</Button>
//     );
//   },
//
//   handleAlertDismiss() {
//     this.setState({ alertVisible: false });
//   },
//
//   handleAlertShow() {
//     this.setState({ alertVisible: true });
//   },
// });


class RenderPolygons extends React.Component {
  render(){
    return (
      <div>
        {PolygonJson.points.map((item, index) => (
          <Polygon
            data-tip="Score: 10"
            options={{
                  strokeColor: decideColour(businessType, item.score),
                  fillColor: decideColour(businessType, item.score),
                  strokeOpacity: 0.28,
                  strokeWeight: 1,
                  fillOpacity: 0.5
              }}
            paths = {[item.polygon]}
           />
        ))}
        <ReactTooltip />
      </div>
    );
  }
}



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat:51.065795, lng: -114.094700}}>
    <RenderMarkers props/>
    <RenderPolygons/>
  </GoogleMap>
))

function onButtonPress() {
  $(".rightSideBar").css("visibility", "visible");
}


class TwoSections extends React.Component {
  constructor() {
    super();
    this.handleChange;
    this.handleSubmit;
    this.forceUpdateHandler.bind(this);
  }
  handleChange(event){
    businessType = event.target.value;
    console.log(businessType);
  }
  forceUpdateHandler(){
   this.forceUpdate();
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
        <FormControl componentClass="select" defaultValue= {businessType} placeholder="Select" onChange={this.handleChange}>
          <option value="none">{businessType}</option>
          <option value="coffee">Coffee Shop</option>
          <option value="retail">Retail Store</option>
          <option value="restaurant">Restaurant</option>
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
          <Button className="clickButton" bsSize="large" onClick={onButtonPress} block>Predict</Button>
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
