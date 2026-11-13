export class Usuario {
  constructor(datos) {
    this.id = datos.id ?? null;
    this.name = datos.name;
    this.email = datos.email;
    this.password = datos.password;
    this.createdAt = datos.createdAt ?? new Date().toISOString();
    this.isActive = datos.isActive ?? true;
  }
}
