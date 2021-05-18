import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Podcasts = (props) => {
  const [podcasts, setPodcasts] = useState([])
  const [filteredPodcasts, setFilteredPodcasts] = useState([])
  //we want to create a filter that returns podcasts from teh array Podcast that are the same length as the pedestrialTimeInSecs prop
  //go over all of pocast array and look for time 
  //only display if time is less that or = to predestrian time
  //see puppies array for example
  // set filtered poscast usetate in .then  probably with amap or a filter



  // destructuring would go below

  useEffect(() => {
    axios({
      url: 'https://listen-api.listennotes.com/api/v2/episodes/254444fa6cf64a43a95292a70eb6869b/recommendations',
      method: 'GET',
      headers: { 'X-ListenAPI-Key': 'd6e3e64e5eec4dd68226157de0098df4' },
      responseType: 'JSON',
      params: {
        language: 'English',
      },
    }).then((res) => {
      // console.log(res)
      console.log(res.data.recommendations)

      const podcastArray = res.data.recommendations
      setPodcasts(podcastArray)
    })
  }, [])

  console.log(podcasts)

  const {pedestrianTime} = props 


  return (
    <div className='wrapper'>
      <h2>Podcasts that match your walking time:</h2>
      <h3>props test:  {pedestrianTime} </h3>
      <div className='podcastParent'>
        <div className='podcastCard'>
          <div className='podcastStats'>
            {
            podcasts.map((info) => {
              return (
                <div>
                  <div className='podcastImage'>
                    <img src={info.image} alt={info.title} />
                  </div>
                  <p>Title: {info.podcast.title}</p>
                  {/* <p>Description: {info.description}</p> */}
                  <p>{props.title}</p>
                  <p>Episode Name: {info.title}</p>
                  <p>Length:{Math.round(info.audio_length_sec / 60)} minutes</p>
                  <p>
                    Explicit Content Present: {info.explicit_content.toString()}
                  </p>
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
