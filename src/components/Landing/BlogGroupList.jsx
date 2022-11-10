import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBlogGroups, joinBlogGroup, searchListBlogGroups } from '../../features/blogGroupSlice'
import { FiHome, FiBell, FiMonitor } from "react-icons/fi"
import { fetchCategories } from '../../features/categorySlice'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import '../css/Landing/BlogGroupList.css'
function BlogGroupList() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE))
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  const category_name = location.search.split('=')[1]
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)
  const categories = useSelector(state => state.categories.data)
    useEffect(() => {
        dispatch(fetchCategories())
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
    dispatch(searchListBlogGroups({searchTerm, category_name}))
   }, [debouncedTerm])

  const blogGroups = useSelector(state => state.blogGroups.data)
  const handlejoinBlogGroup = (blog_id, user_id) => {
     dispatch(joinBlogGroup({blog_id, user_id, category_name}))
  }
  console.log(categories)
  return (
    <div className='content-container'>
        <div className="content-left-sidebar">
            <div className="content-left-sidebar-content content-left-sidebar-mobile">
               <div className="icons-container">
                    <a href="/"><FiHome className='content-icon' size={20} color={"#777777"}/></a>
                    <FiBell className='content-icon' size={20} color={"#777777"}/>
                    {currentUser && (
                        <a href="/dashboard"><FiMonitor className='content-icon'size={20} color={"#777777"}/></a>
                    )}
                </div>
            </div>
        </div>
        <div className="content-main">
             <h2>{category_name}</h2>

             <form className="group-search-form-mobile">
                 <input type="text" className='search-form' placeholder='search'
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value) }/>
             </form>

             <div className="blog-group-flex">
                 {blogGroups?.map(blogGroup => {
                    return (
                          <div className="blog-group-section" key={blogGroup._id}>
                              <div className="blog-group-section-text">
                                <h3>{blogGroup?.name}</h3>
                                <p>{blogGroup?.description}</p>
                                <div className='blog-group-section-text-links'>
                                    {currentUser && !blogGroup?.members?.includes(currentUser?.user._id) && (
                                        <button className='join-btn' onClick={() => handlejoinBlogGroup(blogGroup._id, currentUser?.user?._id)}>start following</button>
                                    )}
                                    <a href={`/blogs/${blogGroup._id}/posts/all`} className='read-article-link' key={blogGroup._id}>read articles</a>
                                </div>
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
                        // </a>
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
            <div className="related-group-list">
                { categories.length > 0 && (
                    <>
                       <h2>Other categories</h2>
                        <div className='related-group-links'>
                            {categories.filter(category => category.name !== category_name).map(category => {
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

export default BlogGroupList