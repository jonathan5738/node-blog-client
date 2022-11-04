import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signUser } from '../../features/accountSlice'
function SignIn() {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const dispatch = useDispatch()
  const handleSubmittedData = data => {
      dispatch(signUser(data))
  }
  return (
    <div>
        <h2>Sign in user</h2>
        <form action="" onSubmit={handleSubmit(handleSubmittedData)}>
            <div className="form-div">
                <input type="text" placeholder='username' 
                  {...register('username', { required: true })}
                aria-label='username' />
                {errors.username && <p role="alert" className='form-error'>username required</p>}
            </div>
            <div className="two-fiels">
               <input type="text" placeholder='first_name' 
                  {...register('first_name', { required: true })}
                aria-label='first_name' />
                {errors.first_name && <p role="alert" className='form-error'>first name required</p>}

                <input type="text" placeholder='last_name' 
                  {...register('last_name', { required: true })}
                aria-label='last_name' />
                {errors.last_name && <p role="alert" className='form-error'>last name required</p>}
            </div>
            <div className="form-div">
                <input type="email" placeholder='email' aria-label='email'
                 {...register('email', { required: true })} />
                 {errors.email && <p role="alert" className='form-error'>email required</p>}
            </div>
            <div className="form-div">
                 <input type="password" placeholder='password' aria-label='password'
                   {...register('password', { required: true })} />
                   {errors.password && <p role="alert" className='form-error'>password required</p>}
            </div>
            <button>sign in</button>
        </form>
    </div>
  )
}

export default SignIn