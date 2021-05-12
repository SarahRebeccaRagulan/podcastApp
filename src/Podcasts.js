import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([])
  // destructuring would go below

  useEffect(() => {
    axios({
      url: 'https://listen-api.listennotes.com/api/v2/best_podcasts',
      method: 'GET',
      headers: { 'X-ListenAPI-Key': 'd6e3e64e5eec4dd68226157de0098df4' },
      responseType: 'JSON',
      params: {
        language: 'English',
      },
    }).then((res) => {
      // console.log(res)
      // console.log(res.data.podcasts)

      const podcastArray = res.data.podcasts
      setPodcasts(podcastArray)

      // const distanceData = res.data.route.distance
      // setResults(distanceData)
      // const bikeTime = res.data.route.formattedTime
      // setBicycleTime(bikeTime)

      // const distanceData = res.data.route.distance
      // setResults(distanceData)
      // const bikeTime = res.data.route.formattedTime
      // setBicycleTime(bikeTime)
      // .header('X-ListenAPI-Key', 'd6e3e64e5eec4dd68226157de0098df4')
    })
  }, [])

  console.log(podcasts)
  {
    /* {const podcastMap = podcasts.map((element, index, array) => {
            return element.title
            })} */
  }

  // console.log(podcastMap)

  return (
    <div className='wrapper'>
      <h2>Podcasts that match your walking time:</h2>
      <div className='podcastParent'>
        <div className='podcastCard'>
          <div className='podcastStats'>
            {podcasts.map((info) => {
              return (
                <div>
                  <div className='podcastImage'>
                    <img src={info.image} alt={info.title} />
                  </div>
                  <p>Title: {info.title}</p>
                  <p>Description: {info.description}</p>
                  <p>Episode Name:</p>
                  <p>Length:</p>
                  <p>Explicit:</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Podcasts
