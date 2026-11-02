import { request, response } from "express";

const errorHandler = (error, req = request, res = response, next) => {
    console.error(error);
    
    res.status(500).json({ mensaje : 'Error interno en el servidor' });
};

export default errorHandler; 