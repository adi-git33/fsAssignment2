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
    return this.storage.retrieve({ _id: id });
  }

  createReport(report) {
      return this.storage.create(report);
  }

  updateReport(id, report) {
      return this.storage.update(id, report);
  }

  deleteReport(report) {
    return this.storage.delete({ _id: report });
  }
}

module.exports = ReportsRepository;
