const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allowedFormsSchema = new Schema({
  formId: String,
  allowedField: String,
  allowedValue: String,
});
const AccountSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
  permissionType: { type: String },
  allowedForms: { type: [allowedFormsSchema] },
  token: String
});

module.exports = mongoose.model("Account", AccountSchema);
