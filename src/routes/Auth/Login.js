import React, {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {userSignIn} from '@actions/Auth'
import {getErrorMessage} from "@util/helpers"
import {Button, Form, Input, Alert, Divider} from "antd";
import '../../styles/custom/Login.css'

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const onFinish = async ({username, password}) => {
        try {
            setSubmitting(true);
            await dispatch(userSignIn(username, password));
            history.push('/');
        } catch (error) {
            console.log(error)
            setErrorMessage(getErrorMessage(error));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className='login-header'>Login</h2>
                {errorMessage ? (
                <Alert
                className="login-error"
                message={errorMessage}
                type="error"
                showIcon
                closable
                onClose={() => setErrorMessage('')}/>
                ) : null}
                <Divider/>
                <Form
                name="login"
                onFinish={onFinish}
                className='form-group'>
                    <p>Username</p>
                    <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Masukkan Username Anda!'
                        }
                    ]}>
                        <Input
                        className="ant-input-lg"
                        disabled={submitting}
                        placeholder="Username"
                        size="medium"/>
                        
                    </Form.Item>
                    <br/>
                    <p>Password</p>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Masukkan kata sandi Anda!'
                        },
                        {
                            min: 6,
                            message: 'Kata sandi minimal 6 karakter!'
                        }
                    ]}>
                        <Input
                        type={showPassword ? "text" : "password"}
                        disabled={submitting}
                        placeholder="Kata sandi"
                        size="large"/>
                    </Form.Item>
                    <Divider/>
                    <Form.Item>
                    <br/>
                    <input
                        type="checkbox"
                        id="show-password"
                        name="show-password"
                        onChange={handlePasswordVisibility}
                    />  Lihat Password
                    <br/>
                    <Button
                        className="login-btn"
                        loading={submitting}
                        block
                        size="large"
                        type="primary"
                        htmlType="submit">
                        Log in
                        </Button>
                        <Link
                        className="login-form-register"
                        to="/auth/admin/register">
                            Daftar!
                        </Link>
                        <Link
                        className="login-form-forgot"
                        to="/auth/forgot-password">
                            Lupa kata sandi ?
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
});