import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBlogGroups, joinBlogGroup, searchListBlogGroups } from '../../features/blogGroupSlice'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function BlogGroupList() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE))
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  const category_name = location.search.split('=')[1]
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)
    useEffect(() => {
        dispatch(listBlogGroups(category_name))
    }, [])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm)
        }, 300)
        return () => {
            clearTimeout(timerId)
        }
    }, [searchTerm])

   useEffect(() => {
    dispatch(searchListBlogGroups({searchTerm}))
   }, [debouncedTerm])

  const blogGroups = useSelector(state => state.blogGroups.data)
  const handlejoinBlogGroup = (blog_id, user_id) => {
     dispatch(joinBlogGroup({blog_id, user_id, category_name}))
  }
  
  return (
    <div className='content-container'>
        <div className="content-left-sidebar">
            <div className="content-left-sidebar-content"></div>
        </div>
        <div className="content-main">
             <h2>{category_name}</h2>
             <div className="blog-group-flex">
                 {blogGroups?.map(blogGroup => {
                    return (
                        <div className="blog-group-section" key={blogGroup._id}>
                            <div className="blog-group-section-text">
                               <h3>{blogGroup?.name}</h3>
                               <p>{blogGroup?.description}</p>
                               <a href="#" className='read-articles-link'>read articles</a>
                               {currentUser && !blogGroup?.members?.includes(currentUser?.user._id) && (
                                      <button className='join-btn' onClick={() => handlejoinBlogGroup(blogGroup._id, currentUser?.user?._id)}>start following</button>
                               )}
                               <div className="bagde-container">
                                    <span className="bagde">{category_name}</span>
                                    {blogGroup?.members?.includes(currentUser?.user._id) && (
                                        <span className="bagde bagde-black">member of {blogGroup?.name}</span>
                                    )}
                               </div>
                            </div>
                            <div className="blog-group-section-img">
                                <img src={blogGroup?.blog_img?.url} alt="" />
                            </div>
                        </div>
                    )
                 })}
             </div>
        </div>
        <div className="content-right-sidebar">
        <div className="content-right-sidebar-content">
             {!currentUser && (
              <div className="auth">
                <Link to="/accounts/login" className='auth-links-login'>login</Link>
                <Link to="/accounts/signin" className='auth-links-signin'>Sign in</Link>
               </div>
             )}
             <form className="group-search-form">
                 <input type="text" className='search-form' placeholder='search'
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value) }/>
             </form>
        </div>
        </div>
    </div>
  )
}

export default BlogGroupList