import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleForm from './forms/ArticleForm'

import DashboardSideBar from './DashboardSideBar'
function CreatePost() {
  const { blog_id } = useParams()
  return (
    <div className='content-container'>
        <DashboardSideBar/>
        <div className="content-main">
             <ArticleForm blog_id={blog_id}/>
        </div>

        <div className="content-right-sidebar">
            <div className="content-right-sidebar-content"></div>
        </div>
    </div>
  )
}

export default CreatePost