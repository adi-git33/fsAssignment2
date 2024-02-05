const { MongoStorage } = require('../db/mongo.storage');

class ReportsRepository {
  constructor() {
    if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
      this.storage = new MongoStorage('reports');
    }
  }

  findReports() {
    return this.storage.find({});
  }

  retrieveReport(id) {
    return this.storage.retrieve(id);
  }

  create(report) {
    return this.storage.create(report);
  }

  update(id, report) {
    return this.storage.update(id, report);
  }

  delete(report) {
    return this.storage.delete(report);
  }
}

module.exports = ReportsRepository;
