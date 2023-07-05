import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ user, setUser, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      })

      const message = `Welcome back, ${user.name}!`
      const type = 'success'

      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      
      
      showNotification(message, type);
      
    } catch (exception) {
      const message = `Wrong credentials. Please check your username and password.`
      const type = 'error'

      showNotification(message, type);
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInUser');
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username: 
        <input 
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input 
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      }
    </div>
  )
}

export default Login