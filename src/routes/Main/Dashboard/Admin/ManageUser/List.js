import React, {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {Card,
	Button,
	Table,
	Avatar,
	Tooltip, 
	Popconfirm, 
	Input, 
	Row, 
	Col, 
	notification, 
	Typography, 
	Space, 
	Divider, 
	Form
} from "antd";
import {
	UserAddOutlined,
	EditOutlined,
	DeleteOutlined,
	SearchOutlined
} from "@ant-design/icons";

import {
	getUsersList,
	resetUsersSorterFilters,
	deleteUser,
	handleUserPagination,
	handleUsersSorter,
	searchUsers
} from "../../../../../appRedux/actions/Users";
import { getDateFormat, getInitials, getErrorMessage } from "../../../../../util/helpers";
import { RoleableComponent } from "../../../../../util/features";

const {Text} = Typography;

const Actions = memo(({row}) => {
	const dispatch = useDispatch();

	const [deleting, setDeleting] = useState(false);
	const onDelete = async () => {
		try {
			setDeleting(true);
			await dispatch(deleteUser(row.id));
			notification.success({
				message: 'Berhasil dihapus',
				description: 'Data user berhasil dihapus',
			});
		} catch(e) {
			notification.error({
				message: 'Terjadi kesalahan',
				description: getErrorMessage(e),
			});
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="fs-h-100 fs-align-items-center">
			<RoleableComponent>
				<Link
					to={`/dashboard/admin/manage-user/update/${row.id}`}
					className="fs-mr-1">
						<Tooltip title="Edit">
							<Button
								disabled={deleting}
								type="primary"
								size="small"
								icon={<EditOutlined/>}/>
						</Tooltip>
				</Link>
			</RoleableComponent>
			<RoleableComponent>
				<Tooltip title="Hapus">
					<Popconfirm
						placement="topRight"
						title="Hapus user ini ?"
						onConfirm={onDelete}
						okText="Ya, Hapus"
						cancelText="Batal"
						cancelButtonProps={{
							className: 'fs-mr-1'
						}}>
							<Button
								loading={deleting}
								type="primary"
								size="small"
								icon={<DeleteOutlined/>}/>
					</Popconfirm>
				</Tooltip>
			</RoleableComponent>
		</div>
	)
});

const List = memo(() => {
	const dispatch = useDispatch();
	const {loading, data, total, page, rowsPerPage} = useSelector(({users}) => users);

	useEffect(() => {
		dispatch(getUsersList());
		return () => dispatch(resetUsersSorterFilters());
	}, [dispatch]);

	const RoleComponent = ({title}) => {
		const role = () => {
			switch(title) {
				case 'admin':
					return 'Admin';
				case 'client':
					return 'Client';
				default:
					break;
			}
		};

		const color = {
			admin: 'success',
			client: 'danger'
		}

		return (
			<Space direction="vertical">
				<Text type={color[title]}>{role()}</Text>
			</Space>
		)
	};

	const tableColumns = [
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			sorter: true,
			render: (value, row) => {
				return (
					<div className="fs-d-inline-flex">
						<Avatar
							className="fs-bg-primary"
							style={{ verticalAlign: 'middle' }}
							size="large">
							{getInitials(value)}
						</Avatar>
						<div className="fs-ml-2">
							<h5 className="fs-mb-0 fs-mt-1">{value}</h5>
							<span className="fs-fs-sm fs-text-muted">{row.username}</span>
						</div>
					</div>
				)
			}
		},
		{
			title: 'Role',
			sorter: true,
			dataIndex: 'role',
			key: 'role',
			width: '13rem',
			render: (value, row) => {
				switch(value) {
					case 'admin':
						return (<RoleComponent title={value} />);
					case 'client':
						return (<RoleComponent title={value} />);
					default:
					break;
				}
			}
		},
		{
			title: 'Dibuat pada',
			dataIndex: 'created_at',
			key: 'created_at',
			width: '12rem',
			sorter: true,
			render: (value) => value ? getDateFormat(value) : '-'
		},
		{
			title: '',
			dataIndex: 'action',
			key: 'action',
			width: '6rem',
			align: 'center',
			render: (value, row) => <Actions row={row}/>
		}
	]

	const onChange = (pagination, filters, sorter, extra) => {
		switch (extra.action) {
			case 'paginate':
				const {current, pageSize} = pagination;
				dispatch(handleUserPagination(current, pageSize));
			break;
			case 'sort':
				const direction = sorter.order === 'ascend' ? 'asc' : 'desc';
				let sorterValue;
				if (sorter.column !== undefined) {
					switch (sorter.field) {
						case 'username':
							console.log('er')
							sorterValue = `username_${direction}`;
						break;
						case 'role':
							sorterValue = `role_${direction}`;
						break;
						case 'created_at':
							sorterValue = `created_${direction}`;
						break;
						default:

						break;
					}
				}
				console.log('result', sorterValue)
				dispatch(handleUsersSorter(sorterValue ?? null));
			break;
			default:

			break;
		}
	};

	return (
		<Table
			loading={loading}
			columns={tableColumns}
			size="small"
			dataSource={data}
			onChange={onChange}
			pagination={{
				current: page,
				total: total,
				pageSize: rowsPerPage,
				pageSizeOptions: [10,20,50,100,200,500,1000],
				showTotal: (total, range) => <span className="fs-fs-sm">{range[0]}-{range[1]} dari {total} data</span>
			}}
			rowKey={(row) => row.id}/>
	)
});

export default memo(() => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {query} = useSelector(({users}) => users);

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
	
	return (
		<Card title={(
			<Row>
				<Col xxl={4} xl={4} lg={5} md={6} sm={24} xs={24}>
					<RoleableComponent>
						<Link to="/dashboard/admin/manage-user/create">
							<Button
							block
							className="fs-mb-1"
							type="primary"
							icon={<UserAddOutlined/>}>
								Buat user
							</Button>
						</Link>
					</RoleableComponent>
				</Col>
				<Col xxl={12} xl={12} lg={12} md={10} sm={24} xs={24}/>
				<Col xxl={8} xl={8} lg={7} md={8} sm={24} xs={24}>
					<Input
					allowClear
					defaultValue={query}
					className="fs-w-100"
					placeholder="Cari nama atau email"
					suffix={<SearchOutlined/>}
					onChange={({target}) => !target.value && dispatch(searchUsers(''))}
					onPressEnter={({target}) => dispatch(searchUsers(target.value))}/>
				</Col>
			</Row>
		)} bodyStyle={{padding: 12}}>
			<div style={{overflow: 'auto hidden'}}>
				<List/>
			</div>
			<Divider/>
				<Form.Item {...tailFormItemLayout}>
					<Button
					onClick={() => history.push('/dashboard/admin/home')}
					size="large"
					type="primary"
					htmlType="submit">
						Kembali
					</Button>
				</Form.Item>
		</Card>
	)
});