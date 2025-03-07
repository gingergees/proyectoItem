// const express = require('express'); // Importamos Express
// const Item = require('../models/item'); // Importamos el modelo Item
// const router = express.Router(); // Creamos un enrutador

import express from 'express'; // Importamos Express
import Item from '../models/item.js'; // Importamos el modelo Item

import path from 'path'; 
import { fileURLToPath } from "url";

// Configurar __dirname para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ruta para crear un nuevo item (POST)
router.post('/', async (req, res) => {
  console.log("hola desde el github jejejeje")
  try {
    // Creamos una nueva instancia del modelo Item con los datos recibidos en el cuerpo de la solicitud
    const newItem = new Item(req.body);
    // Guardamos el nuevo item en la base de datos
    await newItem.save();
    // Respondemos con el item creado y código de estado 201 (Creado)
    res.status(201).json(newItem);
  } catch (error) {
    // Si ocurre un error, respondemos con código 500 y el mensaje de error
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener todos los items (GET)
router.get('/', async (req, res) => {
  try {
    // Obtenemos todos los items desde la base de datos
    const items = await Item.find();
    // Respondemos con los items obtenidos
    res.status(200).json(items);
  } catch (error) {
    // Si ocurre un error, respondemos con código 500 y el mensaje de error
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar un item específico (PUT)
router.put('/:id', async (req, res) => {
  try {
    // Buscamos el item por su ID y lo actualizamos con los nuevos datos
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Respondemos con el item actualizado
    res.status(200).json(updatedItem);
  } catch (error) {
    // Si ocurre un error, respondemos con código 500 y el mensaje de error
    res.status(500).json({ message: error.message });
  }
});

// Ruta para eliminar un item específico (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    // Buscamos el item por su ID y lo eliminamos
    await Item.findByIdAndDelete(req.params.id);
    // Respondemos con código 204 (sin contenido)
    res.status(204).json();
  } catch (error) {
    // Si ocurre un error, respondemos con código 500 y el mensaje de error
    res.status(500).json({ message: error.message });
  }
});

// module.exports = router; // Exportamos las rutas para usarlas en el archivo server.js
export default router; // Exportamos las rutas para usarlas en el archivo server.js