let peers;

module.exports = function WebRtcPeer() {
    // this.addPeer = (id, peer) => {
    //     peers[id] = peer;
    // }
    this.addPeer = (peer) => {
        peers = peer;
    }

    this.removePeer = () => {
        // if (peers[id]) {
        //     peers[id].dispose();
        //     delete peers[id];
        // }
        if (peers) {
            peers.close();
            peers = null;
        }
    }

    this.getPeer = (id) => {
        return peers[id];
    }

    this.getPeers = () => {
        return peers;
    }
}