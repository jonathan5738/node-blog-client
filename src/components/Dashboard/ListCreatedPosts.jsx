import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listPostPrivate } from '../../features/postSlice'
import { blogGroupDetail } from '../../features/blogGroupSlice'
import DashboardSideBar from './DashboardSideBar'
import '../css/Dashboard/PostStyle.css'

function ListCreatedPosts() {
  const { blog_id } = useParams()
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.data)
  const blogGroup = useSelector(state => state.blogGroups.data)
  useEffect(() => {
     dispatch(listPostPrivate(blog_id))
     dispatch(blogGroupDetail(blog_id))
  }, [])
  return (
    <div className='dashboard-post-container'>
        <DashboardSideBar/> 
        <div className="dashboard-post-main-content">
             <h2>{blogGroup?.name} articles</h2>
             <div className="created-post-container-grid-3">
                 {posts.map(post => {
                     return(
                        <div className="created-post-card">
                            <div className="created-post-img">
                                <img src={post?.post_img.url} alt="" />
                            </div>
                            <div className="created-post-text">
                                <h3>{post?.title}</h3>
                                <p>{post?.introduction}</p>
                                 <div className="created-post-button">
                                    <a href={`/dashboard/groups/${blog_id}/posts/${post._id}/manage`}>edit article</a>
                                    <button>delete article</button>
                                 </div>
                            </div>
                        </div>
                     )
                 })}
             </div>
        </div>
    </div>
  )
}

export default ListCreatedPosts