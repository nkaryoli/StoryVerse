export const popularCategories = [
  "Ficción",
  "No Ficción", 
  "Ciencia Ficción",
  "Fantasía",
  "Misterio",
  "Romance",
  "Terror",
  "Young Adult",
  "Biografía",
  "Historia",
  "Ciencia",
  "Tecnología",
  "Autoayuda",
  "Negocios",
  "Arte",
  "Filosofía",
  "Poesía",
  "Teatro",
  "Viajes",
  "Cocina"
];


export const bookCategories = {
  // Géneros literarios
  fiction: {
    name: "Ficción Literaria",
    query: "subject:fiction",
    description: "Novelas y obras de ficción contemporánea"
  },
  scifi: {
    name: "Ciencia Ficción",
    query: "subject:science_fiction",
    description: "Viajes espaciales, futuros distópicos y tecnología avanzada"
  },
  fantasy: {
    name: "Fantasía Épica", 
    query: "subject:fantasy",
    description: "Magia, mundos imaginarios y criaturas fantásticas"
  },
  mystery: {
    name: "Misterio y Thriller",
    query: "subject:mystery",
    description: "Suspenso, crímenes y investigaciones"
  },
  romance: {
    name: "Romance",
    query: "subject:romance", 
    description: "Historias de amor y relaciones"
  },
  horror: {
    name: "Terror y Horror",
    query: "subject:horror",
    description: "Miedo, sobrenatural y psicológico"
  },
  
  // No ficción
  biography: {
    name: "Biografías",
    query: "subject:biography",
    description: "Vidas de personas reales e históricas"
  },
  history: {
    name: "Historia Mundial",
    query: "subject:history",
    description: "Eventos históricos y civilizaciones"
  },
  science: {
    name: "Ciencia Popular",
    query: "subject:science",
    description: "Divulgación científica y descubrimientos"
  },
  technology: {
    name: "Tecnología",
    query: "subject:technology",
    description: "Innovación, programación y futuro digital"
  },
  business: {
    name: "Negocios y Economía",
    query: "subject:business",
    description: "Emprendimiento, finanzas y management"
  },
  selfhelp: {
    name: "Desarrollo Personal",
    query: "subject:self_help",
    description: "Crecimiento personal y profesional"
  },
  
  // Literatura clásica
  classics: {
    name: "Clásicos Literarios",
    query: "subject:classics",
    description: "Obras maestras de la literatura universal"
  },
  poetry: {
    name: "Poesía",
    query: "subject:poetry",
    description: "Versos y expresión poética"
  },
  drama: {
    name: "Teatro y Drama",
    query: "subject:drama",
    description: "Obras teatrales y guiones"
  },
  
  // Géneros modernos
  graphicNovels: {
    name: "Novelas Gráficas",
    query: "subject:graphic_novels",
    description: "Cómics y narrativa visual"
  },
  youngAdult: {
    name: "Young Adult",
    query: "subject:young_adult", 
    description: "Literatura para adolescentes y jóvenes"
  },
  children: {
    name: "Libros Infantiles",
    query: "subject:children",
    description: "Libros para niños y educación"
  }
};

export const literaryMovements = {
  renaissance: {
    name: "Renacimiento",
    query: "renaissance literature",
    period: "Siglos XV-XVI"
  },
  romanticism: {
    name: "Romanticismo", 
    query: "romanticism literature",
    period: "Siglo XIX"
  },
  realism: {
    name: "Realismo",
    query: "realism literature", 
    period: "Siglo XIX"
  },
  modernism: {
    name: "Modernismo",
    query: "modernist literature",
    period: "Siglo XX"
  },
  postmodernism: {
    name: "Posmodernismo",
    query: "postmodern literature", 
    period: "Siglo XX-XXI"
  },
  magicalRealism: {
    name: "Realismo Mágico",
    query: "magical realism",
    period: "Siglo XX"
  }
};

export const awardWinning = {
  nobel: {
    name: "Premio Nobel",
    query: "nobel prize literature",
    description: "Ganadores del Nobel de Literatura"
  },
  pulitzer: {
    name: "Premio Pulitzer", 
    query: "pulitzer prize",
    description: "Ganadores del Pulitzer de Ficción"
  },
  booker: {
    name: "Booker Prize",
    query: "booker prize",
    description: "Premio literario británico"
  },
  hugo: {
    name: "Premio Hugo",
    query: "hugo award",
    description: "Mejor ciencia ficción y fantasía"
  },
  nebula: {
    name: "Premio Nebula",
    query: "nebula award", 
    description: "Ciencia ficción y fantasía"
  }
};

