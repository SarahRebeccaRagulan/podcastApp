import './App.css'
import './styles/sass/style.css'
import Podcasts from './Podcasts'
import Swal from 'sweetalert2'

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App(props) {
  const [startChoice, setStartChoice] = useState('')
  const [endChoice, setEndChoice] = useState('')
  const [results, setResults] = useState([])
  const [bicycleTime, setBicycleTime] = useState('')
  const [pedestrianTime, setPedestrianTime] = useState('')
  const [pedestrianTimeInSecs, setPedestrianTimeInSecs] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [podcasts, setPodcasts] = useState([])

  console.log(results)

  const getRouteData = (from, to, routeType) => {
    console.log('1')
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
//for catching errors in a chain
  // .then(res => {
  //   if(res.data.info.statuscode !== 500) {
  //     return res;
  //   } else {
  //     throw(new Error('Error on Route Data'));
  //   }
  // }
  // )


  // https://developer.mapquest.com/documentation/search-api/v2/points/

  const handlePedestrianData = (res) => {
    
    if (res.data.info.statuscode !== 500){
    const walkingTime = res.data.route.formattedTime
    const walkingTimeInSecs = res.data.route.time
    setPedestrianTime(walkingTime)
    setPedestrianTimeInSecs(walkingTimeInSecs)
  }else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Make sure your input fields are formatted correctly.',
    })
  }
  }

  const handleBicycleData = (res) => {
    // console.log(res.data.route)
    if (res.data.info.statuscode !== 500){

    const milesData = res.data.route.distance * 1.621371
    const distanceData = milesData.toFixed(2)
    setResults(distanceData)
    const bikeTime = res.data.route.formattedTime
    setBicycleTime(bikeTime)
  }else {
    console.log('error in one of the input fields')
  }
  }

  const getPodcastData = (q) => {
      return axios({
        url: 'https://listen-api.listennotes.com/api/v2/search',
        method: 'GET',
        headers: { 'X-ListenAPI-Key': 'd6e3e64e5eec4dd68226157de0098df4' },
        dataResponse: 'json',
        params: {
          language: 'English',
          q: q,
          len_min: 10,
        },
      })
  }

  // .catch(alert('hey'))

  // const handlePodcastData = searchQuery



  useEffect(() => {
    if (results.length > 0) {
      getRouteData(startChoice, endChoice, 'pedestrian').then(
        handlePedestrianData
      )

      getRouteData(startChoice, endChoice, 'bicycle').then(handleBicycleData)
    }
  })
  //removed empty [] in above useEffect
  
  const handleSubmit = (event) => {
    event.preventDefault()

    getRouteData(startChoice, endChoice, 'pedestrian').then(
      handlePedestrianData
    )

    getRouteData(startChoice, endChoice, 'bicycle').then(handleBicycleData)


    getPodcastData(searchQuery).then((res) => {
      setPodcasts(res.data.results)
    })
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
        <svg viewBox='0 0 68 33' className='chevronDown'>
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
                  required
                  type='text'
                  placeholder='290 Bremner Blvd, Toronto'
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
                  required
                  type='text'
                  placeholder='100 Queen St W, Toronto'
                  value={endChoice}
                  onChange={(e) => setEndChoice(e.target.value)}
                  name='destination'
                  className='nameInput'
                />
              </label>

              <label name='searchBox' aria-label='search box'>
                Topic
                <input
                  required
                  type='text'
                  placeholder='ie. money'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* <select onChange={(e) => setSearchQuery(e.target.value)} name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select> */}
              </label>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </section>

        <p className='wrapper poppins distanceBox'>
          Distance:
          {isNaN(results) ? ' 0' : ' ' + results} km
        </p>

        <div className='wrapper statsContainer'>
          <div className='timeBoxes'>
            <div className='statsBox'>
              <p className='poppins'>Walking</p>
              <p className='poppins travelTime'>
                {pedestrianTime ? pedestrianTime : '00:00:00'}
              </p>
            </div>
          </div>
          <div className='timeBoxes'>
            <div className='statsBox'>
              <p className='poppins'>By Bike</p>
              <p className='poppins travelTime'>
                {bicycleTime ? bicycleTime : '00:00:00'}
              </p>
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
      {/* <p className='poppins'>
              {Podcasts ? 'Podcasts' : ''}</p> */}

      <Podcasts pedestrianTime={pedestrianTimeInSecs} podcasts={podcasts} />
      <footer>
        <p className='wrapper'>
          Created by{' '}
          <a href='https://www.ragulancodes.com/' target='_blank' rel="noreferrer">
            Ragulan Ravi
          </a>
          ,{' '}
          <a href='https://www.rebeccamacdonald.dev/' target='_blank' rel="noreferrer">
            Rebecca MacDonald
          </a>{' '}
          and{' '}
          <a href='https://www.sarahpcodes.com' target='_blank' rel="noreferrer">
            Sarah Pilato
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

export default App
