//FUNCTIONAL IMPORTS
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

//DESIGN IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'

// API CALL
const Stats = () => {
  useEffect(() => {
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: 'F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG',
        routeType: 'fastest',
        transportMode: 'AUTO',
        from: 'Toronto',
        to: 'Calgary',
        ambiguities: 'ignore',
      },
    }).then((res) => {
      console.log(res)
    })
  }, [])

  // template literals
  // from: `${startPoint}`,
  //       to: `${endPoint}`,

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

export default Stats
