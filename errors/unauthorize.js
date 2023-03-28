const CustomErrorAPI = require("./custom-error");
const { StatusCodes } = require("http-status-codes");
class Unauthorize extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorize;
