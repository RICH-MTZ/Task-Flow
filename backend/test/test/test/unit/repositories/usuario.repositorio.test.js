import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

let contenido;
let repositorio;
const readFile = jest.fn();
const writeFile = jest.fn();

jest.unstable_mockModule('node:fs/promises', () => ({ readFile, writeFile }));

beforeAll(async () => {
  repositorio = await import('../../../src/repositories/usuario.repositorio.js');
});

beforeEach(() => {
  contenido = [{ email: 'ana@example.com', id: 1, name: 'Ana' }];
  readFile.mockImplementation(async () => JSON.stringify(contenido));
  writeFile.mockImplementation(async (_ruta, datos) => {
    contenido = JSON.parse(datos);
  });
});

describe('repositorio de usuarios', () => {
  it('busca usuario por correo', async () => {
    await expect(repositorio.buscarPorCorreo('ana@example.com')).resolves.toMatchObject({ id: 1 });
    await expect(repositorio.buscarPorCorreo('nadie@example.com')).resolves.toBeNull();
  });

  it('crea usuario y persiste JSON formateado', async () => {
    await expect(repositorio.crear({ email: 'bob@example.com' }))
      .resolves.toEqual({ email: 'bob@example.com', id: 2 });
    expect(writeFile).toHaveBeenCalledWith(expect.stringContaining('users.json'), expect.stringContaining('\n  '));
    expect(contenido).toHaveLength(2);
  });
});
