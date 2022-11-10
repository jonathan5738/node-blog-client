import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { topFiveBlogGroups } from '../../features/blogGroupSlice'
import { fetchAllPosts } from '../../features/postSlice'
import { fetchCategories } from '../../features/categorySlice'
import '../css/Landing/Landing.css'

function Landing() {
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(topFiveBlogGroups())
     dispatch(fetchAllPosts())
     dispatch(fetchCategories())
  }, [])
  const blogGroups = useSelector(state => state.blogGroups.data) 
  const posts = useSelector(state => state.posts.data)
  const categories = useSelector(state => state.categories.data)
  return (
     <>
      <header className="header">
        <nav className='navbar'>
            <a href="/" className='navbar-logo'>Readting</a>
            <ul className="menu">
              <li className='menu-item'><Link to="#">Our story</Link></li>
              <li className='menu-item'><Link to="/accounts/signin">Sign in</Link></li>
              <li className='menu-item'><Link to="/accounts/login">Log in</Link></li>
            </ul>
        </nav>
      </header>
      <section className="bannier">
          <div className="banner-text">
              <h1 className='bannier-main-title'>Keep on Learning.</h1>
              <p className='bannier-marketing-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
                 fugit explicabo at esse laborum, numquam dolorum, pariatur nisi
                  aliquid eius quia vel
                 optio accusamus et debitis nemo. Impedit, consequuntur libero.</p>
              <a href="#" className='call-to-action-link'>Start reading</a>
          </div>
      </section>
      <section className="top-five-groups">
          <h2 className='top-five-main-title'>Readting's top {blogGroups?.length} groups</h2>
          <div className="top-five-group-grid">
              {blogGroups?.map((group, index) => {
                return (
                  <a href={`/blogs/${group._id}/posts/all`}  key={group._id}>
                    <div className="top-five-group-card">
                        <div className="admin-info">
                            <div className="admin-info-img"></div>
                            <div className="admin-info-text">
                                <h4>{group?.admin?.first_name} {group?.admin?.last_name}</h4>
                            </div>
                        </div>

                        <div className="top-five-group-content">
                            <h2 className='top-five-title'><span className="ranking">0{index + 1}</span> {group?.name}</h2>
                            <p className='top-five-description'>{group?.description?.slice(0, 200)}</p>
                        </div>
                    </div>
                  </a>
                )
              })}
          </div>
      </section>

      <section className="landing-post-container">
          <div className="landing-post-list">
               <div className="landing-post-flex">
                  {posts?.map(post => {
                     return (
                         <a href={`/blogs/${post?.group}/posts/${post?._id}`}>
                             <div className="landing-post-card">
                               <div className="landing-post-card-text">
                                  <h2>{post?.title}</h2>
                                  <p>{post?.introduction.slice(0, 135)}...</p>
                               </div>
                               <div className="landing-post-card-img">
                                   <img src={post?.post_img?.url} alt="" />
                               </div>
                             </div>
                         </a>
                     )
                  })}
               </div>
          </div>
          <div className="landing-category-list">
              <h2>Discover more of what matters to you</h2>
             <div className="landing-category-grid">
                {categories?.map(category => {
                  return(
                      <a href={`/blogs/all?category_name=${category?.name}`} key={category._id}>
                        <div className="landing-category-card">
                            <p>{category?.name}</p>
                        </div>
                      </a>
                  )
                })}
             </div>
          </div>
          
      </section>
     </>
  )
}

export default Landing