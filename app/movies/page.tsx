import { movieGenres, searchMovies } from "@/lib/movie-utils";
import { MovieCard, Movie } from "@/components/MovieCard";

const MoviesPage = async () => {
	const allMoviesPromises = movieGenres.map((genre) =>
		searchMovies(genre.name, 8)
	);

	const allMoviesResults = await Promise.all(allMoviesPromises);

	return (
		<div className="space-y-12 p-6">
			{movieGenres.map((genre, genreIndex) => (
				<section key={genre.id} className="space-y-6">
					<h2 className="text-2xl font-bold text-white capitalize">
						{genre.name}
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-6">
						{allMoviesResults[genreIndex]?.map((movie: Movie) => (
							<MovieCard
								movie={movie}
								key={movie.id || `movie-${genre.id}-${movie.title}`}
							/>
						))}
					</div>
				</section>
			))}
		</div>
	);
};

export default MoviesPage;
