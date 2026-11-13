import { checkSchema } from 'express-validator';

export const reglasTarea = checkSchema({
  title: {
    trim: true,
    notEmpty: {
      errorMessage: 'El titulo es obligatorio',
    },
  },
  status: {
    optional: true,
    trim: true,
    isIn: {
      options: [['pending', 'in_progress', 'done']],
      errorMessage: 'El estado no es valido',
    },
  },
  priority: {
    optional: true,
    trim: true,
    isIn: {
      options: [['low', 'medium', 'high']],
      errorMessage: 'La prioridad no es valida',
    },
  },
  description: {
    optional: true,
    trim: true,
  },
});

export const reglasIdTarea = checkSchema({
  id: {
    in: ['params'],
    isMongoId: {
      errorMessage: 'El id de la tarea no es valido',
    },
  },
});

export const reglasFiltroTarea = checkSchema({
  status: {
    in: ['query'],
    optional: true,
    isIn: {
      options: [['pending', 'in_progress', 'done']],
      errorMessage: 'El estado de filtro no es valido',
    },
  },
});