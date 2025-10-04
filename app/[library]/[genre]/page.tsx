import { BookCard } from '@/components/BookCard';
import { Movie, MovieCard } from '@/components/MovieCard';
import { Book, BooksResponse, searchBooksByGenre, translateGenre } from '@/lib/books-utils';
import { PaginationComponent } from '@/components/PaginationComponent';
import { searchMovies } from '@/lib/movie-utils';
import React from 'react'

interface PageProps {
	params: Promise<{
		library: string;
		genre: string;
	}>;
	searchParams: Promise<{
		page?: string;
	}>;
}

const Category = async ({ params, searchParams }: PageProps) => {
	const resolvedParams = await params;
	const resolvedSearchParams = await searchParams;
	const { library, genre } = resolvedParams;

	const currentPage = parseInt(resolvedSearchParams.page || '1');

	console.log('🔄 [CATEGORY] Renderizando página:', { library, genre, currentPage });

	if (library === 'books') {
		// Obtener libros con paginación
		const result: BooksResponse = await searchBooksByGenre(genre, 24, currentPage); // 24 libros por página
		const { books, hasMore, totalBooks } = result;

		console.log('📚 [CATEGORY] Datos recibidos:', {
			pagina: currentPage,
			librosRecibidos: books.length,
			primerosTitulos: books.slice(0, 3).map(b => b.title),
			hasMore,
			totalBooks
		});
		
		const translatedGenre = translateGenre(genre);

		return (
			<section className="w-fit space-y-9 m-auto">
				<h1 className="text-3xl font-bold text-white capitalize">
					{translatedGenre} ({totalBooks} libros)
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{books.map((info: Book) => (
						<BookCard book={info} key={info.key}  />
					))}
				</div>
				<PaginationComponent
					currentPage={currentPage}
					hasMore={hasMore}
					totalBooks={totalBooks}
					library={library}
					genre={genre}
				/>
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