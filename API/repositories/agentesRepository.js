const agentes = []

function findAll() {
  return agentes;
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

module.exports = {
  findAll, create
};