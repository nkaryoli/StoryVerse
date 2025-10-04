"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from './pagination';
import { Button } from './button-1';

interface PaginationProps {
	currentPage: number;
	hasMore: boolean;
	totalItems: number;
	itemsPerPage: number;
	library: string;
	genre: string;
}

export function PaginationComponent({ currentPage, hasMore, totalItems, itemsPerPage, library, genre }: PaginationProps) {
	const router = useRouter();

	const handlePageChange = (newPage: number) => {
		if (genre === "populares" || genre === "trending") {
			router.push(`/${library}?page=${newPage}`);
		} else {
			router.push(`/${library}/${genre}?page=${newPage}`);
		}
	};

	// Calcular correctamente usando itemsPerPage
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	// Solo mostrar paginación si hay más de una página
	if (totalPages <= 1) {
		return null;
	}

	const maxVisiblePages = 5;

	const getVisiblePages = () => {
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		// Ajustar si estamos cerca del final
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages;
	};

	const visiblePages = getVisiblePages();
	const showStartEllipsis = visiblePages[0] > 1;
	const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			{/* Información de paginación */}
			<p className="text-gray-300 text-sm">
				Mostrando {startItem}-{endItem} de {totalItems} {library === 'books' ? 'libros' : 'películas'}
			</p>

			{/* Componente de paginación personalizado */}
			<Pagination>
				<PaginationContent>
					{/* Botón Anterior */}
					<PaginationItem>
						<Button
							variant="ghost"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="flex items-center gap-2"
						>
							<ChevronLeft className="h-4 w-4" />
							Anterior
						</Button>
					</PaginationItem>

					{/* Página 1 (si no está en las páginas visibles) */}
					{showStartEllipsis && (
						<>
							<PaginationItem>
								<Button
									variant="ghost"
									mode="icon"
									onClick={() => handlePageChange(1)}
									className={currentPage === 1 ? "bg-blue-600 text-white" : ""}
								>
									1
								</Button>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						</>
					)}

					{/* Páginas visibles */}
					{visiblePages.map((page) => (
						<PaginationItem key={page}>
							<Button
								variant={currentPage === page ? "outline" : "ghost"}
								mode="icon"
								onClick={() => handlePageChange(page)}
								className={currentPage === page ? "bg-blue-600 text-white border-blue-600" : ""}
							>
								{page}
							</Button>
						</PaginationItem>
					))}

					{/* Página final (si no está en las páginas visibles) */}
					{showEndEllipsis && (
						<>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									mode="icon"
									onClick={() => handlePageChange(totalPages)}
									className={currentPage === totalPages ? "bg-blue-600 text-white" : ""}
								>
									{totalPages}
								</Button>
							</PaginationItem>
						</>
					)}

					{/* Botón Siguiente */}
					<PaginationItem>
						<Button
							variant="ghost"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={!hasMore && currentPage >= totalPages}
							className="flex items-center gap-2"
						>
							Siguiente
							<ChevronRight className="h-4 w-4" />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}