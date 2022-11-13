import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../../features/accountSlice'
import { listBlogGroupPrivate } from '../../features/blogGroupSlice'
import { fectchJoinedGroups } from '../../features/joinedGroupSlice'

import EditUserForm from '../accounts/EditUserForm'
import ResetPassword from '../accounts/ResetPassword'
import '../css/Dashboard/Dashboard.css'
import { Link } from 'react-router-dom'
import DashboardSideBar from './DashboardSideBar'


function Dashboard() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.accounts.data)
  const createdBlogGroups = useSelector(state => state.blogGroups.data)
  const joinedGroups = useSelector(state => state.joinedGroups.data)
  const [showEditUserForm, setEditUserForm] = useState(false)
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false)
  useEffect(() => {
     dispatch(fetchProfile())
     dispatch(listBlogGroupPrivate())
     dispatch(fectchJoinedGroups())
  }, [])
  const handleEditUserForm = () =>{
     setShowResetPasswordForm(false)
     setEditUserForm(prev => !prev)
  }
  const handlePasswordResetForm = () => {
     setEditUserForm(false)
     setShowResetPasswordForm(prev => !prev)
  }

  return (
    <div className='content-container'>
        <DashboardSideBar/>
         <div className="content-main">
             <h2>Welcome {currentUser.first_name} </h2>
             <div className="dashboard-user-manage">
                 <p>username: {currentUser?.username}</p>
                 <p>email: {currentUser?.email}</p>
                 <p>fullname: {currentUser?.first_name} {currentUser?.last_name}</p>
                <h3>Manage your account</h3>
                <div className="dashboard-user-btn">
                     <button className='edit-button' onClick={handleEditUserForm}>edit user</button>
                     <button className='reset-password-btn' onClick={handlePasswordResetForm}>reset password</button>
                </div>
             </div>
             {!showEditUserForm && !showResetPasswordForm && (
                 <div className='list-created-group'>
                 {createdBlogGroups.length > 0 && (
                    <>
                       <h2>created blog group</h2>
                       <div className="list-created-blog-group">
                             {createdBlogGroups instanceof Array && createdBlogGroups?.map(blogGroup => {
                                return (
                                   <div className="blog-group-card" key={blogGroup._id}>
                                      <h4>{blogGroup.name}</h4>
                                      <p>{blogGroup.description.slice(0, 103)}{blogGroup.description.length > 103 ? '...': ''}</p>
                                      <a href={`/dashboard/blogs/groups/${blogGroup._id}/manage`}  className='manage-group-link'>manage group</a>
                                   </div>
                                )
                             })}
                       </div>
                    </>
                 )}
              </div>
             )}
             {showEditUserForm && !showResetPasswordForm && (
             <EditUserForm currentUser={currentUser}
             handleEditUserForm={handleEditUserForm}
             />
            )}
            {!showEditUserForm && showResetPasswordForm && (
               <ResetPassword handlePasswordResetForm={handlePasswordResetForm}/>
            )}
         </div>


         <div className="content-right-sidebar">
            <div className="content-right-sidebar-content">
                  <>
                     <div className="list-joined-groups-container">
                        {joinedGroups.length > 0 && (
                           <>
                              <h2>Groups joined</h2>
                                 <div className="list-joined-groups">
                                       {joinedGroups.map(joinGroup => {
                                          return (
                                                <div className="joined-group-card" key={joinGroup._id}>
                                                   <a href={`/blogs/${joinGroup._id}/posts/all`}>
                                                      <div className="joined-group-img">
                                                         <img src={joinGroup?.blog_img.url} alt="" />
                                                      </div>
                                                   </a>
                                                   
                                                   <div>
                                                      <a href={`/blogs/${joinGroup._id}/posts/all`}>
                                                         <p>{joinGroup.name}</p>
                                                      </a>
                                                         {joinGroup.authors.includes(currentUser._id) && (
                                                            <div className='joined-group-author-links'>
                                                               <Link to={`/dashboard/blogs/groups/${joinGroup._id}/posts/new`}>write article</Link>
                                                               <a href={`/dashboard/blogs/groups/${joinGroup._id}/posts/all`}>Manage articles</a>
                                                            </div>
                                                         )}
                                                   </div>
                                                </div>
                                          )
                                       })}
                                 </div>
                           </>
                        )}
                     </div>
                  </>
                  
            </div>
          
          
         </div>
    </div>
  )
}

export default Dashboard