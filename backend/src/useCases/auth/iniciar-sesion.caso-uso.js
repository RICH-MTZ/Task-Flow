import * as repositorioUsuario from '../../repositories/usuario.repositorio.js';

const sinContrasena = ({ password: _contrasena, ...usuario }) => usuario;

export const ejecutar = async ({ email, password }) => {
  const usuario = await repositorioUsuario.buscarPorCorreo(email);
  if (!usuario || usuario.password !== password) {
    return null;
  }
  return sinContrasena(usuario);
};
