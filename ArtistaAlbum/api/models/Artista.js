/**
 * Artista.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true
    },
    estilo: {
      type: 'string',
      required: true
    },
    paisResidencia: {
      type: 'string',
      required: true
    },

    albumes: {
      // Collection -> Nombre del Modelo en Sails
      collection: 'Album',
      // Via-> Es el campo por el cual vamos a relacionar FOREIGN KEY
      via: 'idArtista'
    }
  }
};

