import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
      
    } catch (exception) {
      console.log('Wrong credentials');
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInUser');
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input 
          type="text"
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