import { response, Router } from 'express';

const router = Router();

const tasks = [
  { id: 1, title: 'Configurar Node.js', status: 'DONE', project: 'TaskFlow' },
  { id: 2, title: 'Crear rutas Express', status: 'TODO', project: 'TaskFlow' },
  { id: 3, title: 'Documentar API', status: 'TODO', project: 'DASW' },
];

router.get('/', (request, response) => {
    const { status, project}  = request.query;


    let resultados = tasks;

    if (status?.trim()) {
        resultados = tasks.filter(t => t.status === status);
    }

    if (project?.trim()) {
        resultados = resultados.filter(t => t.project === project);
    }

    response.json(resultados);
});

router.get('/stats', (request, response) => {
    response.json({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    done: tasks.filter(t => t.status === 'DONE').length,
  });
}); 

router.get('/', (request, response) => {
    const { status, project, sort } = request.query; 
    let resultados = tasks; 
    if (status?.trim()) {
        resultados = tasks.filter(t => t.status === status);
    }

    if (project?.trim()) {
        resultados = task.filter(t => t.project === project);
    }

    if (sort?.trim()) {
        resultados = tasks.filter(t => t.sort === sort);
    }

    response.json(resultados);
});

router.get('/:id', (request, response) => {
    const id = Number(request.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return response.status(404).json({ mensaje: 'No se encontró la tarea ', id });
  }

  response.status(200).json(task);
});

router.post('/', (request, response) => {
    const { title, status, project = 'TaskFlow' } = request.body;

  if (!title?.trim() || !status?.trim()) {
    return response.status(400).json({
      mensaje: 'title y status son obligatorios',
    });
  }

  const nextId = Math.max(...tasks.map(item => item.id), 0) + 1;

  const task = {
    id: nextId,
    title: title.trim(),
    status: status.trim(),
    project,
  };

  tasks.push(task);

  response.status(201).json(task);
});

router.put('/:id', (request, response) => {
    const id = Number(request.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1){
        return response.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    const { title, status, project = 'TaskFlow' } = request.body;

    if (!title?.trim() || !status?.trim()) {
        return response.status(400).json({
            mensaje: 'title y status son obligatorios',
        });
    }

    tasks[index] = { id, title, status, project };
    response.json(tasks[index]);
});

router.delete('/:id', (request, response) => {
    const id = Number(request.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1){
        return response.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    const [deletedTask] = tasks.splice(index, 1);

    response.status(200).json({ 
        mensaje: 'Tarea eliminada exitosamente',
        task: deletedTask
    });
});
export default router;