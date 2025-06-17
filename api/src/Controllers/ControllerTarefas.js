const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { usuarioId, descricao, nome_setor, prioridade, status } = req.body;
    try {
        const tarefa = await prisma.tarefa.create({
            data: {
                usuarioId,
                descricao,
                nome_setor,
                prioridade,
                status
            }
        });
        res.status(201).json(tarefa);
    } catch (err) {
        res.status(500).json(err);
    }
};

const read = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany({
            include: {
                usuario: {
                    select: {
                        nome: true,
                        email: true
                    }
                }
            }
        });
        res.status(200).json(tarefas);
    } catch (err) {
        res.status(500).json(err);
    }
};

const update = async (req, res) => {
    const id_tarefa = Number(req.params.id);
    const { usuarioId, descricao, nome_setor, prioridade, status } = req.body;
    try {
        const tarefa = await prisma.tarefa.update({
            where: { id_tarefa },
            data: {
                usuarioId,
                descricao,
                nome_setor,
                prioridade,
                status
            }
        });
        res.status(202).json(tarefa);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletar = async (req, res) => {
    const id_tarefa = Number(req.params.id);
    try {
        await prisma.tarefa.delete({
            where: { id_tarefa }
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    create,
    read,
    update,
    deletar
};