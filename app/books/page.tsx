import React from 'react'
import { searchBooks } from '@/components/utils'
import Image from 'next/image'
import { BackgroundGradient } from '@/components/background-gradient'
import { Book } from '@/lib/types'

const generos = [
	"fantasy",
	"romance",
	// "mystery",
	// "fiction"
]

const BooksPage = async () => {
	const allBooksPromises = generos.map(genre =>
		searchBooks(genre, 5) // 5 libros por género
	)

	const allBooksResults = await Promise.all(allBooksPromises)

	return (
		<div className="w-full">
			<h1 className="text-3xl font-bold mb-8">All Books by Genre</h1>

			{generos.map((genre, index) => (
				<section key={genre} className="mb-12">
					<h2 className="text-2xl font-bold capitalize mb-6">{genre} Books</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
						{allBooksResults[index].map((book: Book, bookIndex: number) => (
							<BackgroundGradient
								key={book.key || bookIndex}
								className="rounded-lg p-1 h-40 bg-black w-28 relative"
							>
								{book.cover ? (
									<Image
										src={book.cover}
										alt={book.title}
										fill
										className="mx-auto mb-3 rounded-md object-cover"
										sizes="112px"
										priority={bookIndex === 0}
									/>
								) : (
									<div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
										<span className="text-xs text-gray-500">No cover</span>
									</div>
								)}
							</BackgroundGradient>
						))}
					</div>
				</section>
			))}
		</div>
	)
}

export default BooksPage;