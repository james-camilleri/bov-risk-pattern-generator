import './App.css'

import { useRef, useState } from 'react'

import { Pattern } from './Pattern'
import { SvgSave } from './SvgSave'

function App () {
  // I think setting the state causes the component to
  // re-render, even though it's not being used anywhere.
  const [, setSeed] = useState(0)
  const onGenerate = () => { setSeed(Math.random()) }

  const svgRef = useRef()

  const [configuration, setConfiguration] = useState({
    columns: 40,
    maxCircles: 10,
    minCircles: 3,
    rows: 3,
    useSecondaryColours: true
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>BOV Risk Management: Pattern Generator</h1>
      </header>

      <Pattern
        {...configuration}
        key={JSON.stringify(configuration)}
        svgRef={svgRef}
      />

      <footer>
        <div className='controls'>
          <div className='control'>
            <label htmlFor='rows'>Rows</label>
            <input
              id='rows'
              max={30}
              min={1}
              type='number'
              value={configuration.rows}
              onChange={e => setConfiguration(
                { ...configuration, rows: e.target.value }
              )}
            />
          </div>
          <div className='control'>
            <label htmlFor='columns'>Columns</label>
            <input
              id='columns'
              max={100}
              min={3}
              type='number'
              value={configuration.columns}
              onChange={e => setConfiguration(
                { ...configuration, columns: e.target.value }
              )}
            />
          </div>
          <div className='control'>
            <label htmlFor='minCircles'>Minimum # of circles</label>
            <input
              id='minCircles'
              max={20}
              min={3}
              type='number'
              value={configuration.minCircles}
              onChange={e => setConfiguration({
                ...configuration,
                minCircles: e.target.value,
                maxCircles: Math.max(e.target.value, configuration.maxCircles)
              }
              )}
            />
          </div>
          <div className='control'>
            <label htmlFor='maxCircles'>Maximum # of circles</label>
            <input
              id='maxCircles'
              max={30}
              min={configuration.minCircles}
              type='number'
              value={configuration.maxCircles < configuration.minCircles
                ? configuration.minCircles
                : configuration.maxCircles}
              onChange={e => setConfiguration(
                { ...configuration, maxCircles: e.target.value }
              )}
            />
          </div>
          <div className='control'>
            <label htmlFor='useSecondaryColours'>Use secondary colours</label>
            <input
              id='useSecondaryColours'
              type='checkbox'
              checked={configuration.useSecondaryColours}
              onChange={e => setConfiguration(
                { ...configuration, useSecondaryColours: e.target.checked }
              )}
            />
          </div>
        </div>
        <div className='button-container'>
          <button onClick={onGenerate}>Generate</button>
          <SvgSave svgRef={svgRef}>Save</SvgSave>
        </div>
      </footer>
    </div>
  )
}

export default App
