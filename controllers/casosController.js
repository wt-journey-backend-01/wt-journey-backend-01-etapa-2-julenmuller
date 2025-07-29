const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAllCasos(req, res) {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function getCasoById(req, res) {
  try {
    const caso = casosRepository.findById(req.params.id);
    if (!caso) {
      return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }
    res.json(caso);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function createCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;
    const erros = [];

    if (!titulo) erros.push({ titulo: 'Campo obrigatório' });
    if (!descricao) erros.push({ descricao: 'Campo obrigatório' });
    if (!['aberto', 'solucionado'].includes(status)) {
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

    casosRepository.create(novoCaso);
    res.status(201).json(novoCaso);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function updateCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;
    const id = req.params.id;

    const casoExistente = casosRepository.findById(id);
    if (!casoExistente) {
      return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    const erros = [];
    if (!titulo) erros.push({ titulo: 'Campo obrigatório' });
    if (!descricao) erros.push({ descricao: 'Campo obrigatório' });
    if (!['aberto', 'solucionado'].includes(status)) {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function patchCaso(req, res) {
  try {
    const id = req.params.id;
    const atualizacao = req.body;

    const casoExistente = casosRepository.findById(id);
    if (!casoExistente) {
      return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    const erros = [];

    if ('status' in atualizacao && !['aberto', 'solucionado'].includes(atualizacao.status)) {
      erros.push({ status: 'O campo "status" deve ser "aberto" ou "solucionado"' });
    }

    if ('agente_id' in atualizacao && !agentesRepository.findById(atualizacao.agente_id)) {
      erros.push({ agente_id: 'Agente inexistente ou inválido' });
    }

    if (erros.length > 0) {
      return res.status(400).json({ status: 400, message: 'Parâmetros inválidos', errors: erros });
    }

    const atualizado = casosRepository.partialUpdate(id, atualizacao);
    res.json(atualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function deleteCaso(req, res) {
  try {
    const id = req.params.id;
    const casoRemovido = casosRepository.remove(id);

    if (!casoRemovido) {
      return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function getAgenteResponsavel(req, res) {
  try {
    const caso = casosRepository.findById(req.params.caso_id);
    if (!caso) {
      return res.status(404).json({ status: 404, message: 'Caso não encontrado' });
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
      return res.status(404).json({ status: 404, message: 'Agente não encontrado' });
    }

    res.json(agente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
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