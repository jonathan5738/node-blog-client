import React, { useState } from 'react'

function AssignPermissionForm() {
  const [name, setName] = useState('')
  const handleSubmit = e => {
     e.preventDefault()
  }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <div className="form-div">
                <input type="text" value={name} placeholder='username' onChange={e => setName(e.target.value)}/>
            </div>
            <button>search user</button>
        </form>
    </div>
  )
}

export default AssignPermissionForm