import { BookCard } from '@/components/BookCard';
import { Movie, MovieCard } from '@/components/MovieCard';
import { Book, searchBooks } from '@/lib/books-utils';
import { searchMovies } from '@/lib/movie-utils';
import React from 'react'

interface PageProps {
	params: Promise<{
		library: string;
		genre: string;
	}>;
}

const Category = async ({ params }: PageProps) => {
	const resolvedParams = await params;
	const { library, genre } = resolvedParams;

	console.log('🔍 [CATEGORY PAGE] Params:', { library, genre });
	
	if (library === 'books') {
		const books = await searchBooks(genre, 18);

		return (
			<section className="w-fit space-y-9 m-auto">
				<h1 className="text-3xl font-bold text-white capitalize">
					{genre}
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{books.map((info: Book) => (
						<BookCard book={info} key={`${info.title}-${info.author}-${Math.random()}`}  />
					))}
				</div>
			</section>
		)
	} else if (library === 'movies') {
		const movies = await searchMovies(genre, 18);
		return (
			<section className="w-fit space-y-9 m-auto">
				<h2 className="text-2xl font-bold text-white capitalize">
					{genre} 
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{movies.map((movie: Movie) => (
						<MovieCard movie={movie} key={movie.id} />
					))}
				</div>
			</section>
		);
	}
	return (
		<section className="w-fit space-y-9 m-auto">
			<h1 className="text-3xl font-bold text-white">Categoría no encontrada</h1>
		</section>
	);
}

export default Category