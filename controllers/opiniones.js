const {
    createOpiniones,
    getAllOpiniones,
    getOpinionesById,
    deteleOpinionesById,
  } = require('../db/tweets');
  const { generateError, createPathIfNotExists } = require('../helpers');
  const path = require('path');
  const sharp = require('sharp');
  const { nanoid } = require('nanoid');
  
  const getOpinionesController = async (req, res, next) => {
    try {
      const Opiniones = await getAllOpiniones();
  
      res.send({
        status: 'ok',
        data: Opiniones,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const newOpinionesController = async (req, res, next) => {
    try {
      const { text } = req.body;
  
      if (!text || text.length > 280) {
        throw generateError(
          'El texto del tweet debe existir y ser menor de 280 caracteres',
          400
        );
      }
      let imageFileName;
  
      if (req.files && req.files.image) {
        // Creo el path del directorio uploads
        const uploadsDir = path.join(__dirname, '../uploads');
  
        // Creo el directorio si no existe
        await createPathIfNotExists(uploadsDir);
  
        // Procesar la imagen
        const image = sharp(req.files.image.data);
        image.resize(1000);
  
        // Guardo la imagen con un nombre aleatorio en el directorio uploads
        imageFileName = `${nanoid(24)}.jpg`;
  
        await image.toFile(path.join(uploadsDir, imageFileName));
      }
  
      const id = await createTweet(req.userId, text, imageFileName);
  
      res.send({
        status: 'ok',
        message: `Tweet con id: ${id} creado correctamente`,
      });
    } catch (error) {
      next(error);
    }
  };
  
  
  const deleteOpinionesController = async (req, res, next) => {
    try {
      //req.userId
      const { id } = req.params;
  
      // Conseguir la información del tweet que quiero borrar
      const tweet = await getTweetById(id);
  
      // Comprobar que el usuario del token es el mismo que creó el tweet
      if (req.userId !== tweet.user_id) {
        throw generateError(
          'Estás intentando borrar un tweet que no es tuyo',
          401
        );
      }
  
      // Borrar el tweet
      await deteleOpinionesById(id);
  
      res.send({
        status: 'ok',
        message: `El mensaje con id: ${id} fue borrado`,
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getOpinionesController,
    newOpinionesController,
    deleteOpinionesController,
  };