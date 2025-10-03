import { BookCard } from "@/components/BookCard";
import { Book, searchBooks } from "@/lib/books-utils";

interface PageProps {
  params: Promise<{
    genre: string;
  }>;
}

const BooksByGenre = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const books = await searchBooks(resolvedParams.genre, 18);

  return (
    <section className="w-fit space-y-6 m-auto">
      <h2 className="text-2xl font-bold text-white capitalize">{resolvedParams.genre} Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-6">
        {books.map((info: Book ) => (
          <BookCard book={info} key={info.title} />
        ))}
      </div>
    </section>
  );
};

export default BooksByGenre;
