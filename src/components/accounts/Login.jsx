import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../features/accountSlice'
import DashboardSideBar from '../Dashboard/DashboardSideBar'
import { Link } from 'react-router-dom'
function Login() { 
  const { register, handleSubmit, formState: { errors }} = useForm()
  const dispatch = useDispatch()
  const handleSubmittedData = data => {
      dispatch(loginUser(data))
  }
  return (
    <div className='content-container'>
        <DashboardSideBar/>
        <div className="content-main">
        <div className='auth-form-container'>
              <h3>Log in user</h3>
              <form action="" onSubmit={handleSubmit(handleSubmittedData)} className="form">
                  <div className="form-div">
                      <input type="text" placeholder='username' aria-label='username'
                        {...register('username', { required: true })}
                      />
                      {errors.username && <p role="alert" className='form-error'>username required</p>}
                  </div>
                  <div className="form-div">
                      <input type="password" placeholder='password' aria-label='password'
                        {...register('password', { required: true })}
                      />
                      {errors.username && <p role="alert" className='form-error'>password required</p>}
                  </div>
                  <button>login</button>
              </form>
              <Link to="/accounts/signin">Don't you have an account?</Link>
         </div>
        </div>
        <div className="content-right-sidebar">
             <div className="content-right-sidebar-content"></div>
        </div>
    </div>
  )
}

export default Login