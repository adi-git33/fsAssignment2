const { Router } = require('express');
const { reportsController } = require('../controller/reports.controller');

const reportsRouter = new Router();

reportsRouter.get('/', reportsController.getAllReports);
reportsRouter.get('/:reportId', reportsController.getReportById);
// reportsRouter.post('reports/id', reportsController.createReport);
// reportsRouter.put('/reports/:requestId', reportsController.updateReport);
// reportsRouter.delete('/reports/:requestId', reportsController.deleteReport);

module.exports = { reportsRouter };
