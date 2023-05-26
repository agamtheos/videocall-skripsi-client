import React, {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button, Form, Input, Alert, Divider} from "antd";

import {forgotPassword} from '../../appRedux/actions/Auth'
import {getErrorMessage} from "../../util/helpers"
import '../../styles/custom/ForgotPassword.css'

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const onFinish = async ({username}) => {
        try {
            setSubmitting(true);
            await dispatch(forgotPassword(username));
            localStorage.setItem('username', username);
            history.push('/auth/reset-password');
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
                <h2 className='login-header'>Lupa Sandi</h2>
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
                    <p>Masukkan Username Anda untuk melakukan ganti Password!</p>
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
                    <Button
                        className="login-btn"
                        loading={submitting}
                        block
                        size="large"
                        type="primary"
                        htmlType="submit">
                        Kirim
                        </Button>
                </Form>
            </div>
        </div>
    )
});