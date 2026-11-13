import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';

const repositorio = {
  buscarPorCorreo: jest.fn(),
  crear: jest.fn(),
};

jest.unstable_mockModule('../../../src/repositories/usuario.repositorio.js', () => repositorio);

let cerrar;
let iniciar;
let registrar;

beforeAll(async () => {
  [cerrar, iniciar, registrar] = await Promise.all([
    import('../../../src/useCases/auth/cerrar-sesion.caso-uso.js'),
    import('../../../src/useCases/auth/iniciar-sesion.caso-uso.js'),
    import('../../../src/useCases/auth/registrar-usuario.caso-uso.js'),
  ]);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('casos de uso de autenticación', () => {
  it('registra usuario nuevo sin exponer contraseña', async () => {
    repositorio.buscarPorCorreo.mockResolvedValue(null);
    repositorio.crear.mockImplementation(async usuario => ({ ...usuario, id: 1 }));
    const resultado = await registrar.ejecutar({ email: 'ana@example.com', name: 'Ana', password: 'secreto12' });
    expect(resultado).toMatchObject({ email: 'ana@example.com', id: 1, name: 'Ana' });
    expect(resultado).not.toHaveProperty('password');
  });

  it('rechaza correo registrado', async () => {
    repositorio.buscarPorCorreo.mockResolvedValue({ id: 1 });
    await expect(registrar.ejecutar({ email: 'ana@example.com' })).resolves.toBeNull();
    expect(repositorio.crear).not.toHaveBeenCalled();
  });

  it('inicia sesión con credenciales válidas sin exponer contraseña', async () => {
    repositorio.buscarPorCorreo.mockResolvedValue({ email: 'ana@example.com', id: 1, password: 'secreto12' });
    await expect(iniciar.ejecutar({ email: 'ana@example.com', password: 'secreto12' }))
      .resolves.toEqual({ email: 'ana@example.com', id: 1 });
  });

  it.each([
    [null, 'secreto12'],
    [{ password: 'otra' }, 'secreto12'],
  ])('rechaza credenciales inválidas', async (usuario, password) => {
    repositorio.buscarPorCorreo.mockResolvedValue(usuario);
    await expect(iniciar.ejecutar({ email: 'ana@example.com', password })).resolves.toBeNull();
  });

  it('cierra sesión', async () => {
    await expect(cerrar.ejecutar()).resolves.toEqual({ message: 'Sesión cerrada' });
  });
});
