import React, {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {userRegister} from "../../appRedux/actions/Auth"
import {getErrorMessage} from "../../util/helpers"
import {Button, Form, Input, Alert, Divider, notification, Select} from "antd";
import '../../styles/custom/Register.css'

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onFinish = async ({username, password, role}) => {
        try {
            setSubmitting(true);
            await dispatch(userRegister(username, password, role));
            notification.success({
                message: 'Akun berhasil dibuat!',
                description: 'Silahkan login untuk melanjutkan'
            })
            history.push('/auth/login');
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2 className='register-header'>Daftar</h2>
                {errorMessage ? (
                <Alert
                className="register-error"
                message={errorMessage}
                type="error"
                showIcon
                closable
                onClose={() => setErrorMessage('')}/>
                ) : null}
                <Divider/>
                <Form
                name="register"
                onFinish={onFinish}
                className='form-group'>
                    <p>Username</p>
                    <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Masukkan Username Anda!'
                        },
                        {
                            pattern: /^[a-z0-9]+$/,
                            message: 'Username hanya boleh huruf kecil dan angka tanpa spasi!',
                        }
                    ]}>
                        <Input
                        className="ant-input-lg"
                        disabled={submitting}
                        placeholder="Username"
                        size="medium"/>
                        
                    </Form.Item>
                    <p>Role</p>
                    <Form.Item 
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Masukkan role Anda!'
                        }
                    ]}>
                        <Select
                        onChange={(value) => console.log(value)}
                        placeholder="Pilih role"
                        options={[
                            { value: 'admin', label:'Admin' },
                            { value: 'client', label:'Client' }
                        ]}
                        />
                    </Form.Item>
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
                        className="register-btn"
                        loading={submitting}
                        block
                        size="large"
                        type="primary"
                        htmlType="submit">
                        Daftar
                        </Button>
                        <Link
                        className="register-form-login"
                        to="/auth/login">
                            Login disini
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
});