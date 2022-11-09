import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignPermission, removePermission } from '../../../features/blogGroupSlice'

function AssignPermissionForm({ members, blog_id, authors }) {
  const [name, setName] = useState('')
  const [showListUser, setShowListUser] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])     
  const dispatch = useDispatch()
  const handleSubmit = e => {
     e.preventDefault()
  }
  const handleInputChange = (username) => {
    setShowListUser(true)
    setName(username)
    const regex = new RegExp('^' + username + '')
    setSelectedMembers(members.filter(member => regex.test(member.username)))
  }
  console.log(authors)
  return (
    <div>
      <h3>Assign author permission</h3>
        <form action="" onSubmit={handleSubmit}>
            <div className="form-div">
                <input type="text" value={name} placeholder='username' 
                onChange={e => handleInputChange(e.target.value)}/>
            </div>
            <button>search user</button>
        </form>
        {showListUser && (
            <div className="list-members-container">
              {selectedMembers.map(member => {
                return (
                  <div className="member-card" key={member._id}>
                      <h2>username: {member.username}</h2>
                      <h3>{member.first_name} {member.last_name}</h3>
                      {authors.map(author => author?._id)?.includes(member._id) ? (
                         <button onClick={() => dispatch(removePermission({ blog_id, user_id: member._id }))}>remove permission</button>
                      ): (
                        <button onClick={() => dispatch(assignPermission({blog_id, user_id: member._id}))}>assign permission</button>
                      )}
                  </div>
                )
              })}
          </div>
        )}
    </div>
  )
}

export default AssignPermissionForm