import { Movie } from "../components/MovieCard";

// Interfaces para las respuestas de TMDB
interface TMDBMovie {
	id: number;
	title: string;
	overview: string;
	release_date: string;
	vote_average: number;
	poster_path: string | null;
	backdrop_path: string | null;
	genre_ids: number[];
	popularity: number;
	vote_count: number;
}

interface TMDBSearchResponse {
	page: number;
	results: TMDBMovie[];
	total_pages: number;
	total_results: number;
}

interface TMDBDiscoverResponse {
	page: number;
	results: TMDBMovie[];
	total_pages: number;
	total_results: number;
}

export interface MoviesResponse {
	movies: Movie[];
	currentPage: number;
	hasMore: boolean;
	totalMovies: number;
	totalPages: number;
}

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

export async function searchMovies(
	genreName: string,
	limit: number = 20,
	page: number = 1
): Promise<MoviesResponse> {
	if (!TMDB_API_KEY) {
		console.warn("TMDB_API_KEY no configurada, usando datos mock");
		return getMockMovies(genreName, limit, page);
	}

	try {
		// Primero, buscar el ID del género por nombre
		const genre = movieGenres.find(g => 
			g.name.toLowerCase() === genreName.toLowerCase() ||
			genreName.toLowerCase().includes(g.name.toLowerCase())
		);

		let response: Response;
		
		if (genre) {
			// Si encontramos el género, usar discover para mejores resultados
			response = await fetch(
				`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre.id}&language=es-ES&sort_by=popularity.desc&page=${page}`,
				{ cache: 'no-store' }
			);
		} else {
			// Si no encontramos el género, buscar por nombre
			response = await fetch(
				`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
					genreName
				)}&language=es-ES&page=${page}`,
				{ cache: 'no-store' }
			);
		}

		if (!response.ok) throw new Error("TMDB API error");

		const data: TMDBDiscoverResponse | TMDBSearchResponse = await response.json();
		const movies = data.results.slice(0, limit).map(
			(movie: TMDBMovie): Movie => ({
				id: movie.id,
				title: movie.title,
				overview: movie.overview,
				releaseDate: movie.release_date,
				rating: movie.vote_average,
				poster: movie.poster_path
					? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					: null,
			})
		);

		return {
			movies,
			currentPage: page,
			hasMore: page < data.total_pages,
			totalMovies: data.total_results,
			totalPages: data.total_pages
		};
	} catch (error) {
		console.error("Error fetching movies:", error);
		return getMockMovies(genreName, limit, page);
	}
}

export async function getMoviesByGenre(
	genreId: number,
	limit: number = 10,
	page: number = 1
): Promise<MoviesResponse> {
	if (!TMDB_API_KEY) {
		console.warn("TMDB_API_KEY no configurada, usando datos mock");
		return getMockMovies("general", limit, page);
	}

	try {
		const response = await fetch(
			`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=es-ES&sort_by=popularity.desc&page=${page}`,
			{ cache: 'no-store' }
		);

		if (!response.ok) throw new Error("TMDB API error");

		const data: TMDBDiscoverResponse = await response.json();

		const movies = data.results.slice(0, limit).map(
			(movie: TMDBMovie): Movie => ({
				id: movie.id,
				title: movie.title,
				overview: movie.overview,
				releaseDate: movie.release_date,
				rating: movie.vote_average,
				poster: movie.poster_path
					? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					: null,
			})
		);

		return {
			movies,
			currentPage: page,
			hasMore: page < data.total_pages,
			totalMovies: data.total_results,
			totalPages: data.total_pages
		};
	} catch (error) {
		console.error("Error fetching movies by genre:", error);
		return getMockMovies("general", limit, page);
	}
}

function getMockMovies(genre: string, limit: number, page: number = 1): MoviesResponse {
	const allMockMovies: Movie[] = [
		{
			id: 1,
			title: "El Padrino",
			overview: "Crónica de una familia mafiosa italiana...",
			releaseDate: "1972-03-14",
			rating: 8.7,
			poster: null,
		},
		{
			id: 2,
			title: "Pulp Fiction",
			overview: "Historias interconectadas de criminales en Los Ángeles...",
			releaseDate: "1994-10-14",
			rating: 8.9,
			poster: null,
		},
		{
			id: 3,
			title: "Forrest Gump",
			overview: "La vida de Forrest Gump...",
			releaseDate: "1994-07-06",
			rating: 8.8,
			poster: null,
		},
		{
			id: 4,
			title: "El Señor de los Anillos: La Comunidad del Anillo",
			overview: "Una épica aventura en la Tierra Media...",
			releaseDate: "2001-12-19",
			rating: 8.9,
			poster: null,
		},
		{
			id: 5,
			title: "Matrix",
			overview: "Un hacker descubre la verdad sobre la realidad...",
			releaseDate: "1999-03-31",
			rating: 8.7,
			poster: null,
		},
		{
			id: 6,
			title: "Interestelar",
			overview: "Un grupo de exploradores viaja a través de un agujero de gusano...",
			releaseDate: "2014-11-07",
			rating: 8.6,
			poster: null,
		},
		{
			id: 7,
			title: "El Caballero de la Noche",
			overview: "Batman se enfrenta al Joker...",
			releaseDate: "2008-07-18",
			rating: 9.0,
			poster: null,
		},
		{
			id: 8,
			title: "Inception",
			overview: "Un ladrón que roba secretos del subconsciente...",
			releaseDate: "2010-07-16",
			rating: 8.8,
			poster: null,
		},
		// Agrega más películas mock según necesites
	];

	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const movies = allMockMovies.slice(startIndex, endIndex);

	return {
		movies,
		currentPage: page,
		hasMore: endIndex < allMockMovies.length,
		totalMovies: allMockMovies.length,
		totalPages: Math.ceil(allMockMovies.length / limit)
	};
}


export interface MovieGenre {
	id: number;
	name: string;
}

export const movieGenres: MovieGenre[] = [
	{ id: 28, name: "Acción" },
	{ id: 12, name: "Aventura" },
	{ id: 16, name: "Animación" },
	{ id: 35, name: "Comedia" },
	{ id: 80, name: "Crimen" },
	{ id: 18, name: "Drama" },
	{ id: 14, name: "Fantasía" },
	{ id: 27, name: "Terror" },
	{ id: 10749, name: "Romance" },
	{ id: 878, name: "Ciencia Ficción" },
];

export type FilterItem = {
	name: string;
	url: string;
	icon?: string; 
};

export const movieFilters: FilterItem[] = [
	{ name: "Todos", url: "/movies", icon: "List" },
	{ name: "Acción", url: "/movies/accion", icon: "Sparkles" },
	{ name: "Aventura", url: "/movies/aventura", icon: "BookOpen" },
	{ name: "Animacion", url: "/movies/animacion", icon: "Rocket" },
	{ name: "Comedia", url: "/movies/comedia", icon: "HatGlasses" },
	{ name: "Crimen", url: "/movies/crimen", icon: "Heart" },
	{ name: "Drama", url: "/movies/drama", icon: "Calendar" },
	{ name: "Fantasia", url: "/movies/fantasia", icon: "UserCircle" },
	{ name: "Terror", url: "/movies/terror", icon: "UserCircle" },
	{ name: "Romance", url: "/movies/romance", icon: "UserCircle" },
	{ name: "Ciencia Ficción", url: "/movies/ciencia-ficcion", icon: "UserCircle" },
];