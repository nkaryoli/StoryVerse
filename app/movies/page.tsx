import { BackgroundGradient } from "@/components/background-gradient";
import { searchBooks } from "@/components/utils";
import { Book } from "@/lib/types";
import Image from "next/image";

const MoviesPage = async () => { // Componente async

	const classicBooks = await searchBooks("classic literature", 16);
	const fictionBooks = await searchBooks("Ficción", 36);

	return (
		<div className="space-y-9">
			<section className="space-y-6">
				<h2>Literatura Clásica</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
					{classicBooks.map((book: Book, index: string) => (
						<BackgroundGradient key={book.key || index} className="rounded-lg p-1 h-40 bg-black w-28 relative">

							{book.cover && (

								<Image
									src={book.cover}
									alt={book.title}
									fill
									className="mx-auto mb-3 rounded-md"
								/>
							)}
							{/* <div className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-white to-black/80 h-11">

								<h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>
								<p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
								</div> */}

						</BackgroundGradient>
					))}
				</div>
			</section>

			<section className="space-y-6">
				<h2>Ficción</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
					{fictionBooks.map((book: Book, index: string) => (
						<BackgroundGradient key={book.key || index} className="rounded-lg p-1 h-40 bg-black w-28 relative">

							{book.cover && (

								<Image
									src={book.cover}
									alt={book.title}
									fill
									className="mx-auto mb-3 rounded-md"
								/>
							)}
							{/* <div className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-white to-black/80 h-11">

								<h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>
								<p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
								</div> */}

						</BackgroundGradient>
					))}
				</div>
			</section>

			{/* <BackgroundGradient className="rounded-[22px] p-3 bg-black dark:bg-zinc-900">
				{book && (
					<div>
						<h2>{book.title}</h2>
						<p>Autor: {book.author}</p>
						<p>Año: {book.publishYear}</p>
						{book.cover && (
							<Image
								src={book.cover}
								alt={`Portada de ${book.title}`}
								width={200}
								height={300}
							/>
						)}
					</div>
				)}
			</BackgroundGradient> */}
		</div>
	)
}

export default MoviesPage;