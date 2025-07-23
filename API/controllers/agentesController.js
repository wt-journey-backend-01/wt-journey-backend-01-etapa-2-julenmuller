const agenetesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAll(req, res) {
    const agentes = agenetesRepository.findAllAll();
    res.json(agentes);
}

function createAgente(req, res) {
    const { nome, patente } = req.body;

    if (!nome || !patente) {
        return res.status(400).json({ error: 'Nome e patente são obrigatórios.' });
    }

    const novoAgente = {
        Id: uuidv4(),
        nome,
        patente
    };

    agenetesRepository.create(novoAgente);
    res.status(201).json(novoAgente);
}

module.exports = {
    getAllAgentes, createAgente
};