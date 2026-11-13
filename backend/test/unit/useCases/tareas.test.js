import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

const repositorio = {
  actualizar: jest.fn(),
  buscarPorId: jest.fn(),
  buscarTodas: jest.fn(),
  crear: jest.fn(),
  eliminar: jest.fn(),
};

jest.unstable_mockModule('../../../src/repositories/tarea.repositorio.js', () => repositorio);

let actualizar;
let crear;
let eliminar;
let listar;
let obtener;

beforeAll(async () => {
  [actualizar, crear, eliminar, listar, obtener] = await Promise.all([
    import('../../../src/useCases/tasks/actualizar-tarea.caso-uso.js'),
    import('../../../src/useCases/tasks/crear-tarea.caso-uso.js'),
    import('../../../src/useCases/tasks/eliminar-tarea.caso-uso.js'),
    import('../../../src/useCases/tasks/listar-tareas.caso-uso.js'),
    import('../../../src/useCases/tasks/obtener-tarea-por-id.caso-uso.js'),
  ]);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('casos de uso de tareas', () => {
  it('crea entidad y la guarda', async () => {
    repositorio.crear.mockImplementation(async tarea => ({ ...tarea, id: 1 }));
    await expect(crear.ejecutar({ title: ' Nueva ' }))
      .resolves.toEqual({ id: 1, project: 'TaskFlow', status: 'TODO', title: 'Nueva' });
  });

  it('delega listado con filtros', async () => {
    repositorio.buscarTodas.mockResolvedValue(['tarea']);
    await expect(listar.ejecutar({ status: 'TODO' })).resolves.toEqual(['tarea']);
    expect(repositorio.buscarTodas).toHaveBeenCalledWith({ status: 'TODO' });
  });

  it('delega búsqueda por identificador', async () => {
    repositorio.buscarPorId.mockResolvedValue({ id: 2 });
    await expect(obtener.ejecutar('2')).resolves.toEqual({ id: 2 });
  });

  it('actualiza una tarea existente', async () => {
    repositorio.buscarPorId.mockResolvedValue({ project: 'DASW', status: 'TODO', title: 'Vieja' });
    repositorio.actualizar.mockImplementation(async (_id, tarea) => tarea);
    await expect(actualizar.ejecutar(1, { status: 'DONE', title: ' Nueva ' }))
      .resolves.toEqual({ project: 'DASW', status: 'DONE', title: 'Nueva' });
  });

  it('no actualiza una tarea inexistente', async () => {
    repositorio.buscarPorId.mockResolvedValue(null);
    await expect(actualizar.ejecutar(99, { title: 'Nada' })).resolves.toBeNull();
    expect(repositorio.actualizar).not.toHaveBeenCalled();
  });

  it('delega eliminación', async () => {
    repositorio.eliminar.mockResolvedValue(true);
    await expect(eliminar.ejecutar(1)).resolves.toBe(true);
  });
});
