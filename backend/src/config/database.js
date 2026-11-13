import mongoose from 'mongoose';

export async function connectDatabase() {
    if (!process.env.MONGODB_URI)
        throw new Error('Falta MONGODB_URI');
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
    }
    );
    console.log('Conexion a MongoDB exitosa');
        
};