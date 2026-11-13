import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { crearRespuesta } from '../helpers/http.js';

const casos = { cerrar: jest.fn(), iniciar: jest.fn(), registrar: jest.fn() };
const matchedData = jest.fn(solicitud => solicitud.validado);

jest.unstable_mockModule('express-validator', () => ({ matchedData }));
jest.unstable_mockModule('../../../src/useCases/auth/cerrar-sesion.caso-uso.js', () => ({ ejecutar: casos.cerrar }));
jest.unstable_mockModule('../../../src/useCases/auth/iniciar-sesion.caso-uso.js', () => ({ ejecutar: casos.iniciar }));
jest.unstable_mockModule('../../../src/useCases/auth/registrar-usuario.caso-uso.js', () => ({ ejecutar: casos.registrar }));

let controlador;

beforeAll(async () => {
  controlador = await import('../../../src/controllers/autenticacion.controlador.js');
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('controlador de autenticación', () => {
  it('registra con datos validados y estado 201', async () => {
    casos.registrar.mockResolvedValue({ id: 1 });
    const respuesta = crearRespuesta();
    await controlador.registrar({ validado: { email: 'ana@example.com' } }, respuesta, jest.fn());
    expect(casos.registrar).toHaveBeenCalledWith({ email: 'ana@example.com' });
    expect(respuesta.status).toHaveBeenCalledWith(201);
  });

  it('responde 409 para correo registrado', async () => {
    casos.registrar.mockResolvedValue(null);
    const respuesta = crearRespuesta();
    await controlador.registrar({ validado: {} }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(409);
  });

  it('inicia sesión o responde 401', async () => {
    const respuesta = crearRespuesta();
    casos.iniciar.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce(null);
    await controlador.iniciar({ validado: {} }, respuesta, jest.fn());
    expect(respuesta.json).toHaveBeenCalledWith({ id: 1 });
    await controlador.iniciar({ validado: {} }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(401);
  });

  it('cierra sesión', async () => {
    casos.cerrar.mockResolvedValue({ message: 'Sesión cerrada' });
    const respuesta = crearRespuesta();
    await controlador.cerrar({}, respuesta, jest.fn());
    expect(respuesta.json).toHaveBeenCalledWith({ message: 'Sesión cerrada' });
  });

  it.each(['registrar', 'iniciar', 'cerrar'])('propaga errores desde %s', async metodo => {
    const error = new Error('fallo');
    casos[metodo].mockRejectedValue(error);
    const siguiente = jest.fn();
    await controlador[metodo]({ validado: {} }, crearRespuesta(), siguiente);
    expect(siguiente).toHaveBeenCalledWith(error);
  });
});
