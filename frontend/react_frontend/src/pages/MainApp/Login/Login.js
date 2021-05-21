import React, { useState } from 'react'
import './Login.css'
import { GitHub } from '@material-ui/icons';
import useUser from 'hooks/useUser'
import { Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';


const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [section, setSection] = useState('login');
  const [errorMsg, setErrorMsg] = useState('Login error! Try Again')
  const { isAuthenticated, login, register } = useUser();
  const [toastr, setToastr] = useState(false);

  if (isAuthenticated) return <Redirect to='/' /> // User cannot enter to login if it's already authenticated

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).then((res) => {
      if (res === false) {
        setToastr(true);
        setErrorMsg('Login error! Try Again')
      }else{
          window.location.reload()
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    register({ username, email, password }).then((res) => {
      if (res === false) {
        setToastr(true);
        setErrorMsg('Register error! Try Again')
      }else{
          window.location.reload()
      }
    })
  }

  return (
    <div className="login-container">
      <h1>Login with</h1>
      {
        section === 'login' ?
          <section className="login__social-options">
            <article className="social-btn github-btn"><GitHub /></article>
            <article className="social-btn google-btn">G</article>
            <article className="social-btn facebook-btn">f</article>
          </section> : null
      }
      <h3 className="line-separator" style={section !== 'login' ? { visibility: 'hidden' } : {}}><span>or</span></h3>
      {
        section === 'login' ?
          <form className="loginForm" onSubmit={handleSubmit}>
            <input id="input_login_email" type="email" name="login_email" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} value={email} />
            <input id="input_login_password" type="password" name="login_email" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="login-btn" id="login-btn">LOGIN</button>
          </form> :
          <form className="loginForm" onSubmit={handleRegister}>
            <input id="input_register_username" type="text" name="login_email" placeholder="Username.." onChange={(e) => setUsername(e.target.value)} value={username} />
            <input id="input_register_email" type="email" name="login_email" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} value={email} />
            <input id="input_register_password" type="password" name="login_email" placeholder="Password.." onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="login-btn" id="register-btn">REGISTER</button>
          </form>
      }

      <section className="login-links">
        {
          section === 'login' ?
            <a href="#ee" onClick={() => { setSection('register') }} id="register-link" className="login-link">Create an account</a> :
            <a href="#ee" className="login-link" onClick={() => { setSection('login') }}>I've already have an account</a>
        }
        <a href="#ee" className="login-link">I've forgotten my password</a>
      </section>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={toastr}
        onClose={() => setToastr(false)}
        message={errorMsg}
      ></Snackbar>

    </div >
  )
};

export default Login