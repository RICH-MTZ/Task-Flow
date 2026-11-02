import { request, response } from 'express';

export const logger = (req = request, res = response, next) => {
    const log = `${req.method} ${req.url}`;
    console.log(log);

    next();
}