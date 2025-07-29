const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');
const { isUUID } = require('validator');

function getAllCasos(req, res) {
  try {
    let resultados = casosRepository.findAll();
    const { agente_id, status, q } = req.query;

    if (agente_id) {
      resultados = resultados.filter(caso => caso.agente_id === agente_id);
    }

    if (status) {
      resultados = resultados.filter(caso => caso.status === status);
    }

    if (q) {
      const qLower = q.toLowerCase();
      resultados = resultados.filter(caso =>
        caso.titulo.toLowerCase().includes(qLower) ||
        caso.descricao.toLowerCase().includes(qLower)
      );
    }

    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
  }
}

function getCasoById(req, res) {
  try {
    const caso = casosRepository.findById(req.params.id);
    if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });
    res.json(caso);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

function createCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;
    const erros = [];

    if (!titulo) erros.push({ titulo: 'Campo obrigatório' });
    if (!descricao) erros.push({ descricao: 'Campo obrigatório' });
    if (!['aberto', 'solucionado'].includes(status)) {
      erros.push({ status: 'Deve ser "aberto" ou "solucionado"' });
    }

    if (!agente_id) {
      erros.push({ agente_id: 'Campo obrigatório' });
    } else if (!isUUID(agente_id)) {
      erros.push({ agente_id: 'Formato de UUID inválido' });
    } else if (!agentesRepository.findById(agente_id)) {
      erros.push({ agente_id: 'Agente não encontrado' });
    }

    if (erros.length) return res.status(400).json({ erros });

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
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

function updateCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;
    const { id } = req.params;

    const casoExistente = casosRepository.findById(id);
    if (!casoExistente) return res.status(404).json({ message: 'Caso não encontrado' });

    const erros = [];
    if (!titulo) erros.push({ titulo: 'Campo obrigatório' });
    if (!descricao) erros.push({ descricao: 'Campo obrigatório' });
    if (!['aberto', 'solucionado'].includes(status)) {
      erros.push({ status: 'Deve ser "aberto" ou "solucionado"' });
    }

    if (!agente_id) {
      erros.push({ agente_id: 'Campo obrigatório' });
    } else if (!isUUID(agente_id)) {
      erros.push({ agente_id: 'Formato de UUID inválido' });
    } else if (!agentesRepository.findById(agente_id)) {
      erros.push({ agente_id: 'Agente não encontrado' });
    }

    if (erros.length) return res.status(400).json({ erros });

    const atualizado = casosRepository.update(id, {
      titulo,
      descricao,
      status,
      agente_id
    });

    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

function patchCaso(req, res) {
  try {
    const { id } = req.params;
    const atualizacao = req.body;

    const casoExistente = casosRepository.findById(id);
    if (!casoExistente) return res.status(404).json({ message: 'Caso não encontrado' });

    if (atualizacao.agente_id) {
      if (!isUUID(atualizacao.agente_id)) {
        return res.status(400).json({ message: 'Formato de UUID inválido' });
      }

      if (!agentesRepository.findById(atualizacao.agente_id)) {
        return res.status(400).json({ message: 'Agente não encontrado' });
      }
    }

    const atualizado = casosRepository.partialUpdate(id, atualizacao);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

function deleteCaso(req, res) {
  try {
    const { id } = req.params;
    const removido = casosRepository.remove(id);
    if (!removido) return res.status(404).json({ message: 'Caso não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

function getAgenteResponsavel(req, res) {
  try {
    const { caso_id } = req.params;
    const caso = casosRepository.findById(caso_id);
    if (!caso) return res.status(404).json({ message: 'Caso não encontrado' });

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) return res.status(404).json({ message: 'Agente não encontrado' });

    res.json(agente);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
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