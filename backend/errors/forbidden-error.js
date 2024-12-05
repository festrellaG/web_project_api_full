import { HttpStatus } from "../enums/http.js";

export default class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.FORBIDDEN;
  }
}
