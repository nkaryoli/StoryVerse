import React from "react";
import { Book, booksGenres, searchBooks } from "@/lib/books-utils";
import { BookCard } from "@/components/BookCard";

const BooksPage = async () => {
  const allBooksPromises = booksGenres.map((genre) => searchBooks(genre, 5));

  const allBooksResults = await Promise.all(allBooksPromises);

  const allBooks = allBooksResults.flat();

  return (
    <section className="w-fit space-y-6 m-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {allBooks.map((book: Book, index: number) => (
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
