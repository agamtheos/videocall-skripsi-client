let webRtcPeer = null;

module.exports = function WebRtcPeer() {
    this.getWebRtcPeer = () => webRtcPeer;

    this.setWebRtcPeer = (peer) => {
        webRtcPeer = peer;
    }
}