import { useState } from "react"
import { getAllUsers, createUser } from "../routes/userRoutes"

const Signup = ({googleUser, setUser}) => {
  const [username, setUsername] = useState(googleUser.given_name)
  const createAccount = (_username) => {
    
    if(_username && !/ /g.test(_username)){
      const googleUsers = getAllUsers()
      const count = googleUsers.filter(user => user.username.slice(0, -5) === _username).length
      const countString = `${10000 + count}`
  
      const userObject = {
        id: googleUser.sub,
        username: `${_username}#${countString.slice(1)}`
      }
      createUser(userObject)
      setUser(userObject)
    }
  }

  return(
    <>
      <p>Insert username and press enter</p>
      <input
      autoFocus
      type='text'
      className="signup-text"
      value={username}
      onKeyPress={(e)=> {if(e.key === 'Enter') createAccount(username)}}
      onChange={e => setUsername(e.target.value)}
      />
    </>
  )
}

export default Signup