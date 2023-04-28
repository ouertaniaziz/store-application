import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupCard from '../authentification/signUp'

const routing = () => {
  return (
  <Routes>
    <Route path="/signUp" element={<SignupCard/>}/>
  </Routes>
  )
}

export default routing