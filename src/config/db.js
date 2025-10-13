// // config/db.js
// import mongoose from 'mongoose';

// export const conectarDb = async() =>{
//     try {
//       await mongoose.connect(process.env.MONGO_URI)
//         console.log("Conectado a la base de datos correctamente")
//     } catch (error) {
//         console.log("No se pudo conectar a la base de datos")
//     }
// }


import mongoose from 'mongoose';

export const conectarDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 segundos de espera
    });
    console.log("✅ Conectado a la base de datos correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    throw error;
  }
};
