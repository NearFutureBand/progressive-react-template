import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { syncAction, asyncAction } from 'store/actions'

import './style.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(syncAction())
    dispatch(asyncAction({ param1: 1, param2: 2 }))
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  )
}

export default App
