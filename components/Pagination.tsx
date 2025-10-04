// components/Pagination.tsx
"use client"

import { useRouter } from 'next/navigation';

interface PaginationProps {
	currentPage: number;
	hasMore: boolean;
	totalBooks: number;
	library: string;
	genre: string;
}

export function Pagination({ currentPage, hasMore, totalBooks, library, genre }: PaginationProps) {
	const router = useRouter();

	const handlePageChange = (newPage: number) => {
		router.push(`/${library}/${genre}?page=${newPage}`);
	};

	// Calcular información de paginación
	const booksPerPage = 24; // Debe coincidir con el límite que usas
	const startBook = (currentPage - 1) * booksPerPage + 1;
	const endBook = Math.min(currentPage * booksPerPage, totalBooks);

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			{/* Información de paginación */}
			<p className="text-gray-300 text-sm">
				Mostrando {startBook}-{endBook} de {totalBooks} libros
			</p>
			
			{/* Debug info (quitar en producción) */}
			<p className="text-xs text-yellow-500">
				Debug: Página {currentPage}, hasMore: {hasMore.toString()}, Total: {totalBooks}
			</p>
			
			{/* Botones de paginación */}
			<div className="flex gap-2">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
				>
					← Anterior
				</button>
				
				<span className="px-4 py-2 bg-blue-600 text-white rounded-md">
					Página {currentPage}
				</span>
				
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!hasMore}
					className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
				>
					Siguiente →
				</button>
			</div>
		</div>
	);
}