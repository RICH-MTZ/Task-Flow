import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directorioActual = path.dirname(fileURLToPath(import.meta.url));
const rutaArchivo = path.join(directorioActual, '../data/users.json');

const leerUsuarios = async () => JSON.parse(await readFile(rutaArchivo, 'utf8'));

const escribirUsuarios = async usuarios => {
  await writeFile(rutaArchivo, JSON.stringify(usuarios, null, 2));
};

export const buscarPorCorreo = async correo => {
  const usuarios = await leerUsuarios();
  return usuarios.find(usuario => usuario.email === correo) ?? null;
};

export const crear = async datos => {
  const usuarios = await leerUsuarios();
  const siguienteId = Math.max(...usuarios.map(usuario => usuario.id), 0) + 1;
  const usuario = { ...datos, id: siguienteId };
  usuarios.push(usuario);
  await escribirUsuarios(usuarios);
  return usuario;
};
