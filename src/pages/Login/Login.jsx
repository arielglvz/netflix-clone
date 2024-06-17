import React, { useState } from 'react';
import './Login.css';

// ---- Assets
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'

// ---- Firebase Auth
import { login, signup } from '../../firebase'

const Login = () => {
  const [signState, setSignState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loaoding, setLoading] = useState(false)

  const user_auth = async (e) => {
    e.preventDefault() // So it will not reload the page whenever we submit the form
    setLoading(true)
    if(signState === 'Sign In') {
      await login(email, password)
    } else {
      await signup(name, email, password)
    }
    setLoading(false)
  }

  return (
    loaoding 
    ? <div className='loading-spinner'>
      <img src={netflix_spinner} alt="loading spinner" />
    </div>
    : <div className='login'>
      <img src={logo} alt='login logo' className='login-logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" 
          ? <input 
              type="text" 
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder='Your name' 
            /> 
          : <></>}
          <input 
            type="email" 
            value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            placeholder='Email'
          />
          <input 
            type="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder='Password' 
          />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
        {signState === "Sign In" 
          ? <p>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>
          : <p>Already have account? <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>
        }
        </div>
      </div>
    </div>
  )
}

export default Login