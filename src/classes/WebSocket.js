module.exports = function WebSocket() {
    this.ws = () => {
        // eslint-disable-next-line no-restricted-globals
        return new WebSocket('wss://' + location.host + '/one2one');
    }
}