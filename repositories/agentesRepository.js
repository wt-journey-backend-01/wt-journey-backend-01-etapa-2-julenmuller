const agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(a => a.id === id);
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

function update(id, novosDados) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return null;

  agentes[index] = { ...agentes[index], ...novosDados };
  return agentes[index];
}

function partialUpdate(id, atualizacao) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return null;

  const { id: _, ...dadosSemId } = atualizacao;
  agentes[index] = { ...agentes[index], ...dadosSemId };
  return agentes[index];
}

function remove(id) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return false;

  agentes.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  remove
};