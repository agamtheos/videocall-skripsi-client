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
    stop as stopCall,
    rejectCall,
    sendMessage,
} from "../../../../classes/Connection";
import { getConfig } from "../../../../Config";
import { webSocketController } from "../../../../classes/WebSocket";
import { userSignOut } from "../../../../appRedux/actions/Auth";
import { Layout } from "../../../../components/Layout";
import { Users } from "../../../../components/Users";
import Icon from "../../../../components/Icon";
import incomingSound from '../../../../assets/sounds/incoming_call.mp3';
import { CONNECTION_STATE } from "../../../../constants/ActionTypes";

const WebRtcPeerClass = require('../../../../classes/WebRtcPeer');
const WebRtcPeer = new WebRtcPeerClass();

const DEFAULT_ICE_RESTARTS_LIMIT = 2
const DEFAULT_OFFER_TIMEOUT = 10 * 60 * 1000
const DEFAULT_ICE_GATHERING_TIMEOUT = 2000

function runObserver() {
    const observer = {
        res: null,
        rej: null,
        promise: null,

        finished: false,
        resolved: false,
        rejected: false,
    }
    observer.promise = new Promise((res, rej) => {
        observer.res = () => {
            if (observer.finished) {
                return
            }
            observer.finished = true
            observer.resolved = true
            res()
        }
        observer.rej = () => {
            if (observer.finished) {
                return
            }
            observer.finished = true
            observer.rejected = true
            rej()
        }
    })
    return observer
}

