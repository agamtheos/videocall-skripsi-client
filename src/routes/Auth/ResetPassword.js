import React, {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button, Form, Input, Alert, Divider, notification} from "antd";

import {resetPassword} from '../../appRedux/actions/Auth'
import {getErrorMessage} from "../../util/helpers"
import '../../styles/custom/ResetPassword.css'

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const onFinish = async ({password}) => {
        try {
            const username = localStorage.getItem('username');
            setSubmitting(true);
            await dispatch(resetPassword(username, password));
            notification.success({
                message: 'Password berhasil direset!',
                description: 'Silahkan login untuk melanjutkan'
            })
            history.push('/auth/login');
            localStorage.removeItem('username');
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
                <h2 className='login-header'>Reset Kata Sandi</h2>
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
                name="reset-password"
                onFinish={onFinish}
                className='form-group'>
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
                            message: 'Kata sandi harus lebih dari 6 karakter!'
                        }
                    ]}>
                        <Input
                        type={showPassword ? "text" : "password"}
                        disabled={submitting}
                        placeholder="Kata sandi"
                        size="large"/>
                    </Form.Item>
                    <p>Konfirmasi Password</p>
                    <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Masukkan ulang kata sandi Anda!'
                        },
                        {
                            min: 6,
                            message: 'Kata sandi harus lebih dari 6 karakter!'
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Kata sandi tidak sama!');
                            }
                        }),
                    ]}>
                        <Input
                        type={showPassword ? "text" : "password"}
                        disabled={submitting}
                        placeholder="Konfirmasi kata sandi"
                        size="large"/>
                    </Form.Item>
                    <Divider/>
                    <Form.Item>
                    <input
                        type="checkbox"
                        id="show-password"
                        name="show-password"
                        onChange={handlePasswordVisibility}
                    />  Lihat Password
                    <Button
                        className="login-btn"
                        loading={submitting}
                        block
                        size="large"
                        type="primary"
                        htmlType="submit">
                        Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
});