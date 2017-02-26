/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    return res.view('homepage');
  },
  crearArtista: function (req, res) {
    return res.view('vistas/Artista/crearArtista');
  },
  error: function (req, res) {
    return res.view('vistas/Error', {
      error: {
        desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  },
  listarBorrarArtista: function (req, res) {

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
  },

  ActualizarArtista: function (req, res) {

    Artista.find()
      .exec(function (errorIndefinido, artistasEncontrados) {

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
          artistas: artistasEncontrados
        });
      })
  },

  editarArtista: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Artista.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, ArtistaEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              desripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ActualizarArtista"
            }
          });
        }
        if(ArtistaEncontrado){
          return res.view("vistas/Artista/editarArtista",{
            artistaAEditar:ArtistaEncontrado,
            inicioSesion:true
          });
        }else{
          return res.view('vistas/Error', {
            error: {
              desripcion: "El artista con id: "+parametros.id+" no existe.",
              rawError: "No existe el artista",
              url: "/ActualizarArtista"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/ActualizarArtista"
        }
      });

    }
  },

  crearAlbum: function (req, res) {
    return res.view('vistas/Album/crearAlbum');
  },

  listarBorrarAlbum: function (req, res) {

    Album.find()
      .exec(function (errorIndefinido, artistasEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              desripcion: "Hubo un problema cargando los Album",
              rawError: errorIndefinido,
              url: "/listarBorrarAlbum"
            }
          });
        }

        res.view('vistas/Album/listarBorrarAlbum', {
          artistas: artistasEncontrados
        });
      })
  }
};

