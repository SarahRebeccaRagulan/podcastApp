import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'

const Stats = () => {
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

{
  /* <i class=“fas fa-bicycle”></i>
<i class=“fas fa-walking”></i> */
}

export default Stats
