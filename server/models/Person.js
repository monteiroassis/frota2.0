const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    nome: String,
    tipo: {
        type: String,
        enum: ['Agregado', 'Frota Própria']
    },
}, { timestamps: true });

module.exports = mongoose.model('Person', PersonSchema);
