const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAllAll(); // Confirme se esse método existe
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

    agentesRepository.create(novoAgente);
    res.status(201).json(novoAgente);
}

module.exports = {
    getAllAgentes,
    createAgente
};