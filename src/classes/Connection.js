import { Modal } from 'antd';

import { webSocketController } from './WebSocket';
import Icon from '../components/Icon';

const WebRtcPeerClass = require('./WebRtcPeer');

const WebRtcPeer = new WebRtcPeerClass()

export const callResponse = (message) => {
    console.log('RENEEEJEJEJEJ')
    if (message.response === 'rejected') {
        Modal.error({
            title: "Panggilan Ditolak",
            icon: <Icon name="alert" width={24} height={24} />,
            content: 'Panggilan ditolak oleh user yang Anda panggil, silahkan coba beberapa saat lagi.',
            centered: true,
            width: 320,
            okText: "Tutup",
            onOk: () => {
                console.log('Call not accepted by peer. Closing call')
                let errorMessage = message.message ? message.message
                    : 'Unknown reason for call rejection.';
                console.log(errorMessage);
                stop(true);
                window.location.reload();
            },
        });
    } 

    if (message.response === 'reject_incall') {
        Modal.error({
            title: "Panggilan Tidak Dapat Dilakukan",
            icon: <Icon name="alert" width={24} height={24} />,
            content: 'Panggilan tidak dapat dilakukan karena user yang Anda panggil sedang dalam panggilan lain.',
            centered: true,
            width: 320,
            okText: "Tutup",
            onOk: () => {
                stop(true);
                window.location.reload();
            },
        })
    }
        // set call state = in call
        // const webRtcPeer = WebRtcPeer.getPeers()
        // console.log(webRtcPeer)
        // webRtcPeer.onicecandidate = function (event) {
        //     if (event.candidate) {
        //         const msg = {
        //             id : 'onIceCandidate',
        //             candidate : event.candidate,
        //             to : message.from,
        //             from: message.to
        //         }
        //         sendMessage(msg);
        //     }
        // } 
        // webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        //     if (error) return console.error(error);
        // });
}

export const registerResponse = async (message) => {
    if (message.response === 'accepted') {
        console.log('User ' + message.name + ' registered successfully');
        localStorage.setItem('state', 'REGISTERED');
    } else {
        var errorMessage = message.message ? message.message
                : 'Unknown reason for register rejection.';
        console.log(errorMessage);
        // alert('Error registering user. See console for further information.');
    }
}

export const call = async (from, to) => {
    const message = {
        id : 'call',
        from : from, // user yang melakukan panggilan
        to : to, // user yang menerima panggilan
        state: 'REQ_CALLING'
    }
    sendMessage(message);

    // let configuration = {
    //     iceServers: [
    //         {
    //             urls: "stun:stun1.l.google.com:19302"
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:80",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:80?transport=tcp",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:443",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:443?transport=tcp",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //     ],
    // };

    // const peer = new RTCPeerConnection(configuration);
    // // const peer = new RTCPeerConnection();

    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    // // peer.addTrack(stream.getTracks()[0], stream)
    // await peer.addStream(stream)

    // // create offer
    // const offer = await peer.createOffer();

    // let message = {
    //     id : 'call',
    //     from : from, // user yang melakukan panggilan
    //     to : to, // user yang menerima panggilan
    //     sdpOffer : offer,
    //     state: 'req_calling'
    // };
    // sendMessage(message);
    
    // await peer.setLocalDescription(offer);
    // WebRtcPeer.addPeer(peer)

    // // set delay 1s
    
    // peer.onicecandidate = function (event) {
    //     if (event.candidate) {
    //         const message = {
    //             id : 'onIceCandidate',
    //             candidate : event.candidate,
    //             to : to,
    //             from: from
    //         }
    //         sendMessage(message);
    //     }
    // }

    // // get to know when connected to peer
    // peer.onconnectionstatechange = function (event) {
    //     console.log('masuk sono')
    //     if (peer.connectionState === 'connected') {
    //         const message = {
    //             id: 'peerConnected',
    //             from: localStorage.getItem('me'),
    //             to: localStorage.getItem('they')
    //         }
    //         sendMessage(message)
    //     }

    //     if (peer.connectionState === 'disconnected' || peer.connectionState === 'failed' || peer.connectionState === 'closed') {
    //         peer.close();
    //         console.log('Connection closed, because of ' + peer.connectionState);
    //     }
    // }

    // // peer.onicegatheringstatechange = function (event) {
    // //     console.log('masuk sono')
    // //     if (peer.iceGatheringState === 'complete') {
    // //         const message = {
    // //             id: 'peerConnected',
    // //             from: localStorage.getItem('me'),
    // //             to: localStorage.getItem('they')
    // //         }
    // //         sendMessage(message)
    // //     }
    // // }

}

