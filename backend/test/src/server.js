import aplicacion from './app.js';

const PUERTO = process.env.PORT || 3000;

aplicacion.listen(PUERTO, () => console.log(`TaskFlow en http://localhost:${PUERTO}`));
