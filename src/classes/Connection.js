import { webSocketController } from './WebSocket';

const kurentoUtils = require('kurento-utils');

// const ConnectionStateClass = require('./ConnectionState');
const WebRtcPeerClass = require('./WebRtcPeer');

// const ConnectionState = new ConnectionStateClass()
const WebRtcPeer = new WebRtcPeerClass()

export const callResponse = (message) => {
    if (message.response !== 'accepted') {
        console.log('Call not accepted by peer. Closing call')
        let errorMessage = message.message ? message.message
            : 'Unknown reason for call rejection.';
        console.log(errorMessage);
        stop(true);
    } else {
        // set call state = in call
        const webRtcPeer = WebRtcPeer.getPeers()
        webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
            if (error) return console.error(error);
        });
    }
}

export const registerResponse = async (message) => {
    if (message.response === 'accepted') {
        console.log('User ' + message.name + ' registered successfully');
    } else {
        var errorMessage = message.message ? message.message
                : 'Unknown reason for register rejection.';
        console.log(errorMessage);
        // alert('Error registering user. See console for further information.');
    }
}

export const call = (from, to) => {
    let options = {
        onicecandidate : onIceCandidate,
        mediaConstraints : { audio: true, video: true },
        configuration: {
            iceServers: [
                {
                    urls: "stun:a.relay.metered.ca:80",
                },
                {
                    urls: "turn:a.relay.metered.ca:80",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
                {
                    urls: "turn:a.relay.metered.ca:80?transport=tcp",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
                {
                    urls: "turn:a.relay.metered.ca:443",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
                {
                    urls: "turn:a.relay.metered.ca:443?transport=tcp",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
            ],
        }
    }

    const peer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function (error) {
        if (error) return console.error(error);

        this.generateOffer(function (error, offerSdp) {
            if (error) {
                console.error(error);
            }
            var message = {
                id : 'call',
                from : from, // user yang melakukan panggilan
                to : to, // user yang menerima panggilan
                sdpOffer : offerSdp
            };
            sendMessage(message);
        });
    });
    WebRtcPeer.addPeer(peer)
    console.log('peer')
    console.log(peer)
    console.log(from)
}

export const register = (name) => {
    var message = {
        id : 'register',
        name : name
    };
    sendMessage(message);
}

export const incomingCall = (message) => {
    const options = {
        onicecandidate : onIceCandidate,
        mediaConstraints : { audio: true, video: true },
        configuration: {
            iceServers: [
                {
                    urls: "stun:a.relay.metered.ca:80",
                },
                {
                    urls: "turn:a.relay.metered.ca:80",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
                {
                    urls: "turn:a.relay.metered.ca:80?transport=tcp",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
                {
                    urls: "turn:a.relay.metered.ca:443",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
                {
                    urls: "turn:a.relay.metered.ca:443?transport=tcp",
                    username: "417e29407130059049b7c92e",
                    credential: "4CZ5bkgLqE0QjdRU",
                },
            ],
        }
    }

    const peer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function (error) {
        if (error) return console.error(error);

        this.generateOffer(function (error, offerSdp) {
            if (error) {
                // set call state
                return console.error(error);
            }

            const response = {
                id: 'incomingCallResponse',
                from: message.from,
                callResponse: 'accept',
                sdpOffer: offerSdp
            }
            sendMessage(response);
        });
    });
    console.log('incoming call peer')
    console.log(message.from)
    console.log(peer)
    WebRtcPeer.addPeer(peer)
}

export const startCommunication = (message) => {
    //set call state = in call
    console.log('get all peers')
    console.log(WebRtcPeer.getPeers())
    WebRtcPeer.getPeers().processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
    });
}

export const onIceCandidate = (candidate) => {
    console.log('Local candidate' + JSON.stringify(candidate));

    const message = {
        id : 'onIceCandidate',
        candidate : candidate
    }
    sendMessage(message);
}

export const stop = (message) => {
    // set call state to no call

    const webRtcPeer = WebRtcPeer.getPeers()
    // const webRtcPeerStopper = WebRtcPeer.getPeer(message.stopperUser)
    // const webRtcPeerStopped = WebRtcPeer.getPeer(message.stoppedUser)
    if (webRtcPeer) {
        // WebRtcPeer.removePeer(message.stopperUser)
        // WebRtcPeer.removePeer(message.stoppedUser)
        WebRtcPeer.removePeer();
        if (!message) {
            const message = {
                id: 'stop'
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

// module.exports = function Connection() {
//     export const callResponse = (message) => {
//         if (message.response !== 'accepted') {
//             console.log('Call not accepted by peer. Closing call')
//             let errorMessage = message.message ? message.message
// 				: 'Unknown reason for call rejection.';
// 		    console.log(errorMessage);
//             export const stop(true);
//         } else {
//             // set call state = in call
//             const webRtcPeer = WebRtcPeer.getPeer(message.from)
//             webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
//                 if (error) return console.error(error);
//             });
//         }
//     }

//     export const registerResponse = (message) => {
//         if (message.response === 'accepted') {
//             console.log('User ' + message.name + ' registered successfully');
//         } else {
//             var errorMessage = message.message ? message.message
//                     : 'Unknown reason for register rejection.';
//             console.log(errorMessage);
//             alert('Error registering user. See console for further information.');
//         }
//     }

//     export const call = (from, to) => {
//         let options = {
//             onicecandidate : export const onIceCandidate,
//             mediaConstraints : { audio: true, video: true }
//         }

//         const peer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
//             if (error) return console.error(error);

//             export const generateOffer(function (error, offerSdp) {
//                 if (error) {
//                     console.error(error);
//                 }
//                 var message = {
//                     id : 'call',
//                     from : from,
//                     to : to,
//                     sdpOffer : offerSdp
//                 };
//                 export const sendMessage(message);
//             });
//         });
//         WebRtcPeer.addPeer(from, peer)
//     }

//     export const register = (name) => {
//         var message = {
//             id : 'register',
//             name : name
//         };
//         export const sendMessage(message);
//     }

//     export const incomingCall = (message) => {
//         const options = {
//             onicecandidate : export const onIceCandidate,
//             mediaConstraints : { audio: true, video: true }
//         }

//         const peer = kurentoUtils.WebRtcPeer.WebRtcPeerRecv(options, function (error) {
//             if (error) return console.error(error);

//             export const generateOffer(function (error, offerSdp) {
//                 if (error) {
//                     // set call state
//                     return console.error(error);
//                 }

//                 const response = {
//                     id: 'incomingCallResponse',
//                     from: message.from,
//                     callResponse: 'accept',
//                     sdpOffer: offerSdp
//                 }
//                 export const sendMessage(response);
//             });
//         });

//         WebRtcPeer.addPeer(message.from, peer)
//     }

//     export const startCommunication = (message) => {
//         //set call state = in call

//         WebRtcPeer.getPeers().processAnswer(message.sdpAnswer, function (error) {
//             if (error) return console.error(error);
//         });
//     }

//     export const onIceCandidate = (candidate) => {
//         console.log('Local candidate' + JSON.stringify(candidate));

//         const message = {
//             id : 'onIceCandidate',
//             candidate : candidate
//         }
//         export const sendMessage(message);
//     }

//     export const stop = (message) => {
//         // set call state to no call

//         const webRtcPeerStopper = WebRtcPeer.getPeer(message.stopperUser)
//         const webRtcPeerStopped = WebRtcPeer.getPeer(message.stoppedUser)
//         if (webRtcPeerStopper && webRtcPeerStopped) {
//             WebRtcPeer.removePeer(message.stopperUser)
//             WebRtcPeer.removePeer(message.stoppedUser)

//             if (!message) {
//                 const message = {
//                     id: 'stop'
//                 }
//                 export const sendMessage(message)
//             }
//         }
//     }

//     export const sendMessage = (message) => {
//         let jsonMessage = JSON.stringify(message);
//         console.log('Sending message: ' + jsonMessage);
//         WebSocket.ws().send(jsonMessage);
//     }
// }