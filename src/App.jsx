import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { baseAPI_URL } from './utils/API'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom'
import Mile1 from './Mile1'
import Mile2 from './Mile2'
import Loader from './Loader'

function App() {
  const [loaderDisplay, resetLoaderDisplay] = useState("")
  useEffect(()=> {
    let Initialize = async () => {
      let request = await fetch(baseAPI_URL + '/connect', {
        'method': 'GET', 
        'headers': {
          'Content-Type': "application/json"
        }
      })
      let response = await request.json()
      if(response.Connected){
        resetLoaderDisplay("hidden")
      }
    }
    Initialize()
  }, [])

  return (
    <>
      <Loader display={loaderDisplay}/>
      <p className="text-2xl text-violet-400 text-center my-4">
        Wasserstoff Backend Interview Task
      </p>
      <Navbar/>
      <Routes>
        <Route path='/' Component={Mile1}/>
        <Route path='/Milestone2' Component={Mile2}/>
      </Routes>
    </>
  )
}

export default App
