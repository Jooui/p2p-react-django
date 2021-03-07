import React, {useState} from 'react'
import './Login.css'
import { GitHub } from '@material-ui/icons';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password)
  }

  return (
    <div className="login-container">
      <h1>Login with</h1>
      <section className="login__social-options">
        <article className="social-btn github-btn"><GitHub /></article>
        <article className="social-btn google-btn">G</article>
        <article className="social-btn facebook-btn">f</article>
      </section>
      <h3 className="line-separator"><span>or</span></h3>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input type="email" name="login_email" placeholder="Email.." onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" name="login_email" placeholder="Password.."  onChange={(e) => setPassword(e.target.value)} value={password} />
        <button className="login-btn">LOGIN</button>
      </form>
      <section className="login-links">
        <a href="#a" className="login-link">Create an account</a>
        <a href="#a" className="login-link">I've forgotten my password</a>
      </section>

    </div>
  )
};

export default Login