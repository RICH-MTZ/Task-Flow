import aplicacion from './app.js';
import { connectDatabase } from './config/database.js';

//const PUERTO = process.env.PORT || 3000;

try {
    await connectDatabase();
    aplicacion.listen(process.env.PORT || 3000);
} catch (error){
    console.error('Revisa conexion y entorno', error.message);
    process.exitCode = 1;
}

//aplicacion.listen(PUERTO, () => console.log(`TaskFlow en http://localhost:${PUERTO}`));
