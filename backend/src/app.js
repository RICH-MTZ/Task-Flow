import express from 'express';
import path from 'node:path';
import taskRouter from './routes/task.route.js'

const tasks = [
  { id: 1, title: 'Configurar Node.js', status: 'DONE', project: 'TaskFlow' },
  { id: 2, title: 'Crear rutas Express', status: 'TODO', project: 'TaskFlow' },
  { id: 3, title: 'Documentar API', status: 'TODO', project: 'DASW' },
];

const app = express();

app.use(express.json());

const publicDir = path.join(process.cwd(), 'public');

console.log(publicDir);

app.use('/assets', express.static(path.join(publicDir, 'assets')));

app.use('/api/tasks', taskRouter);

app.get('/', (request, response) => {
  response.sendFile('index.html', {
    root: path.join(publicDir, 'views'),
    dotfiles: 'deny',
  });
});

app.get('/api/health', (request, response) => {
  response.json({ status: 'Ok', system: 'TaskFlow' });
});

app.get('/api/info', (request, response) => {
  const info = {
    name : 'TaskFlow',
    version: '1.0.0',
    description: 'TaskFlow, el sistema de seguimiento de tareas y proyectos.',
  };

  response.json(info);
});

app.get('/api/tasks', (request, response) => {
  const { status, project } = request.query;

  console.log(`Estatus solicitado: ${status ?? 'All'}`);
  console.log(`Projecto solicitado: ${project ?? 'Default'}`);

  let resultados = tasks;

  if (status?.trim()) {
    resultados = tasks.filter(t => t.status === status);
  }

  if (project?.trim()) {
    resultados = resultados.filter(t => t.project === project);
  }

  response.json(resultados);
});

app.get('/api/tasks/stats', (request, response) => {
  response.json({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    done: tasks.filter(t => t.status === 'DONE').length,
  });
});

app.get('/api/tasks/:id', (request, response) => {
  const id = Number(request.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return response.status(404).json({ mensaje: 'No se encontró la tarea ', id });
  }

  response.status(200).json(task);
});

//Filtrar 


app.post('/api/tasks', (request, response) => {
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


app.use((request, response) => {
  const mensaje = {
    mensaje: 'Ruta no encontrada',
    path: request.path,
  };
  response.status(404).json(mensaje);
});

export default app;