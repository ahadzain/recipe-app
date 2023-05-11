import './auth.css'
import '../App.css'
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    return(
        <div className="container auth">
            <Login />
            <Register />
        </div>
    );
}

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/auth/login",{
                username, password
            });
            console.log(response);
            setCookies("access_token", response.data.token)
            window.localStorage.setItem("userId", response.data.userID)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return <Form 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        handleSubmit={handleSubmit}
    />
}

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username, password,
            });
            alert("registration successful! now login.");
        } catch (error) {
            console.log(error)
        }
    }

    return <Form 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        handleSubmit={handleSubmit}
    />
}

const Form = ({username, setUsername, password, setPassword, label, handleSubmit }) => {
    return(
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h1>{label}</h1>
                <div className='form'>
                    <label htmlFor='username'>Username: </label>
                    <input 
                        type='text' 
                        id='username' 
                        value={username}
                        onChange={(event => setUsername(event.target.value) )} 
                    />
                    <label htmlFor='username'>Password: </label>
                    <input 
                        type='password' 
                        id='username' 
                        value={password}
                        onChange={(event => setPassword(event.target.value) )} 
                    />
                    <button type='submit'>{label}</button>
                </div>
            </form>
        </div>
    );
}