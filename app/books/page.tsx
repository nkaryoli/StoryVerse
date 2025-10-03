import React from "react";
import { Book, booksGenres, searchBooks } from "@/lib/books-utils";
import { BookCard } from "@/components/BookCard";

const BooksPage = async () => {
  const allBooksPromises = booksGenres.map((genre) => searchBooks(genre, 5));

  const allBooksResults = await Promise.all(allBooksPromises);

  const allBooks = allBooksResults.flat();
  const shuffledBooks = [...allBooks].sort(() => Math.random() - 0.5);

  return (
    <section className="w-fit space-y-9 m-auto">
      <h1 className="text-3xl font-bold text-white capitalize">Todos los Libros</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {shuffledBooks.map((book: Book, index: number) => (
          <BookCard
            book={book}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default BooksPage;
