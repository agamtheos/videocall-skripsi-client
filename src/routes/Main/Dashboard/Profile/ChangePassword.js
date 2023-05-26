import React, {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Card, Button, Form, Input, Alert, Divider, notification} from "antd";

import {userChangePassword} from "../../../../appRedux/actions/Auth";
import {getErrorMessage} from "../../../../util/helpers";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const FormChangePassword = memo(() =>
{
	const history = useHistory();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const onFinish = async ({ password, newPassword}) =>
	{
		try {
			setSubmitting(true);
			dispatch(userChangePassword(password, newPassword)).then(() => {
                notification.success({
                    message: 'Berhasil',
                    description: 'Kata sandi berhasil diubah!',
                });
                history.push('/');
            });
            
		} catch(e) {
			setErrorMessage(getErrorMessage(e));
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<React.Fragment>
        {errorMessage ? (
        <Alert
        className="fs-mb-4"
        message={errorMessage}
        type="error"
        showIcon
        closable
        onClose={() => setErrorMessage('')}/>
        ) : null}
        <Form
        {...formItemLayout}
        name="forgot-password"
        onFinish={onFinish}
        className="fs-signin-form fs-form-row0">
            <Form.Item
            label="Kata sandi sekarang"
            name="password"
            rules={[
            {
                required: true,
                message: 'Mohon isi kata sandi!',
            },
            {
            min: 6,
            message: 'Kata sandi minimal 6 karakter!',
            },
            ]}>
            <Input.Password
            disabled={submitting}/>
	        </Form.Item>
            <Form.Item
            label="Kata sandi baru"
            name="newPassword"
            rules={[
                {
                required: true,
                message: 'Mohon isi kata sandi!',
                },
                {
                    min: 6,
                    message: 'Kata sandi minimal 6 karakter!',
                },
	        ]}>
	        <Input.Password
	        disabled={submitting}/>
	        </Form.Item>
            <Form.Item
            label="Konfrmasi kata sandi baru"
            name="newPasswordConfirm"
            rules={[
                {
                required: true,
                message: 'Mohon isi konfirmasi kata sandi!',
                },
                ({getFieldValue}) => ({
                validator: (_, value) => {
                    if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                    return Promise.reject(new Error('Konfirmasi kata sandi tidak sesuai!'));
                },
                }),
            {
                min: 6,
                message: 'Kata sandi minimal 6 karakter!',
            },
            ]}>
                <Input.Password
                disabled={submitting}/>
            </Form.Item>
            <Divider/>
            <Form.Item {...tailFormItemLayout}>
            <Button
            loading={submitting}
            size="large"
            type="primary"
            htmlType="submit">
                Simpan perubahan
            </Button>
            </Form.Item>
            {/* <Divider/> */}
            <Form.Item {...tailFormItemLayout}>
            <Button
            onClick={() => history.push('/')}
            size="large"
            type="primary"
            htmlType="submit">
                Kembali
            </Button>
            </Form.Item>
        </Form>
		</React.Fragment>
	)
});

export default memo(() =>
{
	return (
		<Card title="Ganti Password">
			<FormChangePassword/>
		</Card>
	)
});