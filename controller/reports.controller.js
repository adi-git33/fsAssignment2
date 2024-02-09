const ReportsRepository = require('../repository/reports.repository');
const {
  NotFoundError, BadRequestError,
} = require('../errors/errors');
const mongoose = require('mongoose');

const reportsRepository = new ReportsRepository();

exports.reportsController = {
  async getAllReports(req, res, next) {
    try {
      const reports = await reportsRepository.findReports();
      if (!reports || reports.length === 0) throw new NotFoundError('reports');
      res.status(200).json(reports);
    } catch (error) {
      next(error)
    }
  },

  async getReportById(req, res, next) {
    const { reportId } = req.params;
    try {
      // because of the test, the mongoose validation function needs to be in the controller, otherwise the repository doesnt have knowledge of the function
      const isId = mongoose.isValidObjectId(reportId);
      if (!isId) throw new BadRequestError('id');
      const report = await reportsRepository.retrieveReport(reportId);
      if (!report || report.length === 0) throw new NotFoundError(`Report with id <${reportId}>`);
      res.status(200).json(report);
    } catch (error) {
      next(error)
    }
  },

  async createReport(req, res, next) {
    try {
      if (Object.keys(req.body).length === 0 ) throw new BadRequestError('create');
      const { user_id, damage_type, damage_cause, location, damage_desc} = req.body;
      if (!user_id || !damage_type || !damage_cause || !location || !damage_desc) throw new BadRequestError('create - missing arguments');
      const report = await reportsRepository.createReport(req.body);
      res.status(200).json(report);
    } catch (error) {
      if(error.name === "ValidationError")
        error.status= 400;
      next(error)
    }
  },

  async deleteReport(req, res, next) {
    try {
      const { reportId } = req.params;
      const isId = mongoose.isValidObjectId(reportId);
      if (!isId) throw new BadRequestError('id');
      const report = await reportsRepository.deleteReport(reportId);
      if (!report || report.length === 0) throw new NotFoundError(`Report with id <${reportId}>`);
      res.status(200).json(report);
    } catch (error) {
      next(error)
    }
  },

};
