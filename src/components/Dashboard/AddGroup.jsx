import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../../features/categorySlice'
import { createBlogGroup } from '../../features/blogGroupSlice'
import { Link } from 'react-router-dom'
import '../css/Dashboard/AddGroup.css'
import DashboardSideBar from './DashboardSideBar'
function AddGroup() {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector(state => state.categories.data)
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  const handleDataSubmission = data => {
     const form = new FormData()
     for(let field of Object.keys(data)){
        if(field === 'blog_img'){
            form.append('blog_img', data[field][0])
            continue
        }
        form.append(field, data[field])
     }
     dispatch(createBlogGroup(form))
     navigate('/dashboard')
  }
  return (
    <div className='dashboard-container'>
        <DashboardSideBar/>
        <div className="dashboard-add-group-form">
            <h2>Create blog group</h2>
            <form action="" onSubmit={handleSubmit(handleDataSubmission)}>
            <div className="form-div">
                    <input type="text" placeholder='name' aria-label='name'
                    {...register('name', { required: true })}
                    />
                    {errors.name && <p role="alert" className='form-error'>name required</p>}
                </div>
                <div className="form-div">
                    <textarea aria-label='description' placeholder='description'
                        {...register('description', { required: true })}
                    rows="5">
                    </textarea>
                    {errors.description && <p role="alert" className='form-error'>description required</p>}
                </div>
                <div className="form-div">
                    <input type="file" {...register('blog_img', { required: true })} aria-label='blog image' />
                    {errors.blog_img && <p role="alert" className='form-error'>blog image required</p>}
                </div>
                <div className="form-div">
                     {categories.length > 0 && (
                        <select {...register('category_name', { required: true})}>
                            <option value="">---- select category ----</option>
                            {categories.map(category => {
                                return (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                )
                            })}
                        </select>
                     )}
                     {errors.category && <p role="alert" className='form-error'>category required</p>}
                </div>
                <button>create group</button>
            </form>
        </div>
    </div>
  )
}

export default AddGroup