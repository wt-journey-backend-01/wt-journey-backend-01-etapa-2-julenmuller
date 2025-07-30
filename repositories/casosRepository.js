const casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(c => c.id === id);
}

function create(caso) {
  casos.push(caso);
  return caso;
}

function update(id, novoCaso) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;

  casos[index] = { ...casos[index], ...novoCaso, id };
  return novoCaso;
}

function partialUpdate(id, atualizacao) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;

  const { id: _, ...dadosSemId } = atualizacao;
  casos[index] = { ...casos[index], ...dadosSemId };
  return casos[index];
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return false;

  casos.splice(index, 1);
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