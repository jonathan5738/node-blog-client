import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleForm from './forms/ArticleForm'
function CreatePost() {
  const { blog_id } = useParams()
  return (
    <div>
        <ArticleForm blog_id={blog_id}/>
    </div>
  )
}

export default CreatePost