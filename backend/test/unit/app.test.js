import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

import aplicacion from '../../src/app.js';

let baseUrl;
let servidor;

beforeAll(async () => {
  servidor = aplicacion.listen(0);
  await new Promise(resolver => {
    servidor.once('listening', resolver);
  });
  baseUrl = `http://127.0.0.1:${servidor.address().port}`;
});

afterAll(async () => {
  await new Promise((resolver, rechazar) => {
    servidor.close(error => error ? rechazar(error) : resolver());
  });
});

describe('aplicación', () => {
  it('expone estado del sistema', async () => {
    const respuesta = await fetch(`${baseUrl}/api/health`);
    await expect(respuesta.json()).resolves.toEqual({ status: 'Ok', system: 'TaskFlow' });
  });

  it('expone información del sistema', async () => {
    const respuesta = await fetch(`${baseUrl}/api/info`);
    await expect(respuesta.json()).resolves.toMatchObject({ name: 'TaskFlow', version: '1.0.0' });
  });

  it('responde JSON 404 para ruta desconocida', async () => {
    const respuesta = await fetch(`${baseUrl}/no-existe`);
    expect(respuesta.status).toBe(404);
    await expect(respuesta.json()).resolves.toEqual({ mensaje: 'Ruta no encontrada', path: '/no-existe' });
  });
});
