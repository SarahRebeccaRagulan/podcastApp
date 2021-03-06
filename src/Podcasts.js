import React from 'react'

const Podcasts = (props) => {
  // console.log(props);

  const { pedestrianTime, podcasts } = props

  return (
    <div className='wrapper'>
      <p className='poppins'>{ pedestrianTime ? 'Podcasts' : ''}</p>
      <div className='podcastParent'>
        {
          // only return if 1964 or less
          podcasts.map((info) => {
            if (info.audio_length_sec <= pedestrianTime) {
              return (
                <div className='podcastCard' key={info.id}>
                  <div className='podcastStats'>
                    <div className='podcastImage'>
                      <img src={info.image} alt={info.title}/>
                    </div>
                    <p className='poppins'>{info.podcast.title_original}</p>
                    <p className='podcastDescription'>
                      {info.description_original}
                    </p>
                    <p>{Math.round(info.audio_length_sec / 60)} minutes</p>
                    <p>{info.explicit_content ? 'Explicit' : ''}</p>
                    <button className="listenNow">
                    <a href={info.link} target='_blank' rel="noreferrer">
                      Listen Now</a></button>
                  </div>
                </div>
              )
            }else{
              return(
                console.log('hi friend')
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Podcasts
