import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { crearRespuesta } from '../helpers/http.js';

const casos = {
  actualizar: jest.fn(),
  crear: jest.fn(),
  eliminar: jest.fn(),
  listar: jest.fn(),
  obtener: jest.fn(),
};

jest.unstable_mockModule('../../../src/useCases/tasks/actualizar-tarea.caso-uso.js', () => ({ ejecutar: casos.actualizar }));
jest.unstable_mockModule('../../../src/useCases/tasks/crear-tarea.caso-uso.js', () => ({ ejecutar: casos.crear }));
jest.unstable_mockModule('../../../src/useCases/tasks/eliminar-tarea.caso-uso.js', () => ({ ejecutar: casos.eliminar }));
jest.unstable_mockModule('../../../src/useCases/tasks/listar-tareas.caso-uso.js', () => ({ ejecutar: casos.listar }));
jest.unstable_mockModule('../../../src/useCases/tasks/obtener-tarea-por-id.caso-uso.js', () => ({ ejecutar: casos.obtener }));

let controlador;

beforeAll(async () => {
  controlador = await import('../../../src/controllers/tarea.controlador.js');
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('controlador de tareas', () => {
  it('lista tareas', async () => {
    casos.listar.mockResolvedValue([{ id: 1 }]);
    const respuesta = crearRespuesta();
    await controlador.listar({ query: { status: 'TODO' } }, respuesta, jest.fn());
    expect(respuesta.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('obtiene tarea o responde 404', async () => {
    const respuesta = crearRespuesta();
    casos.obtener.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce(null);
    await controlador.obtenerPorId({ params: { id: '1' } }, respuesta, jest.fn());
    expect(respuesta.json).toHaveBeenCalledWith({ id: 1 });
    await controlador.obtenerPorId({ params: { id: '9' } }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(404);
  });

  it('crea con estado 201', async () => {
    casos.crear.mockResolvedValue({ id: 4 });
    const respuesta = crearRespuesta();
    await controlador.crear({ body: { title: 'Tarea' } }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(201);
    expect(respuesta.json).toHaveBeenCalledWith({ id: 4 });
  });

  it('actualiza tarea o responde 404', async () => {
    const respuesta = crearRespuesta();
    casos.actualizar.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce(null);
    await controlador.actualizar({ body: {}, params: { id: '1' } }, respuesta, jest.fn());
    expect(respuesta.json).toHaveBeenCalledWith({ id: 1 });
    await controlador.actualizar({ body: {}, params: { id: '9' } }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(404);
  });

  it('elimina con 204 o responde 404', async () => {
    const respuesta = crearRespuesta();
    casos.eliminar.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    await controlador.eliminar({ params: { id: '1' } }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(204);
    await controlador.eliminar({ params: { id: '9' } }, respuesta, jest.fn());
    expect(respuesta.status).toHaveBeenCalledWith(404);
  });

  it.each(['listar', 'obtenerPorId', 'crear', 'actualizar', 'eliminar'])('propaga errores desde %s', async metodo => {
    const mapa = { actualizar: 'actualizar', crear: 'crear', eliminar: 'eliminar', listar: 'listar', obtenerPorId: 'obtener' };
    const error = new Error('fallo');
    casos[mapa[metodo]].mockRejectedValue(error);
    const siguiente = jest.fn();
    await controlador[metodo]({ body: {}, params: {}, query: {} }, crearRespuesta(), siguiente);
    expect(siguiente).toHaveBeenCalledWith(error);
  });
});
