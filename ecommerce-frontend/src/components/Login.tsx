import React, { useState } from 'react';
   import axios from 'axios';

   const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleLogin = async () => {
       try {
         const response = await axios.post('http://localhost:3000/auth/login', { email, password });
         localStorage.setItem('token', response.data.access_token);
       } catch (error) {
         console.error('Erro ao fazer login', error);
       }
     };

     return (
       <div>
         <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
         <button onClick={handleLogin}>Login</button>
       </div>
     );
   };

   export default Login;