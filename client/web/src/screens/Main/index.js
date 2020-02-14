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
    <div className="page">
      Main window

    </div>
  )
}

export default App
