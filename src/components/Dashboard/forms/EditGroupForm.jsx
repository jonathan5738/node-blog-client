import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editBlogGroup } from '../../../features/blogGroupSlice'
function EditGroupForm({blogGroup, blog_id}) {
  const [name, setName] = useState(blogGroup.name || '')
  const [description, setDescription] = useState(blogGroup.description || '')
  const [blogImage, setBlogImage] = useState(undefined)
  const dispatch = useDispatch()
  const handleSubmit = e => {
     e.preventDefault()
     const form = new FormData()
     form.append('name', name); form.append('description', description)
     if(blogImage) form.append('blog_image', blogImage)
     dispatch(editBlogGroup({blog_id, data: form}))
  }
  const handleImageSubmit = e => {
     setBlogImage(e.target.files[0])
  }
  return (
    <div>
        <h2 className='form-action-title'>Edit blog group</h2>
        <form onSubmit={handleSubmit} className="form">
             <div className="form-div">
                 <input type="text" value={name} onChange={e => setName(e.target.value)} />
             </div>
             <div className="form-div">
                <input type="file"  onChange={handleImageSubmit}/>
             </div>
             <div className="form-div">
                <textarea rows="5" value={description} onChange={e => setDescription(e.target.value)}></textarea>
             </div>
             <button>edit blog group</button>
        </form>
    </div>
  )
}

export default EditGroupForm