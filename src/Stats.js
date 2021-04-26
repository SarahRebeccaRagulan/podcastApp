//FUNCTIONAL IMPORTS
import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

//DESIGN IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import { faWalking } from '@fortawesome/free-solid-svg-icons';


const Stats = () => {
    useEffect(() => {
      axios({
        url: "https://www.mapquestapi.com/directions/v2/route?key=KEY&from=Denver%2C+CO&to=Boulder%2C+CO&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false",
        method: "GET",
        dataResponse: "json",
        params: {
          client_id: "F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG",
          routeType: "FASTEST",
          transportMode: "AUTO"
          messages: 
        },
      }).then((res) => {
        console.log(res);
      })
    }, [])
  
  return (
    <div className='wrapper statsContainer'>
      <div>
        <div className='iconImage'>
          <div className='iconBorder icon'>
            <FontAwesomeIcon className='i' icon={faBicycle} size='3x' />
          </div>
        </div>

        <div className='statsBox'>
          <p>Distance:</p>
          <p>Time:</p>
        </div>
      </div>

      <div>
        <div className='iconImage'>
          <div className='iconBorder icon'>
            <FontAwesomeIcon className='i' icon={faWalking} size='3x' />
          </div>
        </div>
        <div className='statsBox'>
          <p>Distance:</p>
          <p>Time:</p>
        </div>
      </div>
    </div>
  )
}

export default Stats;
