import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiEdit, FiMonitor, FiPlus } from 'react-icons/fi'
function DashboardSideBar() {
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE))
  return (
     <div className="content-left-sidebar">
          <div className="content-left-sidebar-content content-left-sidebar-mobile">
                  <div className="icons-container">
                      <a href="/"><FiHome className='content-icon'size={20} color={"#777777"}/></a>
                      {currentUser && (
                          <a href="/dashboard"><FiMonitor className='content-icon'size={20} color={"#777777"}/></a>
                      )}
                      <a href="/dashboard/blogs/groups/new"><FiPlus className='content-icon'size={20} color={"#777777"}/></a>
                  </div>
            </div>
    </div>
  )
}

export default DashboardSideBar