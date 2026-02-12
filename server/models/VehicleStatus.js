const mongoose = require('mongoose');

const VehicleStatusSchema = new mongoose.Schema({
    placa: String,
    operacao: String,
    updated_at: String,
}, { timestamps: true });

module.exports = mongoose.model('VehicleStatus', VehicleStatusSchema);
