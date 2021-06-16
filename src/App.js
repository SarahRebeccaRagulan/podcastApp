import './App.css'
import './styles/sass/style.css'
import Podcasts from './Podcasts'

// import Background from 'images/confetti.png'

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
        <div className='allButChev'>
          <div className='headerText'>
            <h1>Podcast Prioritizer</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              asperiores similique velit corrupti tenetur cumque quas, ad pariatur
              nisi nihil?
          </p>
          </div>
          <div className='headerImage'>
            <div className='headphoneGirl'>
              <img
                src='images/headerImage.png'
                alt='blue haired girl listening to music with a confetti background'
              />
            </div>
          </div>
        </div>
        <svg viewBox="0 0 68 33" class="chevronDown">
          <path d="M.58 3.414l27.432 27.433c2.715 2.715 7.167 2.787 9.964.164L67.356 3.46 64.62.54 35.24 28.093c-1.222 1.146-3.212 1.114-4.4-.075L3.408.586.579 3.414z"></path>
        </svg>
      </header>
      <div>
        <section className='wrapper'>
          <form onSubmit={handleSubmit}>
            {/* drop down menu */}

            {/* {console.log(select.target.value)} */}
            <div className='inputBox'>
              <label name='startingPoint' aria-label='starting point'>
                {' '}
                Starting Point
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
                {' '}
                Destination
                <input
                  type='text'
                  placeholder='Destination'
                  value={endChoice}
                  onChange={(e) => setEndChoice(e.target.value)}
                  name='destination'
                  className='nameInput'
                />
              </label>

              <label
                className='dropDown'
                name='destination'
                aria-label='destination'
              >
                {' '}
                Select A Genre{' '}
                <select name='genre' id='genre' className='genre'>
                  {' '}
                  {/* <option value="0" disabled="disabled">Choose a genre</option> */}
                  <option value='' selected disabled hidden>
                    Choose here
                  </option>
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
              </label>
            </div>
            <button type='submit'>Submit</button>
            {/* onClick={(event) => handleClick(event, )} */}
          </form>
        </section>

        <p className='wrapper poppins distanceBox'>Distance: {results} km </p>

        <div className='wrapper statsContainer'>
          <div className='timeBoxes'>
            <div className='statsBox'>
              <p className='poppins'>Walking</p>
              <p className='poppins travelTime'> {pedestrianTime}</p>
            </div>
          </div>
          <div className='timeBoxes'>
            <div className='statsBox'>
              <p className='poppins'>By Bike</p>
              <p className='poppins travelTime'> {bicycleTime}</p>
            </div>
          </div>
          <div className='timeBoxes'>
            <img
              src='images/walkingGirl.png'
              alt='a girl walking to the right'
              className='walkingGirl'
            />
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
