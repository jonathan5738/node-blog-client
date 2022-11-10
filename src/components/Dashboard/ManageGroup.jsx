import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHome, FiEdit, FiMonitor, FiPlus } from 'react-icons/fi'
import { blogGroupPrivateDetail, deleteBlogGroup } from '../../features/blogGroupSlice'
import EditGroupForm from './forms/EditGroupForm'
import '../css/Dashboard/ManageGroup.css'
import AssignPermissionForm from './forms/AssignPermissionForm'
import DashboardSideBar from './DashboardSideBar'
function ManageGroup() {
  const { blog_id } = useParams()
  const [showEditForm, setEditForm] = useState(false)
  const [showPermissionForm, setPermissionForm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
     dispatch(blogGroupPrivateDetail(blog_id))
  }, [])
  const blogGroup = useSelector(state => state.blogGroups.data)
  const members = blogGroup?.members
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
    <div className='content-container'>
        <DashboardSideBar/>
        <div className="content-main">
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
        </div>
        
        <div className="content-right-sidebar">
          <div className="content-right-sidebar-content">
             {showEditForm && !showPermissionForm && (
                    <EditGroupForm blogGroup={blogGroup} blog_id={blog_id} />
                )}
                {!showEditForm && showPermissionForm && (
                    <AssignPermissionForm 
                        members={members} 
                        blog_id={blogGroup?._id}
                        authors={blogGroup?.authors}
                    />
                )}
          </div>
        </div>
    </div>
  )
}

export default ManageGroup