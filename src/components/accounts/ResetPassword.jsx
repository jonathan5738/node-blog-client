import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetUserPassword } from '../../features/accountSlice'
function ResetPassword({ handlePasswordResetForm }) {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDataSubmit = data => {
      dispatch(resetUserPassword(data))
      navigate('/dashboard', { replace: true })
  }
  return (
    <div>
        <h2>Reset your password</h2>
        <form onSubmit={handleSubmit(handleDataSubmit)}>
           <div className="form-div">
                <input type="password" placeholder='oldPassword' aria-label='oldPassword'
                  {...register('oldPassword', { required: true })}
                 />
                 {errors.oldPassword && <p role="alert" className='form-error'>previous password required</p>}
            </div>
            <div className="form-div">
                <input type="password" placeholder='newPassword' aria-label='newPassword'
                  {...register('newPassword', { required: true })}
                 />
                 {errors.newPassword && <p role="alert" className='form-error'>new password required</p>}
            </div>
            <div className="form-div">
                <input type="password" placeholder='confirmPassword' aria-label='confirmPassword'
                  {...register('confirmPassword', { required: true })}
                 />
                 {errors.confirmPassword && <p role="alert" className='form-error'>confirm password required</p>}
            </div>
            <button>reset password</button>
        </form>
    </div>
  )
}

export default ResetPassword