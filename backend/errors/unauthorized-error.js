import { HttpStatus } from "../enums/http.js";

export default class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
