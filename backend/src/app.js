import express from 'express';

const app = express();

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok', system: 'TaskFlow' });
});

app.get('/api/info', (request, response) => {
  response.json({ name: "TaskFlow", version: "texto", description: "Descripcion de prueba" });
});

const tareas = [{
  "id": 1,
  "title": "Hacer tarea",
  "status": "Completada",
  "project": "Hola"
},{
  "id": 2,
  "title": "Comer",
  "status": "TODO",
  "project": "Hola"
},{
  "id": 3,
  "title": "Dormir",
  "status": "TODO",
  "project": "Hola"
}];

app.get('/api/tasks', (request, response) => {
  response.json(tareas);
});

app.use((req, res) => {
  res.status(404);
  res.json({ error: "La ruta no exite", ruta: req.originalUrl });
});

app.listen(3000, () => {
  console.log('TaskFlow API en http://localhost:3000');
});