export default memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [users, setUsers] = useState([])
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const WEB_SOCKET_URL = getConfig('WEB_SOCKET_URL');
    let [playAudio, setPlayAudio] = useState(false);
    let [polite, setPolite] = useState(true);
    let [makingOffer, setMakingOffer] = useState(false);
    let [offerTimeout, setOfferTimeout] = useState(false);
    let [makingAnswer, setMakingAnswer] = useState(false);
    let [connectionState, setConnectionState] = useState(CONNECTION_STATE.CLOSED);
    let [streamableConnection, setStreamableConnection] = useState(false);
    let [lastSdpOffer, setLastSdpOffer] = useState(null);
    let [offerTimer, setOfferTimer] = useState(null);

    const IceGatheringTimeout = DEFAULT_ICE_GATHERING_TIMEOUT
    const OfferTimeoutValue = DEFAULT_OFFER_TIMEOUT

    let peer = null;

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
        {
            key: "2",
            label: (
                <Link to="/dashboard/admin/manage-user">
                    <Icon name="group" width={16} height={16} /> Manajemen User
                </Link>
            ),
        },
        {
            key: "3",
            label: (
                <Link to="#" onClick={onSignOut}>
                    <Icon name="setting" width={16} height={16} /> Logout
                </Link>
            ),
        },
    ];

    
    

    const navigateTo = () => history.push('/dashboard/room/call');

    async function connWS() {
        const ws = webSocketController.connect(WEB_SOCKET_URL);
        ws.onopen = async function() {
            console.info('Connection with websocket server opened');
            await register(username);
        }

        ws.onmessage = async function(message) {
            var parsedMessage = JSON.parse(message.data);
            console.info('Received message: ' + message.data);
        
            switch (parsedMessage.id) {
            case 'updateListUserResponseAdmin':
                setUsers(parsedMessage.users);
            break;
            case 'listUserResponse':
                setUsers(parsedMessage.users);
            break;
            case 'registerResponse':
                await registerResponse(parsedMessage);
                ws.send(JSON.stringify({ id: 'getListUsersClient' }));
            break;
            case 'callResponse':
                callResponse(parsedMessage);
            break;  
            case 'incomingCall':
                const state = localStorage.getItem('state');
                console.log('State: ' + state)
                if (state === 'IN_CALL') {
                    // let's reject the call and stay in current call
                    const response = {
                        id: 'incomingCallResponse',
                        from: parsedMessage.from,
                        callResponse: 'reject_incall',
                        message: 'busy'
                    };
                    return ws.send(JSON.stringify(response));
                }
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
                    onOk: async () => {
                        stop();
                        localStorage.setItem('state', 'IN_CALL');
                        peer = new RTCPeerConnection();
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                        stream.getTracks().forEach(track => peer.addTrack(track, stream));
                        WebRtcPeer.addPeer(peer);

                        peer.onicecandidate = ({candidate}) => {
                            if (candidate) {
                                console.log('iceCandidateHandler')
                                const msg = {
                                    id: 'onIceCandidate',
                                    candidate,
                                }
                                sendMessage(msg)
                            }
                        }

                        peer.oniceconnectionstatechange = () => {
                            console.log('iceConnectionStateChangeHandler')
                            console.log(`STATE: ${peer.iceConnectionState}`)
                            switch (peer.iceConnectionState) {
                                case 'checking':
                                    setConnectionState(CONNECTION_STATE.NEGOTIATING)
                                    setStreamableConnection(false)
                                break
                                case 'disconnected':
                                    setConnectionState(CONNECTION_STATE.DISCONNECTED)
                                    setStreamableConnection(false)
                                    peer.close()
                                break
                                case 'failed':
                                    peer.close()
                            
                                    setConnectionState(CONNECTION_STATE.DISCONNECTED)
                                    setStreamableConnection(false)
                                break
                                case 'closed':
                                    peer.close()
                                    peer = null
                            
                                    setConnectionState(CONNECTION_STATE.CLOSED)
                                    setStreamableConnection(false)
                                break
                                case 'connected':
                                case 'completed':
                                    setConnectionState(CONNECTION_STATE.CONNECTED)
                                    setOfferTimeout(false)
                                    setStreamableConnection(true)
                                    navigateTo();
                                break
                                default:
                                    setStreamableConnection(false)
                            }
                        }
                        
                        const response = {
                            id: 'incomingCallResponse',
                            from: parsedMessage.from,
                            callResponse: 'accept',
                            message: 'accepted'
                        }
                        ws.send(JSON.stringify(response));
                        setTimeout(() => {
                            incomingCall(parsedMessage);
                        }, 1000);
                        localStorage.setItem('me', username)
                    },
                    onCancel: () => {
                        stop();
                        rejectCall(parsedMessage);
                        window.location.reload();
                    }
                });
            break;
            case 'startCommunication':
                localStorage.setItem('state', 'IN_CALL');
                WebRtcPeer.removePeer();
                peer = new RTCPeerConnection();
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                stream.getTracks().forEach(track => peer.addTrack(track, stream));
                WebRtcPeer.addPeer(peer);
                peer.onnegotiationneeded = async () => negotiationNeededHandler();
                peer.onicegatheringstatechange = () => iceGatheringStateChangeHandler();
                peer.oniceconnectionstatechange = () => iceConnectionStateChangeHandler();
                peer.onicecandidate = ({candidate}) => iceCandidateHandler({candidate});

                async function negotiationNeededHandler() {
                    try {
                        setMakingOffer(true)
                        const iceGatheringPromise = completeIceGathering()
                        const offer = await peer.createOffer()
                        await Promise.all([
                            iceGatheringPromise,
                            peer.setLocalDescription(offer),
                        ])
                        console.log('Local Description Added: Offer')
                        ws.send(JSON.stringify({ id: 'description', description: peer.localDescription, from: localStorage.getItem('username'), to: localStorage.getItem('they') }))
                        console.log('Offer sended')
            
                        setLastSdpOffer(peer.localDescription)
                        let offerTimer = setTimeout(() => {
                            if (peer.signalingState === 'have-local-offer' && lastSdpOffer === this.lastSdpOffer) {
                                this.log(`Closing Connection: due to SDP Offer Timeout`)
                                peer.close()
                                setMakingOffer(false)
                                setOfferTimeout(true)
                            }
                        }, OfferTimeoutValue)
                        setOfferTimer(offerTimer)
                    } catch (error) {
                        console.log(error)
                        setMakingOffer(false)
                    }
                }
                function iceCandidateHandler({ candidate }) {
                    if (candidate) {
                        console.log('iceCandidateHandler')
                        const msg = {
                            id: 'onIceCandidate',
                            candidate,
                        }
                        sendMessage(msg)
                    }
                }
                function iceGatheringStateChangeHandler() {
                    switch (peer.iceGatheringState) {
                        case 'new':
                            console.log('ICE Gathering: New')
                            break
                        case 'gathering':
                            console.log('ICE Gathering: Gathering')
                            break
                        case 'complete':
                            console.log('ICE Gathering: Completed')
                            break
                        default:
                    }
                }
                function iceConnectionStateChangeHandler() {
                    console.log('iceConnectionStateChangeHandler')
                    console.log(`STATE: ${peer.iceConnectionState}`)
                    switch (peer.iceConnectionState) {
                        case 'checking':
                            setConnectionState(CONNECTION_STATE.NEGOTIATING)
                            setStreamableConnection(false)
                        break
                        case 'disconnected':                    
                            setConnectionState(CONNECTION_STATE.DISCONNECTED)
                            setStreamableConnection(false)
                        break
                        case 'failed':
                            peer.close()
                    
                            setConnectionState(CONNECTION_STATE.DISCONNECTED)
                            setStreamableConnection(false)
                        break
                        case 'closed':
                            peer.close()
                            peer = null
                    
                            setConnectionState(CONNECTION_STATE.CLOSED)
                            setStreamableConnection(false)
                        break
                        case 'connected':
                        case 'completed':
                            setConnectionState(CONNECTION_STATE.CONNECTED)
                            setOfferTimeout(false)
                            setStreamableConnection(true)
                            navigateTo();
                        break
                        default:
                            setStreamableConnection(false)
                    }
                }
                async function completeIceGathering(timeout) {
                    const iceGatheringTimeout = IceGatheringTimeout
            
                    const iceGatheringObserver = runObserver()
                    const iceCandidateObserver = runObserver()
                    const timeoutObserver = runObserver()
            
                    const iceGatheringStateChangeHandler = (e) => {
                        timeoutObserver.res()
                        if (peer.iceGatheringState === 'complete') {
                            peer.removeEventListener('icegatheringstatechange', iceGatheringStateChangeHandler)
                            console.log('Gathering state complete')
                            return iceGatheringObserver.res()
                        }
                    }
                    const iceCandidateHandler = ({candidate}) => {
                        timeoutObserver.res()
                        if (!candidate) {
                            peer.removeEventListener('icecandidate', iceCandidateHandler)
                            console.log('end-of-candidates received')
                            return iceCandidateObserver.res()
                        }
                    }
            
                    peer.onicegatheringstatechange = iceGatheringStateChangeHandler
                    peer.onicecandidate = ({candidate}) => iceCandidateHandler({candidate})
            
                    setTimeout(() => {
                        if (timeoutObserver.resolved) {
                            return
                        }
            
                        timeoutObserver.rej()
                        peer.removeEventListener('icegatheringstatechange', iceGatheringStateChangeHandler)
                        peer.removeEventListener('icecandidate', iceCandidateHandler)
                    }, timeout !== null && timeout !== undefined ? timeout : iceGatheringTimeout)
            
                    try {
                        await timeoutObserver.promise
                
                        await Promise.all([
                            iceGatheringObserver.promise,
                            iceCandidateObserver.promise,
                        ])
                        console.log('ICE GATHERING PERFORMED')
                    } catch {
                        console.log('NO ICE GATHERING PERFORMED: Timeout Occured')
                    } finally {
                        console.log('ICE GATHERING COMPLETED\n')
                        return
                    }
                }
            break;
            case 'description':
                console.log('Receive Description')
                const offerCollision = (parsedMessage.description.type === 'offer') &&
                    (makingOffer || peer.signalingState !== 'stable')
                const ignoreOffer = !polite && offerCollision

                console.log('Offer Collision: ' + offerCollision)
                if (ignoreOffer) return

                if (offerTimer) {
                    clearTimeout(offerTimer)
                    setOfferTimer(null)
                }

                if (parsedMessage.description.type === 'offer') {
                    setMakingOffer(false)
                    setMakingAnswer(true)
                } else {
                    setMakingOffer(false)
                }

                if (offerCollision) {
                    try {
                        await Promise.all([
                            peer.setLocalDescription({ type: 'rollback' }),
                            peer.setRemoteDescription(parsedMessage.description),
                        ])
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    try {
                        await peer.setRemoteDescription(parsedMessage.description)
                    } catch (error) {
                        console.log(error)
                    }
                }
                console.log('Remote Description Added: ' + parsedMessage.description.type)

                if (parsedMessage.description.type === 'offer') {
                    const answer = await peer.createAnswer()
                    const iceGatheringPromise = completeIceGathering
                    console.log('Trying to Add Local Description and find ice candidates')

                    await Promise.all([
                        iceGatheringPromise,
                        peer.setLocalDescription(answer),
                    ])
                    console.log('Local Description Added: Answer')
                    setMakingAnswer(false)
                    ws.send(JSON.stringify({ id: 'description', description: peer.localDescription, from: this.username, to: localStorage.getItem('they') }))
                    console.log('Answer sended')
                }
            break;
            case 'stopCommunication':
                console.info("Communication ended by remote peer");
                stopCall(true);
                const link = role === "admin" ? "/dashboard/admin/home" : "/dashboard/client/home";
                localStorage.removeItem('me')
                localStorage.removeItem('they')
                window.location.replace(link);
                break;
            case 'iceCandidate':
                console.log('Receive Ice Candidate')
                try {
                    peer.addIceCandidate(new RTCIceCandidate(parsedMessage.candidate))
                } catch (error) {
                    console.log(error)
                }
            break;
            default:
                console.error('Unrecognized message', parsedMessage);
            }
        }
    }

    useEffect(() => {
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
