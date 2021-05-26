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
  const [startChoice, setStartChoice] = useState('483 Queen St W 3rd floor, Toronto')
  const [endChoice, setEndChoice] = useState('40 Bay St, Toronto, ON')
  const [results, setResults] = useState([])
  const [bicycleTime, setBicycleTime] = useState('')
  const [pedestrianTime, setPedestrianTime] = useState('')
  const [pedestrianTimeInSecs, setPedestrianTimeInSecs] = useState('')

  useEffect(() => {
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: 'F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG',
        routeType: 'pedestrian',
        from: `${startChoice}`,
        to: `${endChoice}`,
        // from: '483 Queen St W 3rd floor, Toronto',
        // to: '40 Bay St, Toronto, ON',
        ambiguities: 'ignore',
      },
    }).then((res) => {
      const walkingTime = res.data.route.formattedTime
      const walkingTimeInSecs = res.data.route.time
      setPedestrianTime(walkingTime)
      setPedestrianTimeInSecs(walkingTimeInSecs)
      setStartChoice(res.data.from)
      setEndChoice(res.data.to)
    })
  }, [startChoice])

  // const handleChange = (event) => {
  //   event.preventDefault()
  //   setStartChoice = event.target.value;
  //   setEndChoice = event.target.value;
  // }

  const handleChange = event =>{
    this.setState({ name: event.target.value});
  }

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      name: this.state.name
    }
    // axios.post('https://jsonplaceholder.typicode.com/users', { user })
      .then(res=>{
        console.log(res);
        console.log(res.data);
      })
  }

  useEffect(() => {
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: 'F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG',
        routeType: 'bicycle',
        from: '483 Queen St W 3rd floor, Toronto',
        to: '40 Bay St, Toronto, ON',
        ambiguities: 'ignore',
      },
    }).then((res) => {
      console.log(res.data.route)
      const milesData = res.data.route.distance * 1.621371
      const distanceData = milesData.toFixed(2)
      setResults(distanceData)
      const bikeTime = res.data.route.formattedTime
      setBicycleTime(bikeTime)
      // setApiLoad(true)
    }) 
    // .catch(errors => alert('Unfortunately, data cannot be loaded at the moment!')
		// );
  }, [])


  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   // check the from and to query area
  //   // run api
    
  // }

  // const handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  return (
    <div className='App'>
      <header className='wrapper'>
        <h1>Podcast Prioritizer</h1>
        <h2>Find the right podcast for your next adventure!</h2>
        <h3>Don't bike and podcast!</h3>
      </header>

      <div>
        <section className='wrapper'>
          <form onSubmit={this.handleSubmit}>
            <div className='inputBox'>
              <label name='startingPoint' aria-label='starting point'>
                <input
                  type='text'
                  placeholder='Starting Point'
                  // onChange={(event) => {
                  //   this.handleOnChange(event)
                  // }}
                  onSubmit={(e) => setStartChoice(e.target.value)}
                  value={startChoice}
                  onChange= {this.handleChange}
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
            <button type="submit">Find a Podcast</button>
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
              <p>Time: {bicycleTime}</p>
            </div>
          </div>

          <div>
            <div className='iconImage'>
              <div className='iconBorder icon'>
                <FontAwesomeIcon className='i' icon={faWalking} size='3x' />
              </div>
            </div>
            <div className='statsBox'>
              <p>Time: {pedestrianTime}</p>
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
