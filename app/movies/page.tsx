import { movieGenres, searchMovies } from "@/lib/movie-utils";
import { MovieCard, Movie } from "@/components/MovieCard";

const MoviesPage = async () => {
	const allMoviesPromises = movieGenres.map((genre) =>
		searchMovies(genre.name, 8)
	);

	const allMoviesResults = await Promise.all(allMoviesPromises);

	const allMovies = allMoviesResults.flat();
	const shuffledMovies = [...allMovies].sort(() => Math.random() - 0.5);

	return (
    <section className="w-fit space-y-9 m-auto">
				<h2 className="text-2xl font-bold text-white capitalize">
					Todas las Películas
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{shuffledMovies.map((movie: Movie) => (
						<MovieCard
							movie={movie}
							key={movie.id || `movie-${movie.title}`}
						/>
					))}
				</div>
			</section>

	);
};

export default MoviesPage;
