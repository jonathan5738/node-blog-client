import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHome, FiBell, FiMonitor, FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { fetchCategories } from '../../features/categorySlice'
import { blogGroupDetail } from '../../features/blogGroupSlice'
import { searchListPosts } from '../../features/postSlice'
import { listPosts } from '../../features/postSlice'
import '../css/Landing/PostList.css'
function PostList() {
  const { blog_id } = useParams()
  const [skipParam, setSkipParam] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE))
  const dispatch = useDispatch()
  const {status: postStatus, data: posts} = useSelector(state => state.posts)
  const {status: blogGroupStatus, data: blogGroup} = useSelector(state => state.blogGroups)
  const {status, data: categories} = useSelector(state => state.categories)
  useEffect(() => {
     dispatch(blogGroupDetail(blog_id))
     dispatch(fetchCategories())
  }, [])
  useEffect(() => {
     dispatch(listPosts({blog_id, skipParam}))
  }, [skipParam])

  useEffect(() => {
    const timerId = setTimeout(() => {
        setDebouncedTerm(searchTerm)
    }, 300)
        return () => {
            clearTimeout(timerId)
        }
    }, [searchTerm])

    useEffect(() => {
        dispatch(searchListPosts({blog_id, searchTerm}))
    }, [debouncedTerm])
  return (
    <div className='content-container'>
        <div className="content-left-sidebar">
           <div className="content-left-sidebar-content content-left-sidebar-mobile">
                <div className="icons-container">
                    <a href="/"><FiHome className='content-icon' size={20} color={"#777777"}/></a>
                    <FiBell className='content-icon' size={20} color={"#777777"}/>
                    {currentUser?.user && (
                        <a href="/dashboard"><FiMonitor className='content-icon'size={20} color={"#777777"}/></a>
                    )}
                </div>
           </div>
        </div>
        <div className="content-main">
            <h2>{blogGroup?.name}</h2>
            <p>{blogGroup?.description}</p>
            <form className="group-search-form-mobile">
                 <input type="text" className='search-form' placeholder='search post'
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value) }/>
             </form>
            <div className="post-container">
                {posts?.length === 0 ? (
                     <p>{blogGroup?.name} doesn't contain any post yet</p>
                ): (
                    <>
                       {posts?.map(post => {
                            return (
                                <div className="post-card" key={post._id}>
                                        <div className="post-card-text">
                                            <h3>{post?.title}</h3>
                                            <p>{post?.introduction}</p>
                                            <a href={`/blogs/${blog_id}/posts/${post._id}`} className='read-articles-link'>read post</a>
                                        </div>
                                        <div className="post-card-img">
                                            <img src={post?.post_img?.url} alt="" />
                                        </div>
                                </div>
                            )
                        })}
                    </>
                )}

            <div className="pagination-container">
                  <div className="pagination-links">
                      {skipParam >= 1 && (
                          <FiArrowLeft size={20} color={'#868e96'} className='pagination-left'
                          onClick={() => setSkipParam(prev => prev - 5)}/>
                      )}
                      {posts.length > 0  && (
                          <FiArrowRight size={20} color={'#868e96'} className='pagination-right'
                          onClick={() => setSkipParam(prev => prev + 5)}/>
                      )}
                  </div>
            </div>

            </div>
        </div>
        <div className="content-right-sidebar">
           <div className="content-right-sidebar-content">
                <form className="group-search-form">
                        <input type="text" className='search-form' placeholder='search post'
                        value={searchTerm} onChange={e => setSearchTerm(e.target.value) }/>
                    </form>
                    <div className="related-group-list">
                        { categories.length > 0 && (
                            <>
                            <h2>Other categories</h2>
                                <div className='related-group-links'>
                                    {categories.map(category => {
                                        return (
                                            <a className='related-group-link' href={`/blogs/all?category_name=${category.name}`} key={category._id}>{category.name}</a>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>
           </div>
        </div>
    </div>
  )
}

export default PostList