import './index.css';
import {React , useState } from 'react';
import CityList from './cityapi.jsx';
var axios = require("axios").default;


function App() {
  var searchvalue = '';
  const [name,setName] = useState([]);
  const [ids,setids] = useState([]);
  const [countries,setcountries] = useState([]);

  const [serialheading, setserialheading] = useState('');
  const [placeheading, setplaceheading] = useState('');
  const [countryheading, setcountryheading] = useState('');


  const [issubmitted, setissubmitted] = useState(false);

  const [cityname,setcityname] = useState('');


  const handletype = (e) => {
    setcityname(e.target.value);
    document.querySelectorAll('table')[0].style.visibility = 'hidden';
    if (issubmitted === true) {
      setName([])
      setids([])
      setcountries([])
      setissubmitted(false)
    }
  }

  const handleSubmit = (e) => {
    document.querySelectorAll('.loader-wrapper')[0].style.visibility = 'visible';

    var options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: {namePrefix: cityname},
      headers: {
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data.data.length);
      document.querySelectorAll('.loader-wrapper')[0].style.visibility = 'hidden';


      if (cityname.length === 0 || response.data.data.length === 0) {
        console.log("No result found");
        document.querySelectorAll('.status h1')[0].style.visibility = 'visible';
        document.querySelectorAll('.status h1')[0].innerText = 'No result found';
      }
      else {
        document.querySelectorAll('table')[0].style.visibility = 'visible';
        document.querySelectorAll('.status h1')[0].style.visibility = 'hidden';
        response.data.data.forEach((item, i) => {
          console.log((i+1) + " " + item.city + " " + item.country + " " + item.countryCode);
          setName(
            function (prevItems) {
              return [...prevItems,item.city]
            }
          );
          setcountries(
            function (prevItems) {
              return [...prevItems,item.country]
            }
          );
          setids(
            function (prevItems) {
              return [...prevItems,i+1]
            }
          );
        });

      }

    }).catch(function (error) {
      document.querySelectorAll('.status h1')[0].style.visibility = 'visible';
      document.querySelectorAll('.status h1')[0].innerText = 'OOPS. Something Went Wrong!';
    });

    setcityname('');
    setissubmitted(true);
    setserialheading('S.NO');
    setplaceheading('Place Name');
    setcountryheading('Country');

    e.preventDefault();
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchbar"></label>

        <div className="inputBox">
          <input type="text" name="searchbar" placeholder="Search Places..." value ={cityname} onChange={handletype}/>
          <button type="button" role="submit" name="searchsubmit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>


      <div className="status">
        <h1></h1>
      </div>

      <div className="loader-wrapper">
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
      </div>

      <table>
        <tr className="headingRow">
          <th>{serialheading}</th>
          <th>{placeheading}</th>
          <th>{countryheading}</th>
        </tr>
        <tr>
          <td>
            {ids.map(
              function (idlist,index) {
                return <CityList
                          id = {idlist}
                        />
              }
            )}
          </td>
          <td>
            {name.map(
              function (citylist,index) {
                return <CityList
                          name = {citylist}
                        />
              }
            )}
          </td>
          <td>
            {countries.map(
              function (countrylist,index) {
                return <CityList
                          country = {countrylist}
                        />
              }
            )}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
