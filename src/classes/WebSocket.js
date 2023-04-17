export class WebSocketController {
    constructor() {
        this.ws = null;
    }

    connect = (url) => {
        return this.ws = new WebSocket(url);
    }

    send = (message) => {
        this.ws.send(message);
    }

    close = () => {
        this.ws.close();
    }
}

export const webSocketController = new WebSocketController();