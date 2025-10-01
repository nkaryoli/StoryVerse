# StoryVerse 📚🎬

Una aplicación web moderna para explorar, filtrar y descubrir libros y películas. Desarrollada con Next.js 14, TypeScript y Tailwind CSS.

![StoryVerse](https://img.shields.io/badge/StoryVerse-Platform-purple) 
![Next.js](https://img.shields.io/badge/Next.js-14-black) 
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-orange)

## ✨ Características

### 📖 Sección Libros
- **🏷️ Explorar por Categorías**: Fantasía, Ciencia Ficción, Clásicos, Romance, Misterio, Terror y más
- **🔍 Búsqueda Inteligente**: Encuentra libros por título, autor o categoría
- **📊 Filtros Avanzados**: Filtra por año, autor, género y más
- **🖼️ Portadas HD**: Integración con Open Library API
- **🎨 Diseño Moderno**: Interfaz con gradientes neón y tarjetas interactivas

### 🎬 Sección Películas (Próximamente)
- **🎭 Catálogo Completo**: Películas populares y clásicos
- **🎯 Filtros por Género**: Acción, Drama, Comedia, Ciencia Ficción, etc.
- **⭐ Sistema de Rating**: Filtra por calificación y popularidad
- **🎞️ Multimedia**: Tráilers, imágenes y información detallada

### 🔧 Sistema de Filtrado
- **✅ Filtros Múltiples**: Combina categorías simultáneamente
- **⚡ Búsqueda en Tiempo Real**: Resultados instantáneos
- **📅 Filtros por Fecha**: Rango de años personalizable
- **🔠 Ordenamiento Flexible**: Por título, año, relevancia

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **APIs**: 
  - 📚 Open Library Books API
  - 🎬 The Movie DB (TMDB) - Próximamente
- **Deploy**: Vercel

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/storyverse.git

# Entrar al directorio
cd storyverse

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install

# Ejecutar en modo desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev
```

## 📁 Estructura del Proyecto
```bash
storyverse/
├── app/
│   ├── books/
│   │   └── page.tsx          # Página principal de libros
│   ├── movies/
│   │   └── page.tsx          # Página de películas
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── background-gradient.tsx # Componente de gradientes neón
│   ├── book-card.tsx         # Tarjeta reusable de libro
│   ├── filters/
│   │   ├── category-filter.tsx
│   │   └── search-filter.tsx
│   └── ui/                   # Componentes UI reusables
├── types/
│   └── books.ts              # Definiciones TypeScript
├── lib/
│   ├── utils.ts              # Funciones utilitarias
│   └── api.ts                # Cliente de APIs
└── public/
```

## 🎯 Cómo Usar

### Explorar Libros
1. Navega a la sección "Libros"

2. Explora las categorías predefinidas

3. Usa la búsqueda para encontrar títulos específicos

4. Aplica filtros por género, año o autor

5. Haz clic en cualquier libro para ver detalles

### Ejemplo de Filtrado
```bash
// Filtros disponibles
const activeFilters = {
  category: 'fantasy',        // Género literario
  yearRange: [2010, 2023],    // Rango de años
  author: 'J.K. Rowling',     // Autor específico
  searchQuery: 'harry',       // Búsqueda textual
  sortBy: 'year-desc'         // Ordenar por año descendente
}
````

## 🔌 APIs Integradas

###📚 Open Library API
- Información completa de libros

- Portadas de alta calidad

- Metadatos de autores y publicaciones

- Búsqueda avanzada por múltiples criterios

### 🎬 The Movie DB (TMDB) - Próximamente

- Catálogo completo de películas

- Información de reparto y crew

- Imágenes y tráilers

- Ratings y reviews

## 🎨 Personalización

### Temas de Gradientes

```bash 
tsx
<BackgroundGradient variant="green">  // Verde neón cyberpunk
<BackgroundGradient variant="blue">   // Azul eléctrico futurista
<BackgroundGradient variant="purple"> // Púrpura místico - Próximamente
```

### Añadir Nuevas Categorías
```bash
typescript
const customCategories = [
  "Realismo Mágico",
  "Novela Gráfica", 
  "Distopías",
  "Cyberpunk",
  "Fantasía Urbana"
];
````

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. 🍴 Haz fork del proyecto

2. 🌿 Crea una rama: git checkout -b feature/nueva-feature

3. 💾 Commit tus cambios: git commit -m 'Add nueva feature'

4. 📤 Push a la rama: git push origin feature/nueva-feature

5. 🔀 Abre un Pull Request


## 📋 Roadmap
### 🟢 Implementado
- Sección de libros con Open Library API

- Diseño responsive con gradientes neón

- Sistema básico de filtros por categoría

- Componentes TypeScript tipados

### 🟡 En Progreso
- Sistema de filtros avanzados

- Búsqueda en tiempo real

- Página de detalles de libros

### 🟠 Próximamente
- Sección de películas con TMDB API

- Sistema de favoritos y listas

- Modo oscuro/claro

- Recomendaciones personalizadas

- User accounts y perfiles

- App móvil nativa


## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## 👨‍💻 Autor

Karyoli Nieves

GitHub: @nkaryoli

Portfolio: [karyoliNieves.com](https://nkaryoli.github.io/miPortfolio/)

LinkedIn: [KaryoliNieves](https://www.linkedin.com/in/karyoli-nieves/)


## 📞 Contacto

📧 Email: karyoli.ie@gmail.com

⭐ ¿Te gusta StoryVerse? ¡Dale una estrella en GitHub!

📚🎬 Explora Universos de Historias en StoryVerse

