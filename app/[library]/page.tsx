import { BookCard } from '@/components/BookCard';
import { Movie, MovieCard } from '@/components/MovieCard';
import { Book, booksGenres, searchBooks } from '@/lib/books-utils';
import { movieGenres, searchMovies } from '@/lib/movie-utils';
import React from 'react'

interface PageProps {
	params: Promise<{
		library: string;
	}>;
}

const Library = async ({ params }: PageProps) => {
	const resolvedParams = await params;
	const libraryParam = resolvedParams.library;
	
	if (libraryParam === 'books') {

		const libraryPromises = booksGenres.map((genre) => searchBooks(genre, 5));
		const libraryResults = await Promise.all(libraryPromises);

		const books = libraryResults.flat();
		const completeLibrary = [...books].sort(() => Math.random() -0.5);

		return (
			<section className="w-fit space-y-9 m-auto">
			<h1 className="text-3xl font-bold text-white capitalize">Todos los Libros</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
				{completeLibrary.map((book: Book, index: number) => (
					<BookCard
						book={book}
						key={index}
					/>
				))}
			</div>
		</section>
		)
	} else if (libraryParam === 'movies') {
		
		const libraryPromises = movieGenres.map((genre) => searchMovies(genre.name, 5));
		const libraryResults = await Promise.all(libraryPromises);

		const movies = libraryResults.flat();
		const completeLibrary = [...movies].sort(() => Math.random() -0.5);

		return (
			<section className="w-fit space-y-9 m-auto">
				<h2 className="text-2xl font-bold text-white capitalize">
					Todas las Películas
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{completeLibrary.map((movie: Movie) => (
						<MovieCard
							movie={movie}
							key={movie.id || `movie-${movie.title}`}
						/>
					))}
				</div>
			</section>
		);
	}

}

export default Library