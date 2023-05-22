import React, {useState, Fragment, useEffect, memo} from "react";
import  { useHistory } from 'react-router-dom'
import Fallback from "../../../../components/Fallback";
import { register, 
    registerResponse, 
    callResponse,
    incomingCall,
    startCommunication,
    stop
} from "../../../../classes/Connection";
import { webSocketController } from "../../../../classes/WebSocket";
import "../../../../styles/custom/VideoCall.css"
const WebRtcPeerClass = require('../../../../classes/WebRtcPeer');
const Connection = require('../../../../classes/Connection');
const WebRtcPeer = new WebRtcPeerClass();

export default memo(() => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [peerName, setPeerName] = useState('');

    const onClickRegister = () => {
        const name = registerName;
        if (!name) {
            return console.error('You must insert your user name');
        }
        setRegisterName(name);
        register(name);
    }

    const onClickCall = () => {
        const peer = peerName;
        if (!peer) {
            return console.error('You must specify the peer name');
        }
        setPeerName(peer);
        setLoading(true);
        Connection.call(registerName, peer);
        localStorage.setItem('caller', registerName);
        localStorage.setItem('callee', peer);
    }

    const onClickTerminate = () => {
        const data = {
            stopperUser: registerName,
            stoppedUser: peerName
        }
        Connection.stop(data)
    }

    const navigateTo = () => history.push('/dashboard/admin/call');

    async function connWS() {
        const ws = webSocketController.connect('wss://localhost:3030/one2one');
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
                break;
            case 'iceCandidate':
                const webRtcPeer = WebRtcPeer.getPeers()
                console.log(webRtcPeer)
                console.log('test')
                console.log(parsedMessage.candidate)
                await webRtcPeer.addIceCandidate(parsedMessage.candidate)
                // add delay 2s
                setTimeout(() => {
                    setLoading(false);
                    navigateTo();
                }, 2000);
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
    }, []);

    return (
        <Fragment>
            {loading && (<Fallback/>)}
            <div className="call-control">
				<div className="call-control-left">
					<input id="name" name="name" className="input-register" onInput={e => setRegisterName(e.target.value)} type="text"/>
					<button id="register" onClick={onClickRegister} className="button-register">Register</button>
				</div>
				<div className="call-control-middle">
					<button id="call" onClick={onClickCall}>Call</button>
					<button id="terminate" onClick={onClickTerminate}>Stop</button>
				</div>
				<div className="call-control-right">
				<input id="peer" name="peer" className="input-peer" onInput={e => setPeerName(e.target.value)} type="text"/>
				</div>
			</div>
        </Fragment>
    )
})