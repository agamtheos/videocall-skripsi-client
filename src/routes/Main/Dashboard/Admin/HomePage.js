import React, { memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import { Button, Dropdown, Modal } from "antd";
import {
    QuestionCircleOutlined
} from '@ant-design/icons';

import { register, 
    registerResponse, 
    callResponse,
    incomingCall,
    startCommunication,
    stop as stopCall,
    onReceiveFinishRequest,
    rejectCall
} from "../../../../classes/Connection";
import { getConfig } from "../../../../Config";
import { webSocketController } from "../../../../classes/WebSocket";
import { userSignOut } from "../../../../appRedux/actions/Auth";
import { getAllClientsOnline } from "../../../../appRedux/actions/Client";
import { Layout } from "../../../../components/Layout";
import { Users } from "../../../../components/Users";
import Icon from "../../../../components/Icon";
import incomingSound from '../../../../assets/sounds/incoming_call.mp3';

const WebRtcPeerClass = require('../../../../classes/WebRtcPeer');
const WebRtcPeer = new WebRtcPeerClass();

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [users, setUsers] = useState([])
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const WEB_SOCKET_URL = getConfig('WEB_SOCKET_URL');
    let [playAudio, setPlayAudio] = useState(false);
    

    const fetchUserData = () => {
        dispatch(getAllClientsOnline())
            .then((res) => {
                setUsers(res)
            })
    }

    const play = () => {
        setPlayAudio(true);
        playAudio = new Audio(incomingSound);
        playAudio.loop = true;
        playAudio.play();
    };

    const stop = () => {
        setPlayAudio(false);
        playAudio.pause();
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
            },
            onCancel: () => {}
        });
	};

    const items = [
        {
            key: "1",
            label: (
                <Link to="/dashboard/profile/change-password">
                    <Icon name="edit" width={16} height={16} /> Change Password
                </Link>
            ),
        },
        // {
        //     key: "2",
        //     label: (
        //         <Link to="/">
        //             <Icon name="group" width={16} height={16} /> Edit Profile
        //         </Link>
        //     ),
        // },
        {
            key: "2",
            label: (
                <Link onClick={onSignOut} >
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
                play();
                Modal.confirm({
                    title: "Panggilan Masuk",
                    icon: <Icon name="alert" width={24} height={24} />,
                    content:
                        "Anda mendapatkan panggilan dari " + parsedMessage.from + ". Apakah Anda ingin menerima panggilan?",
                    centered: true,
                    width: 320,
                    okText: "Terima",
                    cancelText: "Tolak",
                    onOk: () => {
                        stop();
                        incomingCall(parsedMessage);
                        localStorage.setItem('me', username)
                    },
                    onCancel: () => {
                        stop();
                        rejectCall(parsedMessage);
                    }
                });
                break;
            case 'startCommunication':
                startCommunication(parsedMessage);
                break;
            case 'stopCommunication':
                console.info("Communication ended by remote peer");
                stopCall(true);
                const link = role === "admin" ? "/dashboard/admin/home" : "/dashboard/client/home";
                // history.push(link);
                localStorage.removeItem('me')
                localStorage.removeItem('they')
                window.location.replace(link);
                break;
            case 'onReceiveFinishRequest':
                onReceiveFinishRequest(parsedMessage);
            break;
            case 'iceCandidate':
                const webRtcPeer = WebRtcPeer.getPeers()
                console.log(webRtcPeer)
                console.log('TESSSSTTTTTTT')
                console.log(parsedMessage.candidate)
                await webRtcPeer.addIceCandidate(new RTCIceCandidate(parsedMessage.candidate))
                // add delay 2s
                setTimeout(() => {
                    // setLoading(false);
                    navigateTo();
                }, 2000);
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
