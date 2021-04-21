import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'

const Stats = () => {
  return (
    <div className='wrapper statsContainer'>
      <div>
        <FontAwesomeIcon className='icon' icon={faBicycle} size='3x' />

        <div className='statsBox'>
          <p>Distance:</p>
          <p>Time:</p>
        </div>
      </div>

      <div>
        <FontAwesomeIcon className='icon' icon={faWalking} size='3x' />
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
