const express = require('express');
const router = express.Router();

const usuarioController = require('../src/Controllers/ControllerUsuario');
const tarefaController = require('../src/Controllers/ControllerTarefas');

router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.read);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.deletar);

router.post('/tarefas', tarefaController.create);
router.get('/tarefas', tarefaController.read);
router.put('/tarefas/:id', tarefaController.update);
router.delete('/tarefas/:id', tarefaController.deletar);

router.get('/teste', (req, res) => {
    res.json("Back-end respondendo com sucesso");
});

module.exports = router;