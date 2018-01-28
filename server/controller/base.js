'use strick'

class BaseController {

  constructor() {

  }

  resSuccess(res, data, message) {
    data = data || null;
    message = message || "";
    return res.send({
      status: "success",
      data: data,
      message: message
    });
  }

  resError(res, message) {
    return res.send({
      status: "error",
      message: message
    });
  }

}

export default BaseController
