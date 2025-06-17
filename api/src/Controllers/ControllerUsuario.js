const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { nome, email } = req.body;
    try {
        const usuario = await prisma.usuario.create({
            data: { nome, email }
        });
        res.status(201).json(usuario);
    } catch (err) {
        if (err.code === 'P2002') { 
            res.status(400).json({ error: 'Email já cadastrado.' });
        } else {
            res.status(500).json(err);
        }
    }
};

const read = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json(err);
    }
};

const update = async (req, res) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;
    try {
        const usuario = await prisma.usuario.update({
            where: { id },
            data: { nome, email }
        });
        res.status(202).json(usuario);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletar = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.usuario.delete({
            where: { id }
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