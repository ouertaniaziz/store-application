import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerHome from './SellerHome'
import LoginSuccess from '../LoginSuccess'
import SellerStock from './SellerStock'
import SellerSettings from './SellerSettings'

const SellerRoutes = () => {
  return (
    <Routes>
        <Route path='/:id' element={<LoginSuccess/>}>
            <Route path='home' element={<SellerHome/>}/>
            <Route path='Stock' element={<SellerStock/>}/>
            <Route path='settings' element={<SellerSettings/>}/>
        </Route>
    </Routes>
  )
}

export default SellerRoutes