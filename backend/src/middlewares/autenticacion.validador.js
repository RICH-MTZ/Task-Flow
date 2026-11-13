import { body } from 'express-validator';

const reglaCorreo = body('email')
  .isEmail()
  .withMessage('El correo no es válido')
  .normalizeEmail();

const reglaContrasena = body('password')
  .isLength({ min: 8 })
  .withMessage('La contraseña debe tener al menos 8 caracteres');

export const reglasRegistro = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),
  reglaCorreo,
  reglaContrasena,
];

export const reglasInicioSesion = [reglaCorreo, reglaContrasena];
