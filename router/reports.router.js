const { Router} = require("express");
const { reportsController } = require('../controller/reports.controller');

const reportsRouter = new Router();

reportsRouter.get('/reports', reportsController.getReports);
reportsRouter.get('/reports/:requestId', reportsController.getReportById);
reportsRouter.post('/reports', reportsController.createReport);
reportsRouter.put('/reports/:requestId', reportsController.updateReport);
reportsRouter.delete('/reports/:requestId', reportsController.deleteReport);

module.exports = { reportsRouter };