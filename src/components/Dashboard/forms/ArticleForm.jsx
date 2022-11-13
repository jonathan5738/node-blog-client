import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost, editPost } from '../../../features/postSlice'

function ArticleForm({setEditPostForm,  postToEdit=null, blog_id=null }) {
  const [title, setTitle] = useState(postToEdit?.title || '')
  const [introduction, setIntroduction] = useState(postToEdit?.introduction || '')
  const [postImg, setPostImg] = useState(undefined)
  const dispatch = useDispatch()
  const handleSubmit = e => {
     e.preventDefault()
     const data = new FormData()
     data.append('title', title); data.append('introduction', introduction)
     if(postImg){
        if(postToEdit){
           data.append('post_image', postImg)
        } else {
          data.append('post_img', postImg)
        }
     }
     if(!postToEdit){
        dispatch(createPost({blog_id: blog_id, data}))
     } else {
       dispatch(editPost({ blog_id, post_id: postToEdit._id , data}))
     }
     setEditPostForm(false)
  }
  const handleImage = e => {
     setPostImg(e.target.files[0])
  }
  return (
    <div>
          <h3 className='form-action-title'>{postToEdit ? 'Edit': 'Write'} post</h3>
              <form  onSubmit={handleSubmit} className="form">
                  <div className="form-div">
                      <input type="text" placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
                  </div>
                  <div className="form-div">
                      <input type="file" onChange={handleImage}/>
                  </div>
                  <div className="form-div">
                      <textarea rows="7" placeholder='introduction' value={introduction} onChange={e => setIntroduction(e.target.value)}></textarea>
                  </div>
                  <button>{postToEdit ? 'edit post': 'create post'}</button>
              </form>
       </div>
  )
}

export default ArticleForm