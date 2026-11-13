import { matchedData as obtenerDatosValidados } from 'express-validator';

import * as cerrarSesion from '../useCases/auth/cerrar-sesion.caso-uso.js';
import * as iniciarSesion from '../useCases/auth/iniciar-sesion.caso-uso.js';
import * as registrarUsuario from '../useCases/auth/registrar-usuario.caso-uso.js';

export const registrar = async (solicitud, respuesta, siguiente) => {
  try {
    const usuario = await registrarUsuario.ejecutar(obtenerDatosValidados(solicitud));
    if (!usuario) {
      return respuesta.status(409).json({ message: 'El correo ya está registrado' });
    }
    return respuesta.status(201).json(usuario);
  } catch (error) {
    siguiente(error);
  }
};

export const iniciar = async (solicitud, respuesta, siguiente) => {
  try {
    const usuario = await iniciarSesion.ejecutar(obtenerDatosValidados(solicitud));
    if (!usuario) {
      return respuesta.status(401).json({ message: 'Credenciales inválidas' });
    }
    return respuesta.json(usuario);
  } catch (error) {
    siguiente(error);
  }
};

export const cerrar = async (_solicitud, respuesta, siguiente) => {
  try {
    const resultado = await cerrarSesion.ejecutar();
    return respuesta.json(resultado);
  } catch (error) {
    siguiente(error);
  }
};
