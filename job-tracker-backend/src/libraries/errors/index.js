class CustomError extends Error {
  constructor(message, statusNumber) {
    super(message);
    this.status = statusNumber;
  }
}

module.exports = {
  CustomError,
}