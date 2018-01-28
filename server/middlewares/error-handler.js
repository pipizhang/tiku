'use strict';

export default (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: "error",
    message: err.message
  });
}

