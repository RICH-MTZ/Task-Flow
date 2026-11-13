import { describe, expect, it } from '@jest/globals';

import rutasAutenticacion from '../../../src/routes/autenticacion.rutas.js';
import rutasTarea from '../../../src/routes/tarea.rutas.js';

const rutas = enrutador => enrutador.stack.map(capa => ({
  handlers: capa.route.stack.length,
  method: Object.keys(capa.route.methods)[0],
  path: capa.route.path,
}));

describe('rutas de tareas', () => {
  it('registra CRUD y validadores de escritura', () => {
    expect(rutas(rutasTarea)).toEqual([
      { handlers: 1, method: 'get', path: '/' },
      { handlers: 1, method: 'get', path: '/:id' },
      { handlers: 5, method: 'post', path: '/' },
      { handlers: 5, method: 'put', path: '/:id' },
      { handlers: 1, method: 'delete', path: '/:id' },
    ]);
  });
});

describe('rutas de autenticación', () => {
  it('registra endpoints y validadores', () => {
    expect(rutas(rutasAutenticacion)).toEqual([
      { handlers: 5, method: 'post', path: '/registro' },
      { handlers: 4, method: 'post', path: '/login' },
      { handlers: 1, method: 'post', path: '/logout' },
    ]);
  });
});
