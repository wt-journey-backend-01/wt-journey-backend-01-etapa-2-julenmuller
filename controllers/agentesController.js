const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAllAgentes(req, res) {
    let agentes = agentesRepository.findAll();
    const { sort, desde } = req.query;

    if (desde) {
        const dataMinima = new Date(desde);
        agentes = agentes.filter(a => new Date(a.data_incorporacao) >= dataMinima);
    }

    if (sort === 'asc') {
        agentes = agentes.sort((a, b) => new Date(a.data_incorporacao) - new Date(b.data_incorporacao));
    } else if (sort === 'desc') {
        agentes = agentes.sort((a, b) => new Date(b.data_incorporacao) - new Date(a.data_incorporacao));
    }

    res.json(agentes);
}

function createAgente(req, res) {
    const { nome, patente } = req.body;

    if (!nome || !patente) {
        return res.status(400).json({ error: 'Nome e patente são obrigatórios.' });
    }

    const novoAgente = {
        id: uuidv4(),
        nome,
        patente,
        data_incorporacao: new Date().toISOString()
    };

    agentesRepository.create(novoAgente);
    res.status(201).json(novoAgente);
}

function updateAgente(req, res) {
    const { nome, patente } = req.body;
    const id = req.params.id;

    const agenteExistente = agentesRepository.findById(id);
    if (!agenteExistente) {
        return res.status(404).json({ error: 'Agente não encontrado.' });
    }

    if (!nome || !patente) {
        return res.status(400).json({ error: 'Nome e patente são obrigatórios.' });
    }

    const atualizado = agentesRepository.update(id, { nome, patente });
    res.json(atualizado);
}

function patchAgente(req, res) {
    const id = req.params.id;
    const atualizacao = req.body;

    const agenteExistente = agentesRepository.findById(id);
    if (!agenteExistente) {
        return res.status(404).json({ error: 'Agente não encontrado.' });
    }

    const atualizado = agentesRepository.partialUpdate(id, atualizacao); // <-- ajuste aqui
    res.json(atualizado);
}

function deleteAgente(req, res) {
    const id = req.params.id;
    const removido = agentesRepository.remove(id);
    if (!removido) {
        return res.status(404).json({ error: 'Agente não encontrado.' });
    }
    res.status(204).send();
}

module.exports = {
    getAllAgentes,
    createAgente,
    updateAgente,
    patchAgente,
    deleteAgente
};
