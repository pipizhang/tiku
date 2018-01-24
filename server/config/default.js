'use strict';

module.exports = {
  port: 4000,
  db: {
    dialect: 'sqlite',
    storage: 'data/main.db'
  },
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
}
