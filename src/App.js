import './App.css'
import './styles/sass/style.css'
import Stats from './Stats'
import Podcasts from './Podcasts'

function App() {
  return (
    <div className='App'>
      <header className='wrapper'>
        <h1>Podcast Prioritizer</h1>
        <h2>Find the right podcast for your next adventure!</h2>
        <h3>Don't bike and podcast!</h3>
      </header>
      <section className='wrapper'>
        <form action=''>
          <div className='inputBox'>
            <label name='startingPoint' aria-label='starting point'>
              <input
                type='text'
                placeholder='Starting Point'
                name='startingPoint'
                className='nameInput'
              />
            </label>

            <label name='destination' aria-label='destination'>
              <input
                type='text'
                placeholder='Destination'
                name='destination'
                className='nameInput'
              />
            </label>
          </div>
          <button type='submit'>Find a Podcast</button>
        </form>
      </section>
      <Stats />
      <Podcasts />
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
