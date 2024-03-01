const { Schema, model } = require('mongoose');

const locationSchema = new Schema(
  {
    city: { type: String, required: true },
    street: { type: String, required: true },
    buildingNumber: { type: Number, required: true },
  },
  { _id: false },
);

locationSchema
  .path('buildingNumber')
  .validate((buildingNumber) => buildingNumber > 0);

const reportsSchema = new Schema(
  {
    reportName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    incidentDate: { type: String, required: true },
    incidentLocation: locationSchema,
    damageType: { type: String, required: true },
    effectedProperty: { type: String, required: true },
    extentOfDamage: { type: String, required: true },
    estimatedRepairCost: { type: Number, required: true },
    damageDescription: { type: String },
  },
  { collection: 'reports' },
);

module.exports = model('report', reportsSchema);
