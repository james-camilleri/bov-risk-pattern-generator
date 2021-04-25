import './App.css'

import { useState } from 'react'

function App () {
  const [seed, setSeed] = useState(0)

  const onGenerate = () => { setSeed(Math.random()) }
  const onSave = () => {}

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>BOV Risk Management: Pattern Generator</h1>
      </header>
      <main>
        <div />
      </main>
      <footer>
        <div className='controls'>Controls</div>
        <div className='button-container'>
          <button onClick={onGenerate}>Generate</button>
          <button onClick={onSave}>Save</button>
        </div>
      </footer>
    </div>
  )
}

export default App
