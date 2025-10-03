import { BackgroundGradient } from "@/components/background-gradient";
import { BookCard } from "@/components/BookCard";
import { Book, searchBooks } from "@/lib/books-utils";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    genre: string;
  }>;
}

const BooksByGenre = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const books = await searchBooks(resolvedParams.genre, 18);

  return (
    <section className="space-y-6">
      <h1>{resolvedParams.genre} Books</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {books.map((book: Book, index: number) => (
          <BookCard book={book} key={book.title} />
        ))}
      </div>
    </section>
  );
};

export default BooksByGenre;
