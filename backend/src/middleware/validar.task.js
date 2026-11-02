import { request, response } from "express";

export const validarTask = (req = request, res = response, next) => {
    const { title, status } = req.body;
    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ mensaje: 'El titulo es obligatorio'  });
    }

    if (typeof status !== 'string' || !status.trim()) {
        return res.status(400).json({ mensaje: 'El status es obligatorio' });
    }
    next();
};