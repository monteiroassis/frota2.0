const mongoose = require('mongoose');

const ManifestSchema = new mongoose.Schema({
    motorista: String,
    veiculo: String,
    cidadeOrigem: String,
    cidadeDestino: String,
    receitaTransportada: Number,
    custoTotal: Number,
    valorLucro: Number,
    kmRodado: Number,
    data: String,
    cliente: String,
}, { timestamps: true });

module.exports = mongoose.model('Manifest', ManifestSchema);
