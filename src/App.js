import './App.css'
import './styles/sass/style.css'
import Stats from './Stats'
import Podcasts from './Podcasts'

function App() {
  return (
    <div className='App'>
      <header>
        <h1>Podcast Prioritizer</h1>
        <h2>Find the right podcast for your next adventure!</h2>
        <h3>Don't bike and podcast!</h3>
      </header>
      <section>
        <form action=''>
          <label name='startingPoint' aria-label='starting point'>
            <input
              type='text'
              placeholder='Starting Point'
              name='startingPoint'
              class='nameInput'
            />
          </label>

          <label name='destination' aria-label='destination'>
            <input
              type='text'
              placeholder='Destination'
              name='destination'
              class='nameInput'
            />
          </label>
          <button type='submit'>Find a Podcast</button>
        </form>
      </section>
      <Stats />
      <Podcasts />
    </div>
  )
}

export default App
