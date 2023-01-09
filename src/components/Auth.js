import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()
        const body = {
            username,
            password
        }

        const baseUrl = 'https://socialmtn.devmountain.com'

        axios.post(register ? `${baseUrl}/register` : `${baseUrl}/login`, body)
            .then(({data}) => {
                console.log('AFTER AUTH', data)
                console.log(authCtx)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)

                
            })
            .catch(err => {
                setPassword('')
                setUsername('')
            })

       console.log('submitHandler called', username, password)
    //    setRegister(!register)
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='text' 
                   placeholder='Username'
                   onChange={(e) => setUsername(e.target.value)}/>
               <input
                   className='form-input'
                   type='text' 
                   placeholder='Password'
                   onChange={(e) => setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up' }?</button>
       </main>
   )
}
 
export default Auth