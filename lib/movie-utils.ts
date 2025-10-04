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

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

export async function searchMovies(
	genreName: string,
	limit: number = 8
): Promise<Movie[]> {
	if (!TMDB_API_KEY) {
		console.warn("TMDB_API_KEY no configurada, usando datos mock");
		return getMockMovies(genreName, limit);
	}

	try {
		const response = await fetch(
			`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
				genreName
			)}&language=es-ES&page=1`
		);

		if (!response.ok) throw new Error("TMDB API error");

		const data: TMDBSearchResponse = await response.json();

		return data.results.slice(0, limit).map(
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
	} catch (error) {
		console.error("Error fetching movies:", error);
		return getMockMovies(genreName, limit);
	}
}

export async function getMoviesByGenre(
	genreId: number,
	limit: number = 10
): Promise<Movie[]> {
	if (!TMDB_API_KEY) {
		console.warn("TMDB_API_KEY no configurada, usando datos mock");
		return getMockMovies("general", limit);
	}

	try {
		const response = await fetch(
			`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=es-ES&sort_by=popularity.desc&page=1`
		);

		if (!response.ok) throw new Error("TMDB API error");

		const data: TMDBDiscoverResponse = await response.json();

		return data.results.slice(0, limit).map(
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
	} catch (error) {
		console.error("Error fetching movies by genre:", error);
		return getMockMovies("general", limit);
	}
}

function getMockMovies(genre: string, limit: number): Movie[] {
	const fallbackMovies: Movie[] = [
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
			title: "El Señor de los Anillos",
			overview: "Una épica aventura en la Tierra Media...",
			releaseDate: "2001-12-19",
			rating: 8.9,
			poster: null,
		},
	];

	return fallbackMovies.slice(0, limit);
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