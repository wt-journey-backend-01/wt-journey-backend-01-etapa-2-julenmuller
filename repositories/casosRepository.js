const casos = [];

function findAll() {
  return casos;
}

function findWithFilters({ status, idAgente, busca }) {
  return casos.filter(caso => {
    const matchStatus = !status || caso.status === status;
    const matchAgente = !idAgente || caso.agente_id === idAgente;
    const matchBusca = !busca || (
      (caso.titulo?.toLowerCase().includes(busca.toLowerCase())) ||
      (caso.descricao?.toLowerCase().includes(busca.toLowerCase()))
    );
    return matchStatus && matchAgente && matchBusca;
  });
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
  
  const { id: _, ...dadosSemId } = novoCaso;
  casos[index] = { ...casos[index], ...dadosSemId };
  return casos[index];
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
  remove,
  findWithFilters
};