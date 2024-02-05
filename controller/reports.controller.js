const ReportsRepository = require('../repository/reports.repository');
const {
  ServerError, NotFoundError, BadRequestError,
} = require('../errors/errors');

const reportsRepository = new ReportsRepository();

exports.reportsController = {
  async getAllReports(req, res) {
    try {
      const reports = await reportsRepository.findReports();
      if (!reports) throw new ServerError('getAllReports');
      res.status(200).json(reports);
    } catch (error) {
      res.status(error?.status || 500).json({ message: error.message });
    }
  },

  async getReportById(req, res) {
    const reportId = req.param('reportId');
    try {
      if (reportId === ':id') throw new BadRequestError('id');
      const id = Number(reportId);
      const report = await reportsRepository.retrieveReport(id);
      if (!report) throw new NotFoundError(`Report with id <${id}>`);
      res.status(200).json(report);
    } catch (error) {
      res.status(error?.status || 500).json({ message: error.message });
    }
  },

};
