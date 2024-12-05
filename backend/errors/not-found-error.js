import { HttpStatus } from "../enums/http.js";

export default class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
