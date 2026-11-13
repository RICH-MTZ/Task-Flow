import { Usuario } from '../../entities/usuario.entidad.js';
import * as repositorioUsuario from '../../repositories/usuario.repositorio.js';

const sinContrasena = ({ password: _contrasena, ...usuario }) => usuario;

export const ejecutar = async datos => {
  const usuarioExistente = await repositorioUsuario.buscarPorCorreo(datos.email);
  if (usuarioExistente) {
    return null;
  }
  const usuario = new Usuario(datos);
  const usuarioCreado = await repositorioUsuario.crear(usuario);
  return sinContrasena(usuarioCreado);
};
