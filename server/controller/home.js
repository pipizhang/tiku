'use strick';

class HomeController {

    constructor() {

    }

    aysnc index(req, res, next) {
        res.send("It works!");
    }
}

export default new HomeController();
