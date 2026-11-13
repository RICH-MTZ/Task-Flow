import { expect, it, jest } from '@jest/globals';

const listen = jest.fn((_puerto, callback) => callback());

jest.unstable_mockModule('../../src/app.js', () => ({ default: { listen } }));

it('inicia aplicación en puerto configurado', async () => {
  process.env.PORT = '4321';
  jest.spyOn(console, 'log').mockImplementation(() => {});
  await import('../../src/server.js');
  expect(listen).toHaveBeenCalledWith('4321', expect.any(Function));
  expect(console.log).toHaveBeenCalledWith('TaskFlow en http://localhost:4321');
  console.log.mockRestore();
  delete process.env.PORT;
});
