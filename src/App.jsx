import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Login from './components/accounts/Login'
import SignIn from './components/accounts/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import IsLoggedIn from './utils/IsLoggedIn'
import './components/css/variables.css'
import './components/css/general.css'
import AddGroup from './components/Dashboard/AddGroup'
import ManageGroup from './components/Dashboard/ManageGroup'
import BlogGroupList from './components/Landing/BlogGroupList'
function App() {
  return (
    <BrowserRouter>
        <Routes>
             <Route path="/" element={<Landing/>}/>
             <Route path="/accounts/login" element={<Login/>}/> 
             <Route path="/accounts/signin" element={<SignIn/>}/>
             <Route path="/blogs/all" element={<BlogGroupList/>}/>
             <Route element={<IsLoggedIn/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/blogs/groups/new" element={<AddGroup/>}/>
                <Route path="/dashboard/blogs/groups/:blog_id/manage" element={<ManageGroup/>}/>
             </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App