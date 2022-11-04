import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogGroupDetail, deleteBlogGroup } from '../../features/blogGroupSlice'
import DashboardSideBar from './DashboardSideBar'
import EditGroupForm from './forms/EditGroupForm'
import '../css/Dashboard/ManageGroup.css'
import AssignPermissionForm from './forms/AssignPermissionForm'
function ManageGroup() {
  const { blog_id } = useParams()
  const [showEditForm, setEditForm] = useState(false)
  const [showPermissionForm, setPermissionForm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
     dispatch(blogGroupDetail(blog_id))
  }, [])
  const blogGroup = useSelector(state => state.blogGroups.data)
  const handleEditForm = () => {
     setPermissionForm(false); setEditForm(prev => !prev)
  }
  const handleAssignPermissionForm = () => {
     setPermissionForm(prev => !prev)
     setEditForm(false)
  }
  const handleGroupDeletion = () => {
     dispatch(deleteBlogGroup(blog_id))
     navigate('/dashboard',  { replace: true})
  }
  return ( 
    <div className='dashboard-container'>
        <DashboardSideBar/>
        <div className="dashboard-blog-group-detail">
            {blogGroup && (
                 <>
                   <div className="dashboard-blog-group-detail-img">
                    <img src={blogGroup?.blog_img?.url} alt="" />
                 </div>
                <div className="dashboard-blog-group-detail-text">
                    <h2>{blogGroup?.name}</h2>
                    <p>{blogGroup?.description}</p>
                    <button onClick={handleEditForm}>edit group</button>
                    <button onClick={handleAssignPermissionForm}>assign permissions</button>
                    <button onClick={handleGroupDeletion}>delete group</button>
                </div>
                 </>
            )}
        </div>
        <div>
            {showEditForm && !showPermissionForm && (
                <EditGroupForm blogGroup={blogGroup} blog_id={blog_id} />
            )}
            {!showEditForm && showPermissionForm && (
                <AssignPermissionForm/>
            )}
        </div>
    </div>
  )
}

export default ManageGroup