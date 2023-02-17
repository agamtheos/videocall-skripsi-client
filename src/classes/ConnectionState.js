const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;

module.exports = function ConnectionState() {
    // eslint-disable-next-line no-restricted-globals
    this.confirmDialog = (from) => confirm('Do you want to accept the incoming call from ' + from + '?');
}