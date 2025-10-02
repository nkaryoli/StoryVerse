import { BackgroundGradient } from "@/components/background-gradient";
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
        {books.map((book: Book, index: number) => (
          <BackgroundGradient
            key={book.key || index}
            className="rounded-lg p-1 h-40 bg-black w-28 relative"
          >
            {book.cover && (
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="mx-auto mb-3 rounded-md object-cover"
                sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                priority={index === 0}
              />
            )}
          </BackgroundGradient>
        ))}
      </div>
    </section>
  );
};

export default BooksByGenre;
