const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAllCasos(req, res) {
    const { agente_id, status, q } = req.query;
    if (agente_id) {
        return res.json(casosRepository.findByAgenteId(agente_id));
    }

    if (status) {
        return res.json(casosRepository.findByStatus(status));
    }

    if (q) {
        return res.json(casosRepository.search(q));
    }

    res.json(casosRepository.findAll());
}

function getCasoById(req, res) {
    const caso = casosRepository.findById(req.params.id);
    if (!caso) {
        return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }
    res.json(caso);
}

function createCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;

    const erros = [];
    if (!titulo) erros.push({ titulo: 'Campo obrigatório' });
    if (!descricao) erros.push({ descricao: 'Campo obrigatório' });
    if (!['aberto', 'solucionando'].includes(status)) {
        erros.push({ status: 'O campo "status" deve ser "aberto" ou "solucionado"' });
    }
    if (!agente_id || !agentesRepository.findById(agente_id)) {
        erros.push({ agente_id: 'Agente inexistente ou inválido' });
    }

    if (erros.length > 0) {
        return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors: erros });
    }

    const novoCaso = {
        id: uuidv4(),
        titulo,
        descricao,
        status,
        agente_id
    };

    casosRepository.update(novoCaso);
    res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    const id = req.params.id;

    const casoExistente = casosRepository.findById(id);
    if (!casoExistente) {
        return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    const erros = [];
    if (!titulo) erros.push({ titulo: 'Campo obrigatório' });
    if (!descricao) erros.push({ descricao: 'Campo obrigatório' });
    if (!['aberto', 'solucionando'].includes(status)) {
        erros.push({ status: 'O campo "status" deve ser "aberto" ou "solucionado"' });
    }
    if (!agente_id || !agentesRepository.findById(agente_id)) {
        erros.push({ agente_id: 'Agente inexistente ou inválido' });
    }

    if (erros.length > 0) {
        return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors: erros });
    }

    const atualizado = {
        id,
        titulo,
        descricao,
        status,
        agente_id
    };

    casosRepository.update(id, atualizado);
    res.json(atualizado);

}

function patchCaso(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    const atualizacao = req.body;

    if (atualizacao.status && !['aberto', 'solucionando'].includes(atualizacao.status)) {
        return res.status(400).json({
            status: 400, message: 'Parâmetros inválidos', errors: [{ status: 'O campo "status" deve ser "aberto" ou "solucionado"' }]
        });
    }

    if (atualizacao.agente_id && !agentesRepository.findById(atualizacao.agente_id)) {
        return res.status(400).json({
            status: 400, message: 'Parâmetros inválidos', errors: [{ agente_id: 'Agente inexistente ou inválido' }]
        });
    }

    const atualizado = casosRepository.partialUpdate(id, atualizacao);
    res.json(atualizado);
}

function deleteCaso(req, res) {
    const id = req.params.id;
    const caso = casosRepository.remove(id);
    if (!sucesso) {
        return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }
    res.status(204).send();
}

function getAgenteResponsavel(req, res) {
    const caso = casosRepository.findById(req.params.caso_id);
    if (!caso) {
        return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
        return res.status(404).json({ status: 404, message: 'Agente não encontrado' });
    }

    res.json(agente);
}

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    getAgenteResponsavel
};