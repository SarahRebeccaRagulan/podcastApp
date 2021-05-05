import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Podcasts = () => {
  useEffect(() => {
    axios({
      url: 'https://listen-api.listennotes.com/api/v2/best_podcasts/',
      method: 'GET',
      dataResponse: 'json',
      // header: {
      //   "X-ListenAPI-Key"
      //   "d6e3e64e5eec4dd68226157de0098df4"
      // },
      params: {
        headers: 'd6e3e64e5eec4dd68226157de0098df4',
      },
    }).then((res) => {
      console.log(res)
      // const distanceData = res.data.route.distance
      // setResults(distanceData)
      // const bikeTime = res.data.route.formattedTime
      // setBicycleTime(bikeTime)
    })
  }, [])

  // .header('X-ListenAPI-Key', 'd6e3e64e5eec4dd68226157de0098df4')

  return (
    <div className='wrapper'>
      <h2>Podcasts that match your walking time:</h2>
      <div className='podcastParent'>
        <div className='podcastCard'>
          <div className='podcastImage'>
            <img src='http://placecorgi.com/200/200' />
          </div>

          <div className='podcastStats'>
            <p>Title:</p>
            <p>Description:</p>
            <p>Episode Name</p>
            <p>Length:</p>
            <p>Explicit</p>
          </div>
        </div>

        <div className='podcastCard'>
          <div className='podcastImage'>
            <img src='http://placecorgi.com/200/200' />
          </div>
          <div className='podcastStats'>
            <p>Title:</p>
            <p>Description:</p>
            <p>Episode Name</p>
            <p>Length:</p>
            <p>Explicit</p>
          </div>
        </div>

        <div className='podcastCard'>
          <div className='podcastImage'>
            <img src='http://placecorgi.com/200/200' />
          </div>
          <div className='podcastStats'>
            <p>Title:</p>
            <p>Description:</p>
            <p>Episode Name</p>
            <p>Length:</p>
            <p>Explicit</p>
          </div>
        </div>

        <div className='podcastCard'>
          <div className='podcastImage'>
            <img src='http://placecorgi.com/200/200' />
          </div>
          <div className='podcastStats'>
            <p>Title:</p>
            <p>Description:</p>
            <p>Episode Name</p>
            <p>Length:</p>
            <p>Explicit</p>
          </div>
        </div>

        <div className='podcastCard'>
          <div className='podcastImage'>
            <img src='http://placecorgi.com/200/200' />
          </div>
          <div className='podcastStats'>
            <p>Title:</p>
            <p>Description:</p>
            <p>Episode Name</p>
            <p>Length:</p>
            <p>Explicit</p>
          </div>
        </div>

        <div className='podcastCard'>
          <div className='podcastImage'>
            <img src='http://placecorgi.com/200/200' />
          </div>
          <div className='podcastStats'>
            <p>Title:</p>
            <p>Description:</p>
            <p>Episode Name</p>
            <p>Length:</p>
            <p>Explicit</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Podcasts
