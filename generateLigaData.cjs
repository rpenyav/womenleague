const {
  Types: { ObjectId },
} = require("mongoose");

const fs = require("fs");

const equipos = [
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aeb46",
    },
    formal_name: "FC Barcelona",
    slug: "fc_barcelona",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aeb5d",
    },
    formal_name: "Real Madrid",
    slug: "real_madrid",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aeb74",
    },
    formal_name: "Atlético de Madrid",
    slug: "atletico_madrid",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aeb8b",
    },
    formal_name: "Alhama CF",
    slug: "alhama_cf",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aeb8f",
    },
    formal_name: "Athletic Club",
    slug: "athletic_club",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aeba9",
    },
    formal_name: "Sevilla CF",
    slug: "sevilla_cf",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aebbc",
    },
    formal_name: "Deportivo Alavés",
    slug: "deportivo_alaves",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aebc0",
    },
    formal_name: "SD Eibar",
    slug: "sd_eibar",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aebda",
    },
    formal_name: "Granada CF",
    slug: "granada_cf",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aebf3",
    },
    formal_name: "Levante Las Planas",
    slug: "levante_las_planas",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec11",
    },
    formal_name: "Levante",
    slug: "levante_ud",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec16",
    },
    formal_name: "Madrid CF",
    slug: "madrid_cf",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec1a",
    },
    formal_name: "Real Betis",
    slug: "real_betis",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec1e",
    },
    formal_name: "Real Sociedad.",
    slug: "real_sociedad",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec22",
    },
    formal_name: "Sporting Huelva",
    slug: "sporting_huelva",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec26",
    },
    formal_name: "UDG Tenerife",
    slug: "udg_tenerife",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec2a",
    },
    formal_name: "Valencia CF",
    slug: "valencia_cf",
  },
  {
    _id: {
      $oid: "64e66cc57c07ee7e5c0aec2e",
    },
    formal_name: "Villarreal CF",
    slug: "villarreal_cf",
  },
];

// Generador de fechas aleatorias para la temporada
function generarFecha() {
  const start = new Date(2024, 0, 1);
  const end = new Date(2024, 11, 31);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Generar estado aleatorio para el equipo
function generarEstado() {
  const estados = ["malo", "bueno", "muy bueno"];
  return estados[Math.floor(Math.random() * estados.length)];
}

// Generar hora aleatoria para el partido
function generarHora() {
  const horas = ["15:00", "18:00", "21:00", "22:00"];
  return horas[Math.floor(Math.random() * horas.length)];
}

// Crear partidos
const partidos = [];

for (let i = 0; i < equipos.length; i++) {
  for (let j = i + 1; j < equipos.length; j++) {
    partidos.push({
      _id: new ObjectId(),
      fecha: generarFecha(),
      hora: generarHora(),
      disputado: false,
      local: {
        equipo: equipos[i]._id.$oid,
        estado: generarEstado(),
      },
      visitante: {
        equipo: equipos[j]._id.$oid,
        estado: generarEstado(),
      },
    });
  }
}

const usuariosEquipos = [
  { usuarioId: "usuario1", equipoId: "equipo1" },
  { usuarioId: "usuario2", equipoId: "equipo2" },
  // ... añade más aquí
];

// Crear liga
const liga = {
  nombreDeLaLiga: "Liga Ejemplo",
  temporada: "2024",
  partidos,
  usuariosEquipos,
};

// Guardar en archivo JSON
fs.writeFileSync("partidos.json", JSON.stringify(liga, null, 2));
