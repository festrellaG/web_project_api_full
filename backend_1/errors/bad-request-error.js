import { HttpStatus } from "../enums/http.js";

export default class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}
