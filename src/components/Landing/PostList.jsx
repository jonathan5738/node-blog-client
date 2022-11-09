import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHome, FiBell } from "react-icons/fi"
import { blogGroupDetail } from '../../features/blogGroupSlice'
import { listPosts } from '../../features/postSlice'
import '../css/Landing/PostList.css'
function PostList() {
  const { blog_id } = useParams()
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.data)
  const blogGroup = useSelector(state => state.blogGroups.data)
  useEffect(() => {
     dispatch(blogGroupDetail(blog_id))
     dispatch(listPosts(blog_id))
  }, [])
  return (
    <div className='content-container'>
        <div className="content-left-sidebar">
           <div className="content-left-sidebar-content content-left-sidebar-mobile">
                <div className="icons-container">
                    <a href="/"><FiHome className='content-icon' size={20} color={"#777777"}/></a>
                    <FiBell className='content-icon' size={20} color={"#777777"}/>
                </div>
           </div>
        </div>
        <div className="content-main">
            <h2>{blogGroup?.name}</h2>
            <p>{blogGroup?.description}</p>
            <div className="post-container">
                {posts?.map(post => {
                    return (
                        <a href={`/blogs/${blog_id}/posts/${post._id}`} key={post._id}>
                            <div className="post-card">
                                <div className="post-card-text">
                                    <h3>{post?.title}</h3>
                                    <p>{post?.introduction}</p>
                                    <a href={`/blogs/${blog_id}/posts/${post._id}`} className='read-articles-link'>read post</a>
                                </div>
                                <div className="post-card-img">
                                    <img src={post?.post_img?.url} alt="" />
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
        <div className="content-right-sidebar">
             <p>this is a great option</p>
        </div>
    </div>
  )
}

export default PostList