import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute';
import SetAvatar from './pages/SetAvatar';

const App = () => {
  const user = localStorage.getItem('chat-app-user');
  
  window.addEventListener('storage', (e) => {
    if (!user) {
      window.location.replace('/login');
    }
  })

  const Home = () => {
    return user ? <Navigate to='/chat' replace={true}/> : <Navigate to='/login' replace={true}/>
  }
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<PrivateRoute />} >
          <Route path='/chat' element={<Chat />} />
          <Route path='/set-avatar' element={<SetAvatar />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App