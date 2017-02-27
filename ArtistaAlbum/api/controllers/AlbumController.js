/**
 * AlbumController
 *
 * @description :: Server-side logic for managing Albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearAlbum: function (req, res) {
    var parametros = req.allParams();

    if (req.method == 'POST') {
      if (parametros.nombre && parametros.fechaLanzamiento && parametros.URLPortada && parametros.idArtista) {
        Album.create({
          nombre: parametros.nombre,
          fechaLanzamiento: parametros.fechaNacimiento,
          URLPortada: parametros.paisNacimiento,
          idArtista: parametros.idArtista
        }).exec(function (error, albumCreado) {
          if (error) return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'Hubo Problemas creando el album, intentalo de nuevo: ' + error,
              url: '/crearAlbum'
            }
          });

          Album.find().exec(function (error, albumEncontrados) {
            if (error) return res.serverError()
            sails.log.info(mascotasEncontrados);
            return res.view('vistas/Mascota/listarAlbum', {
              title: 'Lista de Albumes',
              albumes: albumEncontrados
            })
          });

        });
      } else {
        // bad Request
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envia todos los parametros',
            url: '/crearAlbum'
          }
        });
      }
    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearAlbum'
        }
      });
    }

  }


};

