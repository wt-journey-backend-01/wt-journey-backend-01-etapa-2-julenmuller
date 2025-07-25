const agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(agente => agente.id === id);
}

function create(novoAgente) {
  agentes.push(novoAgente);
  return novoAgente;
}

function update(id, dadosAtualizados) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...dadosAtualizados };
    return agentes[index];
  }
  return null;
}

function remove(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    return agentes.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};