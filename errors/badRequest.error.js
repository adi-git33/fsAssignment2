class BadRequestError extends Error {
  constructor(element) {
    super(`please provide: ${element}`);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

module.exports = { BadRequestError };
