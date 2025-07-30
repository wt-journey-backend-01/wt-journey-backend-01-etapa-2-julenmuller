const { isUUID } = require('validator');

function validarUUID(id, campo = 'id') {
  if (!isUUID(id)) {
    return { [campo]: 'Formato de UUID inválido' };
  }
  return null;
}

module.exports = {
  validarUUID
};
