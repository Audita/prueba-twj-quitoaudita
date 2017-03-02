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
  listarArtista: function (req, res) {

    Artista.find()
      .exec(function (errorIndefinido, artistasEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              desripcion: "Hubo un problema cargando los Artistas",
              rawError: errorIndefinido,
              url: "/listarArtista"
            }
          });
        }

        res.view('vistas/Artista/listarArtista', {
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
              url: "/listarArtista"
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
              url: "/listarArtista"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          desripcion: "No ha enviado el parametro ID",
          rawError: "Faltan Parametros",
          url: "/listarArtista"
        }
      });

    }
  },
  crearAlbum: function (req, res) {
    Artista.find().exec(function (error, artistaEncontrados) {
      if (error) return res.serverError();
      return res.view('vistas/Album/crearAlbum', {
        title: 'Crear Album',
        artistas: artistaEncontrados
      });
    });
  },
  listarAlbum: function (req, res) {

    Album.find()
      .exec(function (errorIndefinido, albumesEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              desripcion: "Hubo un problema cargando los Album",
              rawError: errorIndefinido,
              url: "/listarAlbum"
            }
          });
        }

        res.view('vistas/Album/listarAlbum', {
          albumes: albumesEncontrados
        });
      })
  },
  editarAlbum: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Album.findOne({
        id: parametros.id
      }).exec(function (error, albumEncontrado) {
        if (error) return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'Fallo al buscar el album',
            url: '/listarAlbum'
          }
        });


        Artista.find().exec(function (error, artistasEncontrados) {
          if (error) return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'Fallo al buscar la el album',
              url: '/listarAlbum'
            }
          });

          return res.view('vistas/Album/editarAlbum', {
            title: 'Editar Album - ' + albumEncontrado.nombre,
            albumAEditar: albumEncontrado,
            artistas: artistasEncontrados
          })
        });

      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID'
        }
      });
    }
  }
};