export const register = (name) => {
    var message = {
        id : 'register',
        name : name,
        state: 'registered',
        role: localStorage.getItem('role')
    };
    sendMessage(message);
}

export const incomingCall = async (message) => {
    const peer = WebRtcPeer.getPeers()
    const  stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    stream.getTracks().forEach(track => {
        // add all tracks to peer
        peer.addTrack(track, stream)
    })

    // const configuration = {
    //     iceServers: [
    //         {
    //             urls: "stun:stun1.l.google.com:19302"
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:80",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:80?transport=tcp",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:443",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //         {
    //             urls: "turn:a.relay.metered.ca:443?transport=tcp",
    //             username: "417e29407130059049b7c92e",
    //             credential: "4CZ5bkgLqE0QjdRU",
    //         },
    //     ],
    // }

    // // create peer using RTC
    // const peer = new RTCPeerConnection(configuration);
    // // const peer = new RTCPeerConnection();

    // peer.setRemoteDescription(new RTCSessionDescription(message.sdpOffer))

    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    // // peer.addTrack(stream.getTracks()[0], stream)
    // await peer.addStream(stream)

    // const answer = await peer.createAnswer();

    // await peer.setLocalDescription(answer);

    // WebRtcPeer.addPeer(peer)

    // peer.onicecandidate = function (event) {
    //     if (event.candidate) {
    //         const msg = {
    //             id : 'onIceCandidate',
    //             candidate : event.candidate,
    //             to : message.from,
    //             from: message.to
    //         }
    //         sendMessage(msg);
    //     }
    // }

    // // get to know when connected to peer
    // peer.onconnectionstatechange = function (event) {
    //     console.log('masuk sono')
    //     if (peer.connectionState === 'connected') {
    //         const message = {
    //             id: 'peerConnected',
    //             from: localStorage.getItem('me'),
    //             to: localStorage.getItem('they')
    //         }
    //         sendMessage(message)
    //     }

    //     if (peer.connectionState === 'disconnected' || peer.connectionState === 'failed' || peer.connectionState === 'closed') {
    //         peer.close();
    //         console.log('Connection closed, because of ' + peer.connectionState);
    //     }
    // }

    // // peer.onicegatheringstatechange = function (event) {
    // //     console.log('masuk sono')
    // //     if (peer.iceGatheringState === 'complete') {
    // //         const message = {
    // //             id: 'peerConnected',
    // //             from: localStorage.getItem('me'),
    // //             to: localStorage.getItem('they')
    // //         }
    // //         sendMessage(message)
    // //     }
    // // }

    // let response = {
    //     id: 'incomingCallResponse',
    //     from: message.from,
    //     callResponse: 'accept',
    //     sdpOffer: answer,
    //     state: 'acc_calling'
    // }
    // sendMessage(response);
    localStorage.setItem('they', message.from)
}

export const rejectCall = (message) => {
    let response = {
        id: 'incomingCallResponse',
        from: message.from,
        callResponse: 'reject',
        message: 'User Menolak Panggilan'
    }
    sendMessage(response);
    stop(true);
}

export const startCommunication = (message) => {
    
}

export const startCandidates = (message) => {
    const webRtcPeer = WebRtcPeer.getPeers()
    console.log(webRtcPeer)
    webRtcPeer.onicecandidate = function (event) {
        if (event.candidate) {
            const msg = {
                id : 'onIceCandidate',
                candidate : event.candidate,
                to : localStorage.getItem('they'),
                from: localStorage.getItem('me')
            }
            sendMessage(msg);
        }
    }
}

export const onIceCandidate = (candidate) => {
    console.log('Local candidate' + JSON.stringify(candidate));
    WebRtcPeer.getPeers().addIceCandidate(new RTCIceCandidate(candidate))
}

export const stop = (message) => {
    // set call state to no call

    const webRtcPeer = WebRtcPeer.getPeers()

    if (webRtcPeer) {
        WebRtcPeer.removePeer();
        webRtcPeer.close();
        if (!message) {
            const message = {
                id: 'stop',
                from: localStorage.getItem('me'),
                to: localStorage.getItem('they')
            }
            sendMessage(message)
        }
    }
}

export const sendMessage = (message) => {
    let jsonMessage = JSON.stringify(message);
    console.log('Sending message: ' + jsonMessage);
    webSocketController.send(jsonMessage);
}