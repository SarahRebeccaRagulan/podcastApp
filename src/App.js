import './App.css'
import './styles/sass/style.css'
import Podcasts from './Podcasts'

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'

// time = { pedestrianTime }
//483 Queen St W 3rd floor, Toronto

function App(props) {
  const [startChoice, setStartChoice] = useState(
    '483 Queen St W 3rd floor, Toronto'
  )
  const [endChoice, setEndChoice] = useState('40 Bay St, Toronto, ON')
  const [results, setResults] = useState([])
  const [bicycleTime, setBicycleTime] = useState('')
  const [pedestrianTime, setPedestrianTime] = useState('')
  const [pedestrianTimeInSecs, setPedestrianTimeInSecs] = useState('')

  const getRouteData = (from, to, routeType) => {
    return axios({
      url: 'http://www.mapquestapi.com/directions/v2/route',
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: 'F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG',
        routeType: routeType,
        from: from,
        to: to,
        ambiguities: 'ignore',
      },
    })
  }

  const handlePedestrianData = (res) => {
    const walkingTime = res.data.route.formattedTime
    const walkingTimeInSecs = res.data.route.time
    setPedestrianTime(walkingTime)
    setPedestrianTimeInSecs(walkingTimeInSecs)
  }

  const handleBicycleData = (res) => {
    // console.log(res.data.route)
    const milesData = res.data.route.distance * 1.621371
    const distanceData = milesData.toFixed(2)
    setResults(distanceData)
    const bikeTime = res.data.route.formattedTime
    setBicycleTime(bikeTime)
  }

  useEffect(() => {
    getRouteData(startChoice, endChoice, 'pedestrian').then(
      handlePedestrianData
    )
    getRouteData(startChoice, endChoice, 'bicycle').then(handleBicycleData)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    getRouteData(startChoice, endChoice, 'pedestrian').then(
      handlePedestrianData
    )
    getRouteData(startChoice, endChoice, 'bicycle').then(handleBicycleData)
    // console.log(select.target.value)
  }

  return (
    <div className='App'>
      <header>
        <div className='wrapper'>
        <h1>Podcast Prioritizer</h1>
        <h2>Find the right podcast for your next adventure!</h2>
        <h3>Don't bike and podcast!</h3>
        </div>
      </header>

      <div>
        <section className='wrapper'>
          <form onSubmit={handleSubmit}>
            {/* drop down menu */}
            <select name='genre' id='genre' className='genre'>
              {/* <option value="0" disabled="disabled">Choose a genre</option> */}
              <option value="" selected disabled hidden>Choose here</option>
              <option value='144'>Personal Finance</option>
              <option value='151'>Locally Focused</option>
              <option value='88'>Health &amp; Fitness</option>
              <option value='77'>Sports</option>
              <option value='68'>TV &amp; Film</option>
              <option value='133'>Comedy</option>
              <option value='111'>Education</option>
              <option value='168'>Fiction</option>
              <option value='100'>Arts</option>
              <option value='117'>Government</option>
              <option value='125'>History</option>
              <option value='82'>Leisure</option>
              <option value='122'>Society &amp; Culture</option>
              <option value='99'>News</option>
              <option value='132'>Kids &amp; Family</option>
              <option value='69'>Religion &amp; Spirituality</option>
              <option value='93'>Business</option>
              <option value='107'>Science</option>
              <option value='127'>Technology</option>
              <option value='135'>True Crime</option>
              <option value='134'>Music</option>
            </select>
            {/* {console.log(select.target.value)} */}
            <div className='inputBox'>
              <label name='startingPoint' aria-label='starting point'>
                <input
                  type='text'
                  placeholder='Starting Point'
                  value={startChoice}
                  onChange={(e) => setStartChoice(e.target.value)}
                  name='startingPoint'
                  className='nameInput'
                />
              </label>

              <label name='destination' aria-label='destination'>
                <input
                  type='text'
                  placeholder='Destination'
                  value={endChoice}
                  onChange={(e) => setEndChoice(e.target.value)}
                  name='destination'
                  className='nameInput'
                />
              </label>
            </div>
            <button type='submit'>Find a Podcast</button>
            {/* onClick={(event) => handleClick(event, )} */}
          </form>
        </section>

        <div className='wrapper statsContainer'>
          <h2>Distance: {results} km </h2>
          <div>
            <div className='iconImage'>
              <div className='iconBorder icon'>
                <FontAwesomeIcon className='i' icon={faBicycle} size='3x' />
              </div>
            </div>

            <div className='statsBox'>
              <p className='poppins'>Time: {bicycleTime}</p>
            </div>
          </div>

          <div>
            <div className='iconImage'>
              <div className='iconBorder icon'>
                <FontAwesomeIcon className='i' icon={faWalking} size='3x' />
              </div>
            </div>
            <div className='statsBox'>
              <p className='poppins'>Time: {pedestrianTime}</p>
            </div>
          </div>
        </div>
      </div>

      <Podcasts pedestrianTime={pedestrianTimeInSecs} />
      <footer>
        <p className='wrapper'>
          Created by{' '}
          <a href='https://www.ragulancodes.com/' target='_blank'>
            Ragulan Ravi
          </a>
          ,{' '}
          <a href='https://www.rebeccamacdonald.dev/' target='_blank'>
            Rebecca MacDonald
          </a>{' '}
          and{' '}
          <a href='https://www.sarahpcodes.com' target='_blank'>
            Sarah Pilato
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

export default App
