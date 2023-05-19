import React, {Fragment, useEffect} from "react";

// import { register, 
//     registerResponse, 
//     callResponse,
//     incomingCall,
//     startCommunication,
//     stop
// } from "../../../../classes/Connection";
// import { webSocketController } from "../../../../classes/WebSocket";
import VideoCall from "./VideoCall";
import "../../../../styles/custom/VideoCall.css"

const WebRtcPeerClass = require('../../../../classes/WebRtcPeer');

// const Connection = require('../../../../classes/Connection');
const WebRtcPeer = new WebRtcPeerClass();

const CallPage = () => {
    // const [registerName, setRegisterName] = useState('');
    // const [peerName, setPeerName] = useState('');

    // const onClickRegister = () => {
    //     const name = registerName;
    //     if (!name) {
    //         return console.error('You must insert your user name');
    //     }
    //     setRegisterName(name);
    //     register(name);
    // }

    // const onClickCall = () => {
    //     const peer = peerName;
    //     if (!peer) {
    //         return console.error('You must specify the peer name');
    //     }
    //     setPeerName(peer);
    //     Connection.call(registerName, peer);
    // }

    // const onClickTerminate = () => {
    //     const data = {
    //         stopperUser: registerName,
    //         stoppedUser: peerName
    //     }
    //     Connection.stop(data)
    // }

    const findRemoteUserStream = () => {
        const webRtcPeer = WebRtcPeer.getPeers()
        if (!webRtcPeer) {
            return console.log('No remote stream for user ')
        }
        return webRtcPeer.getRemoteStream();
    }

    const findLocalUserStream = () => {
        const wb = WebRtcPeer.getPeers();
        console.log('HAHAHAHHAHAHAHAHAHAHAHAHAHA')
        console.log(wb)
        console.log('HAHAHAHHAHAHAHAHAHAHAHAHAHA')
        const webRtcPeer = WebRtcPeer.getPeers()
        if (!webRtcPeer) {
            return console.log('No local stream for user ')
        }
        const c = webRtcPeer.getLocalStream();
        console.log('HUEHUE')
        console.log(c)
        return c;
    }

    // async function openUserMedia(e) {
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //         audio: true,
    //         video: true
    //     })
    //     console.log('stream')
    //     console.log(stream)
    //     localVideoRef.current.srcObject = stream;
    //     localStream = stream;
    //     remoteStream = new MediaStream();
    //     console.log(remoteStream)
    //     remoteVideoRef.current.srcObject = remoteStream;

    //     // remoteVideoRef.current.onloadedmetadata = function (e) {
    //     //     remoteVideoRef.current.play();
    //     // };
    // }

    // async function connWS() {
    //     const ws = webSocketController.connect('wss://localhost:3030/one2one');
    //     // const ws = webSocketController.connect('wss://192.168.1.100:3030/one2one');
    //     ws.onmessage = async function(message) {
    //         var parsedMessage = JSON.parse(message.data);
    //         console.info('Received message: ' + message.data);
        
    //         switch (parsedMessage.id) {
    //         case 'registerResponse':
    //             await registerResponse(parsedMessage);
    //             break;
    //         case 'callResponse':
    //             callResponse(parsedMessage);
    //             break;
    //         case 'incomingCall':
    //             incomingCall(parsedMessage);
    //             break;
    //         case 'startCommunication':
    //             startCommunication(parsedMessage);
    //             break;
    //         case 'stopCommunication':
    //             console.info("Communication ended by remote peer");
    //             stop(true);
    //             break;
    //         case 'iceCandidate':
    //             const webRtcPeer = WebRtcPeer.getPeers()
    //             console.log(webRtcPeer)
    //             console.log('test')
    //             console.log(parsedMessage.candidate)
    //             await webRtcPeer.addIceCandidate(parsedMessage.candidate)
    //             break;
    //         default:
    //             console.error('Unrecognized message', parsedMessage);
    //         }
    //     }
    // }

    useEffect(() => {
        // async function getMedia() {
        //     await openUserMedia();
        //     console.log('LOCAL STREAM IN USE EFFECT')
        //     console.log(localStream)
        // }
        // async function init() {
        //     await connWS();
        // }

        // init();
        // getMedia();
        // const ws = webSocketController.connect('wss://localhost:3030/one2one');
        // // const ws = webSocketController.connect('wss://192.168.1.100:3030/one2one');
        // ws.onmessage = function(message) {
        //     var parsedMessage = JSON.parse(message.data);
        //     console.info('Received message: ' + message.data);
        
        //     switch (parsedMessage.id) {
        //     case 'registerResponse':
        //         registerResponse(parsedMessage);
        //         break;
        //     case 'callResponse':
        //         callResponse(parsedMessage);
        //         break;
        //     case 'incomingCall':
        //         incomingCall(parsedMessage);
        //         break;
        //     case 'startCommunication':
        //         startCommunication(parsedMessage);
        //         break;
        //     case 'stopCommunication':
        //         console.info("Communication ended by remote peer");
        //         stop(true);
        //         break;
        //     case 'iceCandidate':
        //         const webRtcPeer = WebRtcPeer.getPeers()
        //         console.log(webRtcPeer)
        //         console.log('test')
        //         console.log(parsedMessage.candidate)
        //         webRtcPeer.addIceCandidate(parsedMessage.candidate)
        //         break;
        //     default:
        //         console.error('Unrecognized message', parsedMessage);
        //     }
        // }
    }, []);

    return (
        <Fragment>
			<div className="call-container">
				<VideoCall 
                    localStream={findLocalUserStream()}
                    remoteStream={findRemoteUserStream()}
                />
			</div>
			{/* <div className="call-control">
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
			</div> */}
		</Fragment>
    )
}

export default CallPage;