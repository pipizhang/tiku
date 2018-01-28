'use strict';

import session from 'express-session'

export default (cfg) => {
  return session({
    name: cfg.session.name,
    secret: cfg.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: cfg.session.cookie
  });
}
