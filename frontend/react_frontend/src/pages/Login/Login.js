import './Login.css'
import { GitHub } from '@material-ui/icons';


const Login = () => (
  <div className="login-container">
    <h1>Login with</h1>
    <section className="login__social-options">
      <article className="social-btn github-btn"><GitHub /></article>
      <article className="social-btn google-btn">G</article>
      <article className="social-btn facebook-btn">f</article>
    </section>
    <h3 className="line-separator"><span>or</span></h3>
    <form className="loginForm">
      <input type="email" name="login_email" placeholder="Email.." />
      <input type="password" name="login_email" placeholder="Password.." />
      <button className="login-btn">LOGIN</button>
    </form>
    <section className="login-links">
      <a href="#a" className="login-link">Create an account</a>
      <a href="#a" className="login-link">I've forgotten my password</a>
    </section>

  </div>
);

export default Login