/**
 * AlbumController
 *
 * @description :: Server-side logic for managing Albums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearAlbum: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros );
    if (req.method == 'POST') {
      if (parametros.nombre && parametros.fechaLanzamiento && parametros.URLPortada && parametros.idArtista) {
        Album.create({
          nombre: parametros.nombre,
          fechaLanzamiento: parametros.fechaLanzamiento,
          URLPortada: parametros.URLPortada,
          idArtista: parametros.idArtista
        }).exec(function (error, albumCreado) {
          if (error) return res.view('vistas/Error', {
            title: 'Error',
            error: {
              descripcion: 'Hubo Problemas creando el album, intentalo de nuevo: ' + error,
              url: '/listarAlbum'
            }
          });

          Album.find().exec(function (error, albumEncontrados) {
            if (error) return res.serverError()
            return res.view('vistas/Album/listarAlbum', {
              title: 'Lista de Albumes',
              albumes: albumEncontrados
            })
          });

        });
      } else {
        // bad Request
        return res.view('vistas/Error', {
          title: 'Error',
          error: {
            desripcion: "Llena todos los parametros",
            rawError: "Fallo en envio de parametros",
            url: '/crearAlbum'
          }
        });
      }
    } else {
      return res.view('vistas/Error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearAlbum'
        }
      });
    }

  },
  BorrarAlbum: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Album.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, AlbumRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/listarAlbum"
            }
          });
        }
        Album.find()
          .exec(function (errorIndefinido, albumesEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los Artistas",
                  rawError: errorIndefinido,
                  url: "/listarAlbum"
                }
              });
            }

            res.view('vistas/Album/listarAlbum', {
              albumes: albumesEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al album",
          rawError: "No envia ID",
          url: "/listarAlbum"
        }
      });
    }
  },
  editarAlbum: function (req, res) {

    var parametros = req.allParams();
    console.log(parametros );
    if (parametros.idArtista && (parametros.nombre || parametros.fechaLanzamiento || parametros.URLPortada)){
      console.log(parametros );
      var albumAEditar = {
        nombre: parametros.nombre,
        fechaLanzamiento: parametros.fechaLanzamiento,
        URLPortada: parametros.URLPortada,
        idArtista:parametros.idArtista
      }

      if (albumAEditar.nombre == "") {
        delete albumAEditar.nombre
      }
      if (albumAEditar.fechaLanzamiento== "") {
        delete albumAEditar.fechaLanzamiento
      }
      if (albumAEditar.URLPortada == "") {
        delete albumAEditar.URLPortada
      }
      console.log(parametros );
      Album.update({
        id: parametros.idAlbum
      }, albumAEditar)
        .exec(function (errorInesperado, AlbumRemovido) {
          if (errorInesperado) {
            return res.view('vistas/Error', {
              error: {
                desripcion: "Tuvimos un Error Inesperado",
                rawError: errorInesperado,
                url: "/listarAlbum"
              }
            });
          }

          Album.find()
            .exec(function (errorIndefinido,AlbumEncontrado) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Albumes",
                    rawError: errorIndefinido,
                    url: "/listarAlbum"
                  }
                });
              }

              res.view('vistas/Album/listarAlbum', {
                albumes: AlbumEncontrado
              });
            })

        })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies el ID y el nombre, fecha",
          rawError: "No envia Parametros",
          url: "/listarAlbum"
        }
      });
    }

  }
};

