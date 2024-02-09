const { Router } = require('express');
const { reportsController } = require('../controller/reports.controller');

const reportsRouter = new Router();

reportsRouter.get('/', reportsController.getAllReports);
reportsRouter.get('/:reportId', reportsController.getReportById);
reportsRouter.post('/', reportsController.createReport);
reportsRouter.put('/:reportId', reportsController.updateReport);
reportsRouter.delete('/:reportId', reportsController.deleteReport);

module.exports = { reportsRouter };
