const express = require('express');
const app = express();
const PORT = 3000;
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

app.use(express.json());
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});