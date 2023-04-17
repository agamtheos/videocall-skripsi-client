

module.exports = function ConnectionState() {
    // eslint-disable-next-line no-restricted-globals
    this.confirmDialog = (from) => confirm('Do you want to accept the incoming call from ' + from + '?');
}