import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Login from './components/accounts/Login'
import SignIn from './components/accounts/SignIn'
import Dashboard from './components/Dashboard/Dashboard'
import IsLoggedIn from './utils/IsLoggedIn'
import AddGroup from './components/Dashboard/AddGroup'
import ManageGroup from './components/Dashboard/ManageGroup'
import BlogGroupList from './components/Landing/BlogGroupList'
import CreatePost from './components/Dashboard/CreatePost'
import ManagePost from './components/Dashboard/ManagePost'

import './components/css/variables.css'
import './components/css/general.css'
import ListCreatedPosts from './components/Dashboard/ListCreatedPosts'
import PostList from './components/Landing/PostList'
import PostDetail from './components/Landing/PostDetail'
import Footer from './components/Footer/Footer'
function App() {
  return (
    <BrowserRouter>
        <Routes>
             <Route path="/" element={<Landing/>}/>
             <Route path="/accounts/login" element={<Login/>}/> 
             <Route path="/accounts/signin" element={<SignIn/>}/>
             <Route path="/blogs/all" element={<BlogGroupList/>}/>
             <Route path="/blogs/:blog_id/posts/all" element={<PostList/>}/>
             <Route path="/blogs/:blog_id/posts/:post_id" element={<PostDetail/>}/>
             <Route element={<IsLoggedIn/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/blogs/groups/new" element={<AddGroup/>}/>
                <Route path="/dashboard/blogs/groups/:blog_id/manage" element={<ManageGroup/>}/>
                <Route path="/dashboard/blogs/groups/:blog_id/posts/new" element={<CreatePost/>}/>
                <Route path="/dashboard/blogs/groups/:blog_id/posts/all" element={<ListCreatedPosts/>}/>
                <Route path="/dashboard/groups/:blog_id/posts/:post_id/manage" element={<ManagePost/>}/>
             </Route>
        </Routes>
        {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App