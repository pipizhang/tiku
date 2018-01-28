'use strict';

export default (req, res, next) => {
  if (req.path != "/login" && (typeof req.session === 'undefined' || typeof req.session.user === 'undefined')) {
    let err = new Error("Access denied");
    err.status = 403;
    next(err);
  } else {
    next();
  }
}

