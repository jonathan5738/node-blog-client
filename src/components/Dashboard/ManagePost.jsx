import React, { useEffect, useState } from 'react'
import { useParams  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postDetailPrivate } from '../../features/postSlice'
import AddParagraph from './forms/AddParagraph'

import DashboardSideBar from './DashboardSideBar'
import ArticleForm from './forms/ArticleForm'
import '../css/Dashboard/PostStyle.css'

function ManagePost() {
  const { blog_id, post_id} = useParams()
  const [showEditPostForm, setEditPostForm] = useState(false)
  const [showParagraphForm, setShowParagraphForm] = useState(false)
  const [paraToEdit, setParaToEdit] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(postDetailPrivate({blog_id, post_id}))
  }, [])
  const {post, paragraphs } = useSelector(state => state.posts.data)
  const handlePostEdit = () => {
     setEditPostForm(prev => !prev)
     setShowParagraphForm(false)
  }
  const handleParagraphAddition = () => {
    setShowParagraphForm(prev => !prev)
    setEditPostForm(false)
  }
  const handleParagraphEdit = (paraToEdit=null) => {
    setShowParagraphForm(prev => !prev)
    setEditPostForm(false)
    setParaToEdit(paraToEdit)
  }
  return (
    <div className='content-container'>
        <DashboardSideBar/>
        <div className="dashboard-post-main-content">
            <h3 className='dashboard-post-main-title'>Edit {post?.title}</h3>
            <div className="created-post-container-grid-2">
                {post && (
                     <div className="created-post-card">
                     <div className="created-post-img">
                         <img src={post?.post_img?.url} alt="" />
                     </div>
                     <div className="created-post-text">
                         <h3>{post?.title}</h3>
                         <p>{post?.introduction}</p>
                         {paragraphs.length > 0 && (
                             <p>paragraphs: {paragraphs.length}</p>
                         )}
                         <div className="created-post-button">
                              <button className='created-post-edit-btn' onClick={handlePostEdit}>edit post</button>
                              <button className='created-post-para-btn' onClick={handleParagraphAddition}>add paragraph</button>
                         </div>
                     </div>
                     {paragraphs && (
                         <div className="created-post-paragraphs">
                            <h4>post's paragraphs</h4>
                            <div className="created-post-paragraphs-flex">
                                {paragraphs.map(paragraph => {
                                    return (
                                        <div className="created-post-paragraph" key={paragraph?._id}>
                                            <p className='para-title'>{paragraph?.subtitle}</p>
                                            <div className="created-post-paragraph-btn">
                                                <button className='edit-paragraph-btn' onClick={() => handleParagraphEdit(paragraph)}>edit</button>
                                                <button className='delete-paragraph-btn'>delete </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                         </div>
                     )}
                   </div>
                )}
                <div className="created-post-form">
                    {showEditPostForm && (
                        <ArticleForm postToEdit={post}
                            blog_id={blog_id}
                            setEditPostForm={setEditPostForm}
                        />
                    )}
                    {showParagraphForm && (
                        <AddParagraph
                           blog_id={blog_id} post_id={post._id}
                           paraToEdit={paraToEdit} 
                           setShowParagraphForm={setShowParagraphForm}
                        />
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManagePost