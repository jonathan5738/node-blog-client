import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addParagraph, editParagraph } from '../../../features/postSlice'

function AddParagraph({ post_id, blog_id, setShowParagraphForm, paraToEdit}) {
  const [subtitle, setSubtitle] = useState(paraToEdit.subtitle || '')
  const [content, setContent] = useState(paraToEdit.content || '')
  const [paraImg, setParaImg] = useState(undefined)
  const dispatch = useDispatch()
  const handleSubmit = e => {
     e.preventDefault()
     const data = new FormData()
     data.append('subtitle', subtitle); data.append('content', content)
     if(paraImg){
        if(paraToEdit) {
            data.append('paragraph_image', paraImg)
        } else {
           data.append('paragraph_img', paraImg)
        }
     }
    if(paraToEdit){
      data.append('paragraph_id', paraToEdit._id)
      dispatch(editParagraph({ blog_id, post_id, data }))
    } else {
      dispatch(addParagraph({blog_id, post_id, data}))
    }
    setShowParagraphForm(false)
  }
  const handleParaImage = e => {
    setParaImg(e.target.files[0])
  }
  return (
    <div>
        <h3 className='form-action-title'>Add paragraph</h3>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-div">
                <input type="text" placeholder='subtitle' value={subtitle} onChange={e => setSubtitle(e.target.value)}
                aria-label='subtitle' />
            </div>
            <div className="form-div">
                <input type="file" onChange={handleParaImage} />
            </div>
            <div className="form-div">
                <textarea placeholder='content' arial-label='content' value={content}
                onChange={ e => setContent(e.target.value)}
                rows="7"></textarea>
            </div>
            <button>add paragraph</button>
        </form>
    </div>
  )
}

export default AddParagraph