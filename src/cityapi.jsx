import './App.css';
import {React , useState } from 'react';
var axios = require("axios").default;


function CityList(props) {

  return (
    <div>
      <h1>{props.id}</h1>
      <h1>{props.name}</h1>
      <h1>{props.country}</h1>
    </div>
  )

}

export default CityList;
