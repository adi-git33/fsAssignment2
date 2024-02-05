const { BadRequestError } = require('./badRequest.error');
const { NotFoundError } = require('./notFound.error');
const { ServerError } = require('./server.error');
const { BodyNotSend } = require('./bodyNotSended.error');

module.exports = {
  BodyNotSend, BadRequestError, NotFoundError, ServerError,
};
