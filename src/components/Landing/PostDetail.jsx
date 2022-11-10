import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { FiHome, FiBell, FiThumbsUp, FiThumbsDown, FiMessageCircle, FiX, FiMonitor } from "react-icons/fi"
import { postDetail, likePost, dislikePost } from '../../features/postSlice'
import { fetchRelatedPosts } from '../../features/relatedPostSlice'
import { listComments, addComment, likeComment, dislikeComment } from '../../features/commentSlice'
import { blogGroupDetail } from '../../features/blogGroupSlice'
import { motion } from 'framer-motion'


function PostDetail() {
  const variants = {
     initial: {x: '100%', opacity: 0},
     visible: {x:0, opacity: 1}
  }
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE))
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [showCommentSection, setShowCommentSection] = useState(false)
  const { blog_id, post_id } = useParams()
  const dispatch = useDispatch()
  const { post, paragraphs } = useSelector(state => state.posts.data)
  const relatedPosts = useSelector(state => state.relatedPosts.data)
  const blogGroup = useSelector(state => state.blogGroups.data)
  const comments = useSelector(state => state.comments.data)
  useEffect(() => {
     dispatch(listComments({blog_id, post_id}))
     dispatch(postDetail({ blog_id, post_id }))
     dispatch(fetchRelatedPosts(blog_id))
     dispatch(blogGroupDetail(blog_id))
  }, [])
  const handleCommentSubmition = (e) => {
     e.preventDefault()
     const data = {title, content}
     dispatch(addComment({blog_id, post_id, data}))
  }
  return (
    <>
       <div className='content-container'>
        <div className="content-left-sidebar">
           <div className="content-left-sidebar-content content-left-sidebar-mobile">
                <div className="icons-container">
                    <a href="/"><FiHome className='content-icon' size={20} color={"#777777"}/></a>
                    <FiBell className='content-icon' size={20} color={"#777777"}/>
                    {currentUser && (
                        <a href="/dashboard"><FiMonitor className='content-icon'size={20} color={"#777777"}/></a>
                    )}
                    <FiMessageCircle className='content-icon' onClick={() => setShowCommentSection(prev =>!prev)}
                     size={20} color={"#777777"}/>
                    {currentUser && blogGroup?.members?.includes(currentUser?.user?._id) && (
                        <>
                          <div>
                             <FiThumbsUp onClick={() => dispatch(likePost({blog_id, post_id}))} 
                             className='content-icon' size={20} color={"#0ca678"}/>
                          </div>
                          <div>
                            <FiThumbsDown onClick={() => dispatch(dislikePost({blog_id, post_id}))}
                            className='content-icon' size={20} color={"#fa5252"}/>
                          </div>
                          
                        </>
                    )}
                </div>
           </div>
        </div>

        <div className="content-main">
            {post && (
                <>
                <h3 className='post-title'>{post.title}</h3>
                <div className='post-analytics'>
                    <div className="dislike-count">
                        {post?.dislikes?.length} dislike{post?.dislikes?.length > 1 ? 's': ''}
                    </div>
                    <span className="like-count">
                        {post?.likes?.length} like{post?.likes?.length > 1 ? 's': ''}
                    </span>
                    <div className="comment-count">
                        {comments?.length} comment{comments?.length > 1 ? 's': ''}
                    </div>
                </div>

                <p className='post-introduction'>{post.introduction}</p>
                <div className="post-card-detail-img">
                    <img src={post?.post_img?.url} alt="" />
                </div>
                {paragraphs?.map(paragraph => {
                    return (
                        <div className='paragraph-card' key={ paragraph._id }>
                            <div className='paragraph-card-text'>
                                <h3 className='paragraph-subtitle'>{ paragraph.subtitle }</h3>
                                <p>{ paragraph.content }</p>
                            </div>
                            <div className='paragraph-card-img'>
                                <img src={ paragraph?.paragraph_img?.url } alt="" />
                            </div>
                       </div>
                    )
                   })}
                </>
            )}
        </div>
        <div className="content-right-sidebar">
            <div className="content-right-sidebar-content">
                 <div className="author-info">
                     <div className="author-avatar">
                         <div className="img"></div>
                     </div>
                     <div className="author-text">
                         <h3>{post?.author?.username}</h3>
                         <span className="role">author</span>
                     </div>
                 </div>
                 {relatedPosts?.length > 0 && (
                     <div className="related-post-container">
                        <h2>More from {post?.group?.name}</h2>
                        {relatedPosts?.filter(post => post._id !== post_id).map(post => {
                            return (
                                <a href={`/blogs/${blog_id}/posts/${post._id}`} key={post?._id}>
                                    <div className="related-post-card">
                                    <div className="related-post-card-text">
                                         <span>{post?.author?.username}</span>
                                         <h3>{post?.title}</h3>
                                    </div>
                                    <div className="related-post-card-img">
                                        <img src={post?.post_img?.url} alt="" />
                                    </div>
                                   </div>
                                </a>
                            )
                        })}
                     </div>
                 )}
     
            </div>
          </div>
       </div>
       {currentUser && blogGroup?.members?.includes(currentUser?.user?._id) && (
            <motion.div className="comment-container"
                variants={variants}
                initial='initial'
                animate={showCommentSection ? 'visible': ''}
                transition={{ duration: .2 }}
            >
             <div className="comment-icon-container">
                  <h3>Submit comment</h3>
                 <FiX size={24} color={"#777777"} onClick={() => setShowCommentSection(prev => !prev)}
                  className='close-comment-icon'/>
             </div>
            <form onSubmit={handleCommentSubmition}>
                <div className="form-div">
                    <input type="text" placeholder='title' aria-label='title'
                    value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-div">
                    <textarea value={content} onChange={e => setContent(e.target.value)}
                    placeholder='content' cols="30" rows="5"></textarea>
                </div>
                    <button>submit</button>
                </form>
                <div className="comment-list">
                    <h3>comments ({comments?.length})</h3>
                    <div className="comment-list-container">
                        {comments?.map(comment => {
                            return (
                                <div className="comment-card" key={comment?._id}>
                                    <span className="comment-author">@{comment?.user?.username}</span>
                                    <h4 className='comment-title'>{comment?.title}</h4>
                                    <p>{comment?.content}</p>
                                    {currentUser && blogGroup?.members?.includes(currentUser?.user?._id) && (
                                        <>
                                        <div className='comment-likes-btn'> 
                                            <FiThumbsUp onClick={() => dispatch(likeComment({blog_id, post_id, comment_id: comment._id}))} 
                                            className='content-icon' size={20} color={"#0ca678"}/>
                                            <span className="like-count">
                                               {comment?.likes?.length > 0 ? comment?.likes?.length : ''}
                                            </span>
                                            <FiThumbsDown onClick={() => dispatch(dislikeComment({blog_id, post_id, comment_id: comment._id}))}
                                            className='content-icon' size={20} color={"#fa5252"}/>
                                            <span className="dislike-count">
                                                 {comment?.dislikes?.length > 0 ? comment?.dislikes?.length: '' }
                                            </span>
                                        </div>
                                        
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        )}
    </>
  )
}

export default PostDetail