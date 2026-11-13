import { describe, expect, it, jest } from '@jest/globals';

import { Tarea } from '../../../src/entities/tarea.entidad.js';
import { Usuario } from '../../../src/entities/usuario.entidad.js';

describe('Tarea', () => {
  it('limpia datos y aplica valores predeterminados', () => {
    expect(new Tarea({ title: '  Probar  ' })).toEqual({
      project: 'TaskFlow',
      status: 'TODO',
      title: 'Probar',
    });
  });

  it('conserva estado y proyecto indicados', () => {
    expect(new Tarea({ project: ' DASW ', status: ' DONE ', title: ' Tarea ' }))
      .toEqual({ project: 'DASW', status: 'DONE', title: 'Tarea' });
  });
});

describe('Usuario', () => {
  it('aplica valores predeterminados', () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    expect(new Usuario({ email: 'a@b.com', name: 'Ana', password: '12345678' })).toEqual({
      createdAt: '2026-01-01T00:00:00.000Z',
      email: 'a@b.com',
      id: null,
      isActive: true,
      name: 'Ana',
      password: '12345678',
    });
    jest.useRealTimers();
  });

  it('conserva valores proporcionados', () => {
    const datos = { createdAt: 'fecha', email: 'a@b.com', id: 4, isActive: false, name: 'Ana', password: 'clave' };
    expect(new Usuario(datos)).toEqual(datos);
  });
});
