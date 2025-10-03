export type Book = {
	title: string;
	author: string;
	cover: string | null;
	publishYear?: number;
	isbn?: string | null;
	key: string;
}

export interface OpenLibraryBook {
	title: string;
	author_name?: string[];
	cover_i?: number;
	first_publish_year?: number;
	isbn?: string[];
	key: string;
}

// search by categories

export async function searchBooks(query: string, limit: number = 10) {
	try {
		const response = await fetch(
			`https://openlibrary.org/search.json?q=${encodeURIComponent(
				query
			)}&limit=${limit}`,
			{ signal: AbortSignal.timeout(5000) } // 5 segundos timeout
		);

		if (response.ok) {
			const data = await response.json();
			return data.docs.map((book: OpenLibraryBook) => ({
				title: book.title,
				author: book.author_name?.[0] || "Unknown",
				cover: book.cover_i
					? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
					: null,
				publishYear: book.first_publish_year,
				isbn: book.isbn?.[0] || null,
				key: book.key,
			}));
		}
	} catch (error) {
		console.log("OpenLibrary failed, using mock data", error);
	}

	// Fallback a datos mock
	return getMockBooks(query, limit);
}

async function getMockBooks(query: string, limit: number) {
	// await new Promise(resolve => setTimeout(resolve, 800));

	const mockBooks = {
		fantasy: [
			{ title: "The Lord of the Rings", author: "J.R.R. Tolkien", coverId: 1 },
			{
				title: "Harry Potter and the Sorcerer's Stone",
				author: "J.K. Rowling",
				coverId: 2,
			},
			{ title: "A Game of Thrones", author: "George R.R. Martin", coverId: 3 },
			{ title: "The Name of the Wind", author: "Patrick Rothfuss", coverId: 4 },
			{
				title: "Mistborn: The Final Empire",
				author: "Brandon Sanderson",
				coverId: 5,
			},
		],
		romance: [
			{ title: "Pride and Prejudice", author: "Jane Austen", coverId: 6 },
			{ title: "The Notebook", author: "Nicholas Sparks", coverId: 7 },
			{ title: "Outlander", author: "Diana Gabaldon", coverId: 8 },
			{
				title: "Red, White & Royal Blue",
				author: "Casey McQuiston",
				coverId: 9,
			},
			{ title: "It Ends With Us", author: "Colleen Hoover", coverId: 10 },
		],
		mystery: [
			{
				title: "The Girl with the Dragon Tattoo",
				author: "Stieg Larsson",
				coverId: 11,
			},
			{ title: "Gone Girl", author: "Gillian Flynn", coverId: 12 },
			{ title: "The Da Vinci Code", author: "Dan Brown", coverId: 13 },
			{ title: "Big Little Lies", author: "Liane Moriarty", coverId: 14 },
			{ title: "The Silent Patient", author: "Alex Michaelides", coverId: 15 },
		],
		fiction: [
			{ title: "To Kill a Mockingbird", author: "Harper Lee", coverId: 16 },
			{ title: "1984", author: "George Orwell", coverId: 17 },
			{ title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverId: 18 },
			{ title: "The Catcher in the Rye", author: "J.D. Salinger", coverId: 19 },
			{ title: "The Alchemist", author: "Paulo Coelho", coverId: 20 },
		],
	};

	const books =
		mockBooks[query as keyof typeof mockBooks] ||
		Array.from({ length: 5 }, (_, i) => ({
			title: `${query} Book ${i + 1}`,
			author: `Author ${i + 1}`,
			coverId: i + 100,
		}));

	return books.slice(0, limit).map((book, index) => ({
		title: book.title,
		author: book.author,
		cover: `https://picsum.photos/200/300?random=${book.coverId}`,
		publishYear: 2000 + index,
		isbn: `978-${index.toString().padStart(10, "0")}`,
		key: `mock-${query}-${index}`,
	}));
}

export const booksGenres = [
	"Ficción",
	"No Ficción", 
	"Ciencia Ficción",
	"Fantasía",
	"Misterio",
	"Romance",
	"Terror",
	"Young Adult",
	"Biografía",
	"Historia",
	"Ciencia",
	"Tecnología",
	"Autoayuda",
	"Negocios",
	"Arte",
	"Filosofía",
	"Poesía",
	"Teatro",
	"Viajes",
	"Cocina"
];