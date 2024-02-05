class BodyNotSend extends Error {
  constructor(action) {
    super(`Couldn't complete ${action} dut to body not send`);
    this.name = 'BodyNotSend';
    this.status = 500;
  }
}
module.exports = { BodyNotSend };
