const { Schema, model, ObjectId } = require('mongoose');

const locationSchema = new Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  building_number: { type: Number, required: true },
}, { _id: false });

locationSchema.
    path('building_number')
    .validate(building_number => building_number > 0)

const reportsSchema = new Schema({
  user_id: { type: Number, required: true },
  damage_type: { type: String, required: true },
  damage_cause: { type: String, required: true },
  location: locationSchema,
  damage_desc: { type: String },
}, { collection: 'reports' });

reportsSchema.
    path('user_id')
    .validate(user_id => user_id > 0)

module.exports = model('report', reportsSchema);
