import React from 'react'
import { Link } from 'react-router-dom'

function DashboardSideBar() {
  return (
    <div className="dashboard-sidebar-container">
        <div className="dashboard-sidebar">
            <div className="dashboard-links">
                <a href="/">Home</a>
                <a href="/dashboard">Dashboard</a>
                <Link to="/dashboard/blogs/groups/new">add group</Link>
            </div>
        </div>
    </div>
  )
}

export default DashboardSideBar