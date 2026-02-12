const mongoose = require('mongoose');

const FreightMarginSchema = new mongoose.Schema({
    origem: String,
    destino: String,
    valorFrete: Number,
    totalDespesas: Number,
    margem: Number,
    margemPercentual: Number,
    pagador: String,
}, { timestamps: true });

module.exports = mongoose.model('FreightMargin', FreightMarginSchema);
