import { BookCard } from '@/components/BookCard';
import { Movie, MovieCard } from '@/components/MovieCard';
import { PaginationComponent } from '@/components/PaginationComponent';
import { Book, BooksResponse, searchBooksByGenre } from '@/lib/books-utils';
import { MoviesResponse, searchMovies } from '@/lib/movie-utils';
import React from 'react'

interface PageProps {
	params: Promise<{
		library: string;
	}>;
	searchParams: Promise<{
		page?: string;
	}>;
}

const Library = async ({ params, searchParams }: PageProps) => {
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const libraryParam = resolvedParams.library;

	const currentPage = parseInt(resolvedSearchParams.page || '1');
	const itemsPerPage = 24; 

	if (libraryParam === 'books') {
		// Solo obtener los géneros más populares
		const popularGenres = ['fiction', 'fantasy', 'romance', 'mystery', 'scifi'];
		const libraryPromises = popularGenres.map((genre) => searchBooksByGenre(genre, 8));
		const libraryResults: BooksResponse[] = await Promise.all(libraryPromises);

		// Combinar y eliminar duplicados
		const allBooks = libraryResults.flatMap(response => response.books);
		const uniqueBooks = allBooks.filter((book, index, self) =>
			index === self.findIndex(b => b.key === book.key)
		);

		// Ordenar por popularidad
		const popularBooks = uniqueBooks
			.sort((a, b) => (b.publishYear || 0) - (a.publishYear || 0))
			.slice(0, 48);

		// Calcular paginación
		const totalBooks = popularBooks.length;
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const paginatedBooks = popularBooks.slice(startIndex, endIndex);
		const hasMore = endIndex < totalBooks;

		return (
			<section className="w-fit space-y-9 m-auto">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-white capitalize">
						Libros Populares
					</h1>
					<p className="text-gray-400 mt-2">
						Descubre los libros más leídos y recomendados
					</p>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{paginatedBooks.map((book: Book, index: number) => (
						<BookCard
							book={book}
							key={book.key || `book-${book.title}-${startIndex + index}`}
						/>
					))}
				</div>

				{(hasMore || currentPage > 1) && (
					<PaginationComponent
						currentPage={currentPage}
						hasMore={hasMore}
						totalItems={totalBooks}
						itemsPerPage={itemsPerPage}
						library={libraryParam}
						genre="populares"
					/>
				)}
			</section>
		)
	} else if (libraryParam === 'movies') {
		// Géneros más populares para películas
		const popularGenres = ['acción', 'aventura', 'comedia', 'drama', 'ciencia ficción'];
		const libraryPromises = popularGenres.map((genre) => searchMovies(genre, 10, 1));
		const libraryResults: MoviesResponse[] = await Promise.all(libraryPromises);

		// Combinar y eliminar duplicados
		const allMovies = libraryResults.flatMap(response => response.movies);
		const uniqueMovies = allMovies.filter((movie, index, self) =>
			index === self.findIndex(m => m.id === movie.id)
		);

		// Ordenar por rating
		const trendingMovies = uniqueMovies
			.sort((a, b) => (b.rating || 0) - (a.rating || 0))
			.slice(0, 48);

		// Calcular paginación
		const totalMovies = trendingMovies.length;
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const paginatedMovies = trendingMovies.slice(startIndex, endIndex);
		const hasMore = endIndex < totalMovies;

		return (
			<section className="w-fit space-y-9 m-auto">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-white capitalize">
						Películas en tendencia
					</h2>
					<p className="text-gray-400 mt-2">
						Las películas mejor valoradas y populares del momento
					</p>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{paginatedMovies.map((movie: Movie, index: number) => (
						<MovieCard
							movie={movie}
							key={`movie-${movie.id}-${movie.title}-${startIndex + index}`}
						/>
					))}
				</div>

				{(hasMore || currentPage > 1) && (
					<PaginationComponent
						currentPage={currentPage}
						hasMore={hasMore}
						totalItems={totalMovies}
						itemsPerPage={itemsPerPage}
						library={libraryParam}
						genre="trending"
					/>
				)}
			</section>
		);
	}

	return (
		<section className="w-fit space-y-9 m-auto">
			<h1 className="text-3xl font-bold text-white">Biblioteca no encontrada</h1>
		</section>
	);
}

export default Library