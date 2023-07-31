import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Form, Input, Alert, Divider, Select} from "antd";
import {useDispatch} from "react-redux";

import {userSignIn} from '../../appRedux/actions/Auth'
import {getErrorMessage} from "../../util/helpers"
import '../../styles/custom/Register.css'

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onFinish = async ({username, role}) => {
        try {
            setSubmitting(true);
            await dispatch(userSignIn(username, role));
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
            localStorage.setItem('alias', username.split(' ').map(word => word[0]).join('').toUpperCase());
            history.push('/');
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2 className='register-header'>Masuk</h2>
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
                <p>Isi Form dibawah untuk melanjutkan</p>
                <Form
                name="register"
                onFinish={onFinish}
                className='form-group'>
                    <p>Nama</p>
                    <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Masukkan Nama Anda!'
                        },
                        {
                            pattern: /^[a-z0-9]+$/,
                            message: 'Nama hanya boleh huruf kecil dan angka tanpa spasi!',
                        }
                    ]}>
                        <Input
                        className="ant-input-lg"
                        disabled={submitting}
                        placeholder="Nama"
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
                    <Divider/>
                    <Form.Item>
                    <Button
                        className="register-btn"
                        loading={submitting}
                        block
                        size="large"
                        type="primary"
                        htmlType="submit">
                        Masuk
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
});