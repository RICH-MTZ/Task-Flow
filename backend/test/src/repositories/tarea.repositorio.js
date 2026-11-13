const tareas = [
  { id: 1, title: 'Diseñar API REST', status: 'TODO', project: 'TaskFlow' },
  { id: 2, title: 'Separar rutas', status: 'DONE', project: 'TaskFlow' },
  { id: 3, title: 'Preparar pruebas', status: 'TODO', project: 'DASW' },
];

export const buscarTodas = async ({ status, project } = {}) => tareas.filter(tarea => {
  const coincideEstado = !status || tarea.status === status;
  const coincideProyecto = !project || tarea.project === project;
  return coincideEstado && coincideProyecto;
});

export const buscarPorId = async identificador => tareas.find(
  tarea => tarea.id === Number(identificador),
);

export const crear = async datos => {
  const siguienteId = Math.max(...tareas.map(tarea => tarea.id), 0) + 1;
  const tarea = { ...datos, id: siguienteId };
  tareas.push(tarea);
  return tarea;
};

export const actualizar = async (identificador, datos) => {
  const indice = tareas.findIndex(tarea => tarea.id === Number(identificador));
  if (indice === -1) {
    return null;
  }
  tareas[indice] = { ...datos, id: tareas[indice].id };
  return tareas[indice];
};

export const eliminar = async identificador => {
  const indice = tareas.findIndex(tarea => tarea.id === Number(identificador));
  if (indice === -1) {
    return false;
  }
  tareas.splice(indice, 1);
  return true;
};
