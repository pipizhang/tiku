'use strick';

class HomeController {

    constructor() {

    }

    async index(req, res, next) {
        res.send("It works!");
    }
}

export default new HomeController;
