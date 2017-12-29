'use strick'

class BaseController {

    constructor() {

    }

    async ping(req, res, next) {
        res.send("pong")
    }

}

export default BaseController
