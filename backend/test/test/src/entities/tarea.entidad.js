export class Tarea {
  constructor(datos) {
    this.title = datos.title.trim();
    this.status = (datos.status ?? 'TODO').trim();
    this.project = (datos.project ?? 'TaskFlow').trim();
  }
}
