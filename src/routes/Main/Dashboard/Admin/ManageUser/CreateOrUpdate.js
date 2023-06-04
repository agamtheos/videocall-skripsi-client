import React, {memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams, useHistory, Link} from "react-router-dom";
import {Button, Card, Form, Input, Radio, Checkbox, Divider, Alert, notification, Select} from "antd";
import {
	LeftOutlined,
	UserOutlined,
    LoadingOutlined
} from "@ant-design/icons";

import {
    createUser,
    updateUser,
    getUserDetail
} from "../../../../../appRedux/actions/Users";
import { getErrorMessage } from "../../../../../util/helpers";

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

const FormUser = memo(({record}) => {
    const dispatch = useDispatch();
    const history = useHistory();
	const {id} = useParams();
	const [form] = Form.useForm();

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (value) => {
        try {
            setSubmitting(true);
            if (id) {
                let payload = {};

                if (value.username) payload['username'] = value.username;

                if (value.role) payload['role'] = value.role;

                if (value.password) payload['password'] = value.password;

                await dispatch(updateUser(id, payload));
                notification.success({
                    message: 'Berhasil diperbarui',
                    description: 'Data user berhasil diperbarui',
                });
                history.push('/dashboard/admin/manage-user');
            } else {
                await dispatch(createUser({
                    username: value?.username ?? '',
                    password: value?.password ?? '',
                    role: value?.role ?? '',
                }));
                notification.success({
                    message: 'Berhasil ditambahkan',
                    description: 'Data user berhasil ditambahkan',
                });
                history.push('/dashboard/admin/manage-user');
            }
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        } finally {
            setSubmitting(false);
        }
    };

    const [isPaswordConfirmRequired, setPaswordConfirmRequired] = useState(false);

    return (
        <React.Fragment>
            {errorMessage ? (
                <Alert
                type="error"
                message={errorMessage}
                showIcon
                closable
                onClose={() => setErrorMessage('')}/>
                ) : null}
                <Form
                    {...formItemLayout}
                    form={form}
                    name="formUser"
                    onFinish={onSubmit}
                    scrollToFirstError>
                    {id ? (
                        <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: false,
                                message: 'Mohon isi username!',
                            },
                            {
                                pattern: /^[a-z0-9]+$/,
                                message: 'Username hanya boleh huruf kecil dan angka tanpa spasi!',
                            }
                        ]}>
                        <Input disabled={submitting}/>
                        </Form.Item>
                    ) : (
                        <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Mohon isi username!',
                            },
                            {
                                pattern: /^[a-z0-9]+$/,
                                message: 'Username hanya boleh huruf kecil dan angka tanpa spasi!',
                            }
                        ]}>
                        <Input disabled={submitting}/>
                        </Form.Item>
                    )}
                    {id ? (
                        <Form.Item 
                        name="role"
                        label="Role"
                        rules={[
                            {
                                required: false,
                                message: 'Masukkan role Anda!'
                            }
                        ]}>
                            <Radio.Group disabled={submitting}>
                                <Radio 
                                className="fs-d-block"
                                value="admin">
                                    Admin
                                </Radio>
                                <Radio 
                                className="fs-d-block"
                                value="client">
                                    Client
                                </Radio>
                            </Radio.Group>
                    </Form.Item>
                    ) : (
                        <Form.Item 
                        name="role"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: 'Masukkan role Anda!'
                            }
                        ]}>
                            <Radio.Group disabled={submitting}>
                                <Radio 
                                className="fs-d-block"
                                value="admin">
                                    Admin
                                </Radio>
                                <Radio 
                                className="fs-d-block"
                                value="client">
                                    Client
                                </Radio>
                            </Radio.Group>
                    </Form.Item>
                    )}
                        <Card className="fs-bg-light-grey">
                            {id ? (
                                <Form.Item
                                name='password'
                                label={`Kata Sandi (Opsional)`}
                                rules={[
                                    {
                                        required: false,
                                        message: 'Mohon isi kata sandi!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Kata sandi minimal 6 karakter!',
                                    },
                                ]}>
                                <Input.Password 
                                    onChange={({target}) => {
                                        setPaswordConfirmRequired(target.value ? true : false);
                                    }}
                                />
                            </Form.Item>
                            ) : (
                                <Form.Item
                                name='password'
                                label={`Kata Sandi`}
                                rules={[
                                    {
                                        required: false,
                                        message: 'Mohon isi kata sandi!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Kata sandi minimal 6 karakter!',
                                    },
                                ]}>
                                <Input.Password 
                                    onChange={({target}) => {
                                        setPaswordConfirmRequired(target.value ? true : false);
                                    }}
                                />
                            </Form.Item>
                            )}
                            <Form.Item
                                name="userPasswordConfirm"
                                label={`Konfirmasi Kata Sandi`}
                                rules={[
                                    {
                                    required: isPaswordConfirmRequired,
                                    message: 'Mohon isi konfirmasi kata sandi!',
                                    },
                                    {
                                    min: 6,
                                    message: 'Kata sandi minimal 6 karakter!',
                                    },
                                    ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Kata sandi tidak sama!'));
                                    },
                                    }),
                                ]}>
                                <Input.Password/>
                            </Form.Item>
                            {id ? (
                            <div className="fs-w-100 fs-text-right">
                                <small className="fs-text-danger fs-text-right">
                                * Isi kata sandi jika anda ingin mengubah kata sandi
                                </small>
                            </div>
                            ) : null}
                        </Card>
                    <Divider/>
                    <Form.Item {...tailFormItemLayout}>
                    <Button
                    loading={submitting}
                    type="primary"
                    htmlType="submit">
                        Simpan
                    </Button>
                            <Link to="/dashboard/admin/manage-user">
                        <Button disabled={submitting}>
                        Batal
                        </Button>
                            </Link>
                    </Form.Item>
                </Form>
        </React.Fragment>
    )
});

export default memo(() => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [record, setRecord] = useState(null);

    useEffect(() => {
        if (id) {
            (async () =>
            {
                try {
                    setLoading(true);
                    const data = await dispatch(getUserDetail(id));
                    setRecord(data);
                } catch(e) {
                // statements
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [dispatch, id]);

    return (
        <Card title={(
			<div className="fs-d-inline-flex fs-justify-content-between fs-align-items-center">
				<Link
				to="/dashboard/admin/manage-user"
				className="fs-mr-2">
					<Button
					shape="circle"
					className="fs-mb-0">
						<LeftOutlined/>
					</Button>
				</Link>
				<h2 className="fs-mt-2">
					<UserOutlined className="fs-mr-2"/>
					{id ? 'Perbarui User' : 'Buat User Baru'}
				</h2>
			</div>
		)}>
            {loading ? <LoadingOutlined className="fs-fs-icon-lg"/> : <FormUser record={record}/>}
		</Card>
    )
});