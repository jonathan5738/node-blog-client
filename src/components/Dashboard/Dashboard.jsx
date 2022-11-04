import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../../features/accountSlice'
import { listBlogGroupPrivate } from '../../features/blogGroupSlice'
import EditUserForm from '../accounts/EditUserForm'
import DashboardSideBar from './DashboardSideBar'
import ResetPassword from '../accounts/ResetPassword'
import '../css/Dashboard/Dashboard.css'
function Dashboard() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.accounts.data)
  const createdBlogGroups = useSelector(state => state.blogGroups.data)
  const [showEditUserForm, setEditUserForm] = useState(false)
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false)
  useEffect(() => {
     dispatch(fetchProfile())
     dispatch(listBlogGroupPrivate())
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
    <div className='dashboard-container'>
         <DashboardSideBar/>
         <div className="dashboar-user-content">
             <h2>Welcome {currentUser.first_name} </h2>
             <div className="dashboard-user-manage">
                 <p>username: {currentUser?.username}</p>
                 <p>email: {currentUser?.email}</p>
                 <p>fullname: {currentUser?.first_name} {currentUser?.last_name}</p>
                <h3>Manage your account</h3>
                <button className='edit-button' onClick={handleEditUserForm}>edit user</button>
                <button className='reset-password-btn' onClick={handlePasswordResetForm}>reset password</button>
             </div>
         </div>
         <div className="dashboard-blog-content">
          {createdBlogGroups && !showEditUserForm && !showResetPasswordForm && (
             <>
                <h2>created blog group</h2>
                <div className="list-created-blog-group">
                   {createdBlogGroups instanceof Array && createdBlogGroups?.map(blogGroup => {
                     return (
                        <div className="blog-group-card" key={blogGroup._id}>
                            <h4>{blogGroup.name}</h4>
                            <p>{blogGroup.description}</p>
                            <a href={`/dashboard/blogs/groups/${blogGroup._id}/manage`}  className='manage-group-link'>manage group</a>
                        </div>
                     )
                   })}
                </div>
             </>
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
    </div>
  )
}

export default Dashboard