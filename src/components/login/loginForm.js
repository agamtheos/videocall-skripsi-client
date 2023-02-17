import React, { useState } from 'react';
import { login } from '../../api/authAPI';
import './loginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmitLogin = async (ev) => {
        ev.preventDefault()

        const data = await login(username, password);
        console.log(data)

        // if (data) {
        //     window.location.href = "/dashboard";
        // }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className='login-header'>Login</h2>
                    <form >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type='text' className='username-input' id="email" name="email" onChange={(ev) => setUsername(ev.target.value)} value={username} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-div">
                            <input className='password-input'
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={(ev) => setPassword(ev.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <div className='show-password'>
                            <input
                                    type="checkbox"
                                    id="show-password"
                                    name="show-password"
                                    onChange={handleShowPassword}
                                />  Show Password
                        </div>
                    </div>
                    <div>
                        <button className='login-btn' onClick={onSubmitLogin} type="submit">Masuk</button>
                    </div>
                    </form>
            </div>
        </div>
    )
}

export default LoginForm;