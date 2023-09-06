import React from 'react'
import Header from '../Header'
import HomePage from '../../pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DemoGamePage from '../../pages/DemoGamePage';
import GamePage from '../../pages/GamePage';
import SessionHandler from '../SessionHandler/index';
import LoadingPage from '../../pages/LoadingPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Deposit from '../../pages/Deposit';
import ProviderGamesPage from '../../pages/ProviderGamesPage';
import ProfilePage from '../../pages/ProfilePage';
import ReferralSystemPage from '../../pages/ReferralSystemPage';
const Layout = () => {
  const isLoading = useSelector((state: RootState) => state.User.isLoading);

  return (
    <>
    <Router>
    {isLoading && <LoadingPage/>}
      <SessionHandler/>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>} /> 
        <Route path='/play/demo/:slug' element={<DemoGamePage/>} /> 
        <Route path='/play/:slug' element={<GamePage/>} /> 
        <Route path='/profile/deposit' element={<Deposit/>} /> 
        <Route path='/:provider/games' element={<ProviderGamesPage/>} /> 
        <Route path='/profile' element={<ProfilePage/>} /> 
        <Route path='/profile/refferal-system' element={<ReferralSystemPage/>} /> 
      </Routes>
    </Router>
    </>
  )
}

export default Layout
