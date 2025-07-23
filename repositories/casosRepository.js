const casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(caso => caso.id === id);
}

function create(caso) {
    casos.push(caso);
    return caso;
}

function update(id, novoCaso) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;
  casos[index] = novoCaso;
  return novoCaso;
}

function partialUpdate(id, campos) {
    const caso = casos.find(c => c.id === id);
    if (!caso) return null;
    Object.assign(caso, campos);
    return caso;
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return false;
  casos.splice(index, 1);
  return true;
}

function findByAgenteId(agente_Id) {
  return casos.filter(caso => caso.agente_Id === agente_Id);
}

function findByStatus(status) {
  return casos.filter(caso => caso.status === status);
}   

function search(texto) {
    const q = texto.toLowerCase();
    return casos.filter(caso =>
        caso.titulo.toLowerCase().includes(q) ||
        caso.descricao.toLowerCase().includes(q)
    );
}

module.exports = {
  findAll, findById, create, update, partialUpdate, remove, findByAgenteId,
  findByStatus, search
};