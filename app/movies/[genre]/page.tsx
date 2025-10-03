import { Movie, MovieCard } from "@/components/MovieCard";
import { searchMovies } from "@/lib/movie-utils";

interface PageProps {
  params: Promise<{
    genre: string;
  }>;
}

const BooksByGenre = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const movies = await searchMovies(resolvedParams.genre, 18);

  return (
    <section className="w-fit space-y-6 m-auto">
      <h2 className="text-2xl font-bold text-white capitalize">
        {resolvedParams.genre} Books
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
};

export default BooksByGenre;
