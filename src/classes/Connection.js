const kurentoUtils = require('kurento-utils');

const ConnectionStateClass = require('./ConnectionState');
const WebRtcPeerClass = require('./WebRtcPeer');
const WebSocketClass = require('./WebSocket');

const ConnectionState = new ConnectionStateClass()
const WebRtcPeer = new WebRtcPeerClass()
const WebSocket = new WebSocketClass()

module.exports = {
    callResponse (message) {
        if (message.response != 'accepted') {
            console.log('Call not accepted by peer. Closing call')
            let errorMessage = message.message ? message.message
				: 'Unknown reason for call rejection.';
		    console.log(errorMessage);
            this.stop(true);
        } else {
            // set call state = in call
            const webRtcPeer = WebRtcPeer.getWebRtcPeer()
            webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
                if (error) return console.error(error);
            });
        }
    },
    incomingCall (message) {
        // get call state
        const callState = 'no call'
        if (callState !== 'no call') {
            const response = {
                id: 'incomingCallResponse',
                from: message.from,
                callResponse: 'reject',
                message: 'bussy'
            }
            return this.sendMessage(response)
        }

        // set call state = in call

        let videoInput = document.getElementById('videoInput');
	    let videoOutput = document.getElementById('videoOutput');

        const isConfirm = ConnectionState.confirmDialog(message.from)
        if (isConfirm) {
            // show spinner

            const options = {
                localVideo : videoInput,
                remoteVideo : videoOutput,
                onicecandidate : this.onIceCandidate
            }

            const peer = kurentoUtils.WebRtcPeer.WebRtcPeerRecv(options, function (error) {
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
                    this.sendMessage(response);
                });
            });
        } else {
            const response = {
                id : 'incomingCallResponse',
                from : message.from,
                callResponse : 'reject',
                message : 'user declined'
            };
            this.sendMessage(response);
            this.stop(true);
        }
    },
    startCommunication (message) {
        //set call state = in call

        WebRtcPeer.getWebRtcPeer().processAnswer(message.sdpAnswer, function (error) {
            if (error) return console.error(error);
        });
    },
    onIceCandidate (candidate) {
        console.log('Local candidate' + JSON.stringify(candidate));

        const message = {
            id : 'onIceCandidate',
            candidate : candidate
        }
        this.sendMessage(message);

    },
    stop (message) {
        // set call state to no call

        let webRtcPeer = WebRtcPeer.getWebRtcPeer()
        if (webRtcPeer) {
            webRtcPeer.dispose();
            webRtcPeer = null;

            if (!message) {
                const message = {
                    id: 'stop'
                }
                this.sendMessage(message)
            }
        }
    },
    sendMessage (message) {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        WebSocket.ws().send(jsonMessage);
    }
}