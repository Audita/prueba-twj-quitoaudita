/**
 * ArtistaController
 *
 * @description :: Server-side logic for managing Artistas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearArtista: function(req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();
      if(parametros.nombre && parametros.estilo && parametros.paisResidencia){
        var artistaCrear = {
          nombre: parametros.nombre,
          estilo: parametros.estilo,
          paisResidencia: parametros.paisResidencia
        }
        Artista.create(artistaCrear).exec(function (err, artistaCrear) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                desripcion: "Fallo al crear el Artista",
                rawError: err,
                url: "/crearArtista"
              }

            });
          }

          Artista.find()
            .exec(function (errorIndefinido, artistasEncontrados) {
              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Usuarios",
                    rawError: errorIndefinido,
                    url: "/listarBorrarArtista"
                  }
                });
              }

              res.view('vistas/Artista/listarBorrarArtista', {
                artistas: artistasEncontrados
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            desripcion: "Llena todos los parametros",
            rawError: "Fallo en envio de parametros",
            url: "/crearArtista"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/crearArtista"
        }
      });

    }

  },
  BorrarArtista: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Artista.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, ArtistaRemovido) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/listarBorrarArtista"
            }
          });
        }
        Artista.find()
          .exec(function (errorIndefinido, artistasEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  desripcion: "Hubo un problema cargando los Artistas",
                  rawError: errorIndefinido,
                  url: "/listarBorrarArtista"
                }
              });
            }

            res.view('vistas/Artista/listarBorrarArtista', {
              artistas: artistasEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Usuario",
          rawError: "No envia ID",
          url: "/listarBorrarArtista"
        }
      });
    }
  },

  editarArtista: function (req, res) {

    var parametros = req.allParams();

    if (parametros.idArtista && (parametros.nombre || parametros.estilo || parametros.paisResidencia)) {

      var artistaAEditar = {
        nombre: parametros.nombre,
        estilo: parametros.estilo,
        paisResidencia: parametros.paisResidencia
      }

      if (artistaAEditar.nombre == "") {
        delete artistaAEditar.nombre
      }
      if (artistaAEditar.estilo== "") {
        delete artistaAEditar.estilo
      }
      if (artistaAEditar.paisResidencia == "") {
        delete artistaAEditar.paisResidencia
      }


      Artista.update({
        id: parametros.idArtista
      }, artistaAEditar)
        .exec(function (errorInesperado, ArtistaRemovido) {
          if (errorInesperado) {
            return res.view('vistas/Error', {
              error: {
                desripcion: "Tuvimos un Error Inesperado",
                rawError: errorInesperado,
                url: "/ActualizarArtista"
              }
            });
          }

          Artista.find()
            .exec(function (errorIndefinido,ArtistaEncontrado) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Artistas",
                    rawError: errorIndefinido,
                    url: "/ActualizarArtista"
                  }
                });
              }

              res.view('vistas/Artista/ActualizarArtista', {
                artistas: ArtistaEncontrado
              });
            })

        })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos que envies el ID y el nombre, estilo o pais de residencia",
          rawError: "No envia Parametros",
          url: "/ActualizarArtista"
        }
      });
    }



  }



      };

