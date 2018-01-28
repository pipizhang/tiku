'use strict';

import BaseController from './base'
import models from '../models'
import crypto from 'crypto'
import formidable from 'formidable'

class AccountController extends BaseController {

  constructor() {
    super();
  }

  async login(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err !== null) {
        err.status = 400;
        return next(err);
      }

      let { username = '', password = ''} = fields;
      username = username.trim() || "";
      password = password.trim() || "";

      let user = await models.User.findOne({where: {username: username}});
      if (user == null) {
        let err = new Error("Not found user");
        err.status = 404;
        return next(err);
      }

      const md5 = crypto.createHash("md5");
      let _password = md5.update(password + user.salt).digest("hex");
      if (_password != user.password) {
        let err = new Error("Wrong password");
        err.status = 401;
        return next(err);
      }

      req.session.user = {id: user.id, username: user.username};
      super.resSuccess(res, null, "logged in");
    });

  }

  async logout(req, res, next) {
    try {
      delete req.session.user;
      super.resSuccess(res, null, "logged out");
    } catch (err) {
      return next(err);
    }
  }

}

export default new AccountController

