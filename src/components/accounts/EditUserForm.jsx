import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../features/accountSlice'

function EditUserForm({ currentUser, handleEditUserForm }) {
  const [username, setUsername] = useState(currentUser.username || '')
  const [firstName, setFirstName] = useState(currentUser.first_name || '')
  const [lastName, setLastName] = useState(currentUser.last_name || '')
  const [email, setEmail] = useState(currentUser.email || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = e => {
     e.preventDefault()
     dispatch(editUser({username, first_name: firstName, last_name: lastName, email}))
     handleEditUserForm()
     navigate('/dashboard', { replace: true })
  }
  return (
    <div>
        <h2>Edit your account</h2>
        <form onSubmit={handleSubmit}>
             <div className="form-div">
                 <input type="text" aria-label='username' value={username} onChange={e => setUsername(e.target.value)} />
             </div>
             <div className="two-fields">
                 <input type="text" aria-label='first name'
                  value={firstName} onChange={e => setFirstName(e.target.value)} />

                  <input type="text" aria-label='last name'
                  value={lastName} onChange={e => setLastName(e.target.value)} />
             </div>
             <div className="form-div">
                 <input type="text"  value={email} onChange={e => setEmail(e.target.value)}/>
             </div>
             <button>edit user</button>
        </form>
    </div>
  )
}

export default EditUserForm