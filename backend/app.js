const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); 
const app = express();

app.use(bodyParser.json());

// Conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'microservicio',
};

// Ruta para guardar un dato en la tabla
app.post('/guardarDato', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const { name, last_name } = req.body; 

        await conexion.execute('INSERT INTO microservicio (name, last_name) VALUES (?, ?)', [name, last_name]);

        await conexion.end(); 

        res.json({ mensaje: 'Dato guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar el dato:', error);
    }
});



app.get('/obtenerDatos', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const [datos] = await conexion.execute('SELECT * FROM microservicio');
        await conexion.end();
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
});

app.delete('/borrarDato/:id', async (req, res) => {
    try {
        const conexion = await mysql.createConnection(dbConfig);
        const { id } = req.params;
        await conexion.execute('DELETE FROM microservicio WHERE id = ?', [id]);
        await conexion.end();
        res.json({ mensaje: 'Dato borrado correctamente' });
    } catch (error) {
        console.error('Error al borrar el dato:', error);
        res.status(500).json({ mensaje: 'Error al borrar el dato' });
    }
});






const PORT = 3000;
const IP = '0.0.0.0';

app.listen(PORT, IP, () => {
    console.log(`La aplicación está escuchando en http://${IP}:${PORT}`);
  });