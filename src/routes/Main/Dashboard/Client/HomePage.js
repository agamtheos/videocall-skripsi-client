import React, { memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { Button, Dropdown, Modal } from "antd";
import {
    QuestionCircleOutlined
} from '@ant-design/icons';

import { register, 
    registerResponse, 
    callResponse,
    incomingCall,
    startCommunication,
    stop
} from "../../../../classes/Connection";
import { getConfig } from "../../../../Config";
import { webSocketController } from "../../../../classes/WebSocket";
import { userSignOut } from "../../../../appRedux/actions/Auth";
import { getAllAdminsOnline } from "../../../../appRedux/actions/Admin";
import { Layout } from "../../../../components/Layout";
import { Users } from "../../../../components/Users";
import Icon from "../../../../components/Icon";

const WebRtcPeerClass = require('../../../../classes/WebRtcPeer');
const Connection = require('../../../../classes/Connection');
const WebRtcPeer = new WebRtcPeerClass();

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [peerName, setPeerName] = useState('');
    const [users, setUsers] = useState([])
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    const WEB_SOCKET_URL = getConfig('WEB_SOCKET_URL');
    
    const fetchUserData = () => {
        dispatch(getAllAdminsOnline())
            .then((res) => {
                setUsers(res)
            })
    }

    const onSignOut = () => {
        Modal.confirm({
            icon: <QuestionCircleOutlined/>,
            title: `Logout akun`,
            content: 'Apakah anda yakin ingin logout dari akun anda ?',
            okText: 'Ya, Logout',
            cancelText: 'Batal',
            onOk: () => {
                dispatch(userSignOut(username));
                window.location.href = '/auth/login';
            }
        });
	};

    const items = [
        {
            key: "1",
            label: (
                <Link to="/">
                    <Icon name="edit" width={16} height={16} /> Change Password
                </Link>
            ),
        },
        {
            key: "2",
            label: (
                <Link to="/">
                    <Icon name="group" width={16} height={16} /> Edit Profile
                </Link>
            ),
        },
        {
            key: "3",
            label: (
                <Link onClick={onSignOut}>
                    <Icon name="setting" width={16} height={16} /> Logout
                </Link>
            ),
        },
    ];

    const navigateTo = () => history.push('/dashboard/room/call');

    async function connWS() {
        // const ws = webSocketController.connect('wss://localhost:3030/one2one');
        const ws = webSocketController.connect(WEB_SOCKET_URL);
        ws.onopen = async function() {
            console.info('Connection with websocket server opened');
            await register(username);
        }
        // const ws = webSocketController.connect('wss://192.168.1.101:3030/one2one');
        // const ws = webSocketController.connect('wss://192.168.1.100:3030/one2one');
        ws.onmessage = async function(message) {
            var parsedMessage = JSON.parse(message.data);
            console.info('Received message: ' + message.data);
        
            switch (parsedMessage.id) {
            case 'registerResponse':
                await registerResponse(parsedMessage);
                break;
            case 'callResponse':
                callResponse(parsedMessage);
                break;
            case 'incomingCall':
                incomingCall(parsedMessage);
                break;
            case 'startCommunication':
                startCommunication(parsedMessage);
                break;
            case 'stopCommunication':
                console.info("Communication ended by remote peer");
                stop(true);
                const link = role === "admin" ? "/dashboard/admin/home" : "/dashboard/client/home";
                // history.push(link);
                window.location.replace(link);
                break;
            case 'iceCandidate':
                const webRtcPeer = WebRtcPeer.getPeers()
                console.log(webRtcPeer)
                console.log('TESSSSTTTTTTT')
                console.log(parsedMessage.candidate)
                await webRtcPeer.addIceCandidate(parsedMessage.candidate)
                // add delay 2s
                setTimeout(() => {
                    // setLoading(false);
                    navigateTo();
                }, 5000);
                break;
            default:
                console.error('Unrecognized message', parsedMessage);
            }
        }
    }

    useEffect(() => {
        fetchUserData()
        async function init() {
            await connWS();
        }
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            isVideoCall={false}
            rightSection={
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                >
                    <Button
                        type="link"
                        icon={<Icon name="user" width={32} height={32} />}
                        ghost
                    />
                </Dropdown>
            }
        >
            <Users data={users} />
        </Layout>
    );
});

// const users = [
//     {
//         id: 1,
//         name: "Karen A",
//         shortName: "KA",
//         imageUrl: "",
//         background: "#fa541c",
//     },
//     {
//         id: 2,
//         name: "Jenny Weigel",
//         shortName: "JW",
//         imageUrl: "",
//         background: "#722ed1",
//     },
//     {
//         id: 3,
//         name: "Katherine W",
//         shortName: "KW",
//         imageUrl: "",
//         background: "#eb2f96",
//     },
//     {
//         id: 4,
//         name: "James Arkhan",
//         shortName: "JA",
//         imageUrl: "",
//         background: "#1890ff",
//     },
//     {
//         id: 5,
//         name: "Boy W",
//         shortName: "BW",
//         imageUrl: "",
//         background: "#13c2c2",
//     },
// ];
