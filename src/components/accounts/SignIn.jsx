import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUser } from '../../features/accountSlice'
import DashboardSideBar from '../Dashboard/DashboardSideBar'
import { Link } from 'react-router-dom'
function SignIn() {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmittedData = data => {
      dispatch(signUser(data))
      navigate('/', { replace: true})
  }
  return (
      <div className="content-container">
          <DashboardSideBar/>
          <div className="content-main">
             <div className='auth-form-container'>
                <h2>Sign in user</h2>
                <form className='form' onSubmit={handleSubmit(handleSubmittedData)}>
                    <div className="form-div">
                        <input type="text" placeholder='username' autoComplete='off'
                          {...register('username', { required: true })}
                        aria-label='username' />
                        {errors.username && <p role="alert" className='form-error'>username required</p>}
                    </div>
                    <div className="form-div">
                      <input type="text" placeholder='first name' autoComplete='off'
                          {...register('first_name', { required: true })}
                        aria-label='first_name' />
                        {errors.first_name && <p role="alert" className='form-error'>first name required</p>}
                    </div>

                    <div className="form-div">
                    <input type="text" placeholder='last name' autoComplete='off'
                          {...register('last_name', { required: true })}
                        aria-label='last_name' />
                        {errors.last_name && <p role="alert" className='form-error'>last name required</p>}
                    </div>

                    <div className="form-div">
                        <input type="email" placeholder='email' aria-label='email' autoComplete='off'
                        {...register('email', { required: true })} />
                        {errors.email && <p role="alert" className='form-error'>email required</p>}
                    </div>
                    <div className="form-div">
                        <input type="password" placeholder='password' aria-label='password'
                          autoComplete='off'
                          {...register('password', { required: true })} />
                          {errors.password && <p role="alert" className='form-error'>password required</p>}
                    </div>
                    <button>sign in</button>
                </form>
                <Link to="/accounts/login" className='form-auth-link'>Would you like to login?</Link>
              </div>
          </div>

          <div className="content-right-sidebar">
             <div className="content-right-sidebar-content"></div>
          </div>
      </div>
  )
}

export default SignIn