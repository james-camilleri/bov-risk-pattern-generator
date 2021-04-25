import './App.css'

import { useState } from 'react'

import { Pattern } from './Pattern'

function App () {
  // I think setting the state causes the component to
  // re-render, even though it's not being used anywhere.
  const [, setSeed] = useState(0)
  const onGenerate = () => { setSeed(Math.random()) }

  const onSave = () => {}

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>BOV Risk Management: Pattern Generator</h1>
      </header>

      <Pattern
        columns={50}
        maxCircles={10}
        minCircles={3}
        rows={5}
      />

      <footer>
        <div className='controls'></div>
        <div className='button-container'>
          <button onClick={onGenerate}>Generate</button>
          <button onClick={onSave}>Save</button>
        </div>
      </footer>
    </div>
  )
}

export default App
