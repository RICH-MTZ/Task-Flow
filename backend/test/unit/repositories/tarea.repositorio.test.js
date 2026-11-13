import { beforeEach, describe, expect, it, jest } from '@jest/globals';

let repositorio;

beforeEach(async () => {
  jest.resetModules();
  repositorio = await import('../../../src/repositories/tarea.repositorio.js');
});

describe('repositorio de tareas', () => {
  it('lista y filtra tareas', async () => {
    expect(await repositorio.buscarTodas()).toHaveLength(3);
    expect(await repositorio.buscarTodas({ project: 'DASW', status: 'TODO' }))
      .toEqual([{ id: 3, project: 'DASW', status: 'TODO', title: 'Preparar pruebas' }]);
  });

  it('busca por identificador numérico o texto', async () => {
    expect(await repositorio.buscarPorId('1')).toMatchObject({ id: 1 });
    expect(await repositorio.buscarPorId(99)).toBeUndefined();
  });

  it('crea con identificador consecutivo', async () => {
    await expect(repositorio.crear({ title: 'Nueva' })).resolves.toEqual({ id: 4, title: 'Nueva' });
  });

  it('actualiza sin permitir cambiar identificador', async () => {
    await expect(repositorio.actualizar(1, { id: 99, title: 'Actualizada' }))
      .resolves.toEqual({ id: 1, title: 'Actualizada' });
    await expect(repositorio.actualizar(99, {})).resolves.toBeNull();
  });

  it('elimina tareas existentes', async () => {
    await expect(repositorio.eliminar(1)).resolves.toBe(true);
    await expect(repositorio.eliminar(99)).resolves.toBe(false);
  });
});
