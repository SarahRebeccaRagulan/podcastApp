import './App.css'
import './styles/sass/style.css'
import Podcasts from './Podcasts'

// import Background from 'images/confetti.png'

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
  const [searchQuery, setSearchQuery] = useState('')


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

  // const handlePodcastData = searchQuery

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
        <div className='allButChev wrapper'>
          <div className='headerText'>
            <h1>Podcast Prioritizer</h1>
            <p>Find a Podcast that you can listen to while you walk!</p>
            <p>
              Enter your route below and you’ll be provided with several
              podcasts that are under your walking time.
            </p>
            <p>P.S Don’t bike with headphones - it's dangerous!</p>
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
        <svg viewBox='0 0 68 33' class='chevronDown'>
          <path d='M.58 3.414l27.432 27.433c2.715 2.715 7.167 2.787 9.964.164L67.356 3.46 64.62.54 35.24 28.093c-1.222 1.146-3.212 1.114-4.4-.075L3.408.586.579 3.414z'></path>
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

              <label name='searchBox' aria-label='search box'>
                Topic
              <input
                  type='text'
                  placeholder='ie. money'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              </label>

            </div>
            <button type='submit'>Submit</button>
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

      <Podcasts pedestrianTime={pedestrianTimeInSecs} searchQuery={searchQuery}/>
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
