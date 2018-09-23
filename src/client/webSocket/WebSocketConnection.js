const WebSocketManager = require("./WebSocketManager")
const EventEmitter = require("events")

class WebSocketConnection {
    constructor(manager, gateway) {
        this.manager = manager
    }
}

module.exports = WebSocketManager