/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterItem } from "./movie-utils";

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

export async function searchBooksByGenre(query: string, limit: number = 50) {
	try {
		// Pequeña pausa para no saturar la API
		await new Promise(resolve => setTimeout(resolve, 500));

		// Convertimos tus géneros a los que entiende Open Library
		const genreMap: Record<string, string> = {
			'fantasy': 'fantasy',
			'fiction': 'fiction',
			'scifi': 'science_fiction',
			'mystery': 'mystery',
			'romance': 'romance',
			'history': 'history',
			'biography': 'biography',
			'non-fiction': 'nonfiction',
			'terror': 'horror',
			'young-adult': 'young_adult',
			'science': 'science',
			'technology': 'technology',
			'self-help': 'self_help',
			'business': 'business',
			'art': 'art',
			'philosophy': 'philosophy',
			'poetry': 'poetry',
			'theatre': 'drama',
			'travel': 'travel',
			'kitchen': 'cooking'
		};

		// Buscamos el género en nuestro mapeo
		const openLibraryGenre = genreMap[query] || query;

		// URL específica para géneros
		const response = await fetch(
			`https://openlibrary.org/subjects/${openLibraryGenre}.json?limit=100`,
			{ signal: AbortSignal.timeout(15000) }
		);

		if (response.ok) {
			const data = await response.json();
			const works = data.works || [];

			console.log(`📚 Encontrados ${works.length} libros de ${query}`);

			const books = works.map((work: any) => ({
				title: work.title,
				author: work.authors?.[0]?.name || "Autor desconocido",
				cover: work.cover_id 
					? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
					: null,
				publishYear: work.first_publish_year,
				isbn: work.availability?.isbn || null,
				key: work.key,
			}));
			
			// La respuesta de /subjects es diferente, usa "works"
			return  books.slice(0, limit);
		} else {
			throw new Error(`Error HTTP: ${response.status}`);
		}
	} catch (error) {
		console.log(`Error con Open Library, usando datos de ejemplo`, error);
		// Usamos los datos de ejemplo si falla
		return getMockBooks(query, limit);
	}
}

export async function searchBooks(query: string, limit: number = 10) {
	try {
		// Delay aleatorio entre peticiones para evitar rate limiting de Open Library API
		// y no cierre las conexiones por hacer demasiadas peticiones en poco tiempo
		await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

		const response = await fetch(
			`https://openlibrary.org/search.json?q=${encodeURIComponent(
				query
			)}&limit=${limit}`,
			{ signal: AbortSignal.timeout(10000) } // 10 segundos timeout
		);

		if (response.ok) {
			const data = await response.json();
			return (
				data.docs.map((book: OpenLibraryBook) => ({
					title: book.title,
					author: book.author_name?.[0] || "Unknown",
					cover: book.cover_i
						? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
						: null,
					publishYear: book.first_publish_year,
					isbn: book.isbn?.[0] || null,
					key: book.key,
				}))
			)
		} else {
			console.warn(`⚠️ [OPEN LIBRARY] ${query}: HTTP ${response.status}`);
			throw new Error(`HTTP ${response.status}`);
		}
	} catch (error) {
		console.log(`OpenLibrary ${query} failed, using mock data`, error);
	}

	// Fallback a datos mock en caso de que el request a la API falle
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

export const bookFilters: FilterItem[] = [
	{
		name: "Todos",
		url: "/books",
		icon: "List",
	},
	{
		name: "Fantasia",
		url: "/books/fantasy",
		icon: "Sparkles",
	},
	{
		name: "Ficción",
		url: "/books/fiction",
		icon: "BookOpen",
	},
	{
		name: "SciFi",
		url: "/books/scifi",
		icon: "Rocket",
	},
	{
		name: "Mystery",
		url: "/books/mystery",
		icon: "HatGlasses",
	},
	{
		name: "Romance",
		url: "/books/romance",
		icon: "Heart",
	},
	{
		name: "History",
		url: "/books/history",
		icon: "Calendar",
	},
	{
		name: "Biography",
		url: "/books/biography",
		icon: "UserCircle",
	},
	{
		name: "No Ficción",
		url: "/books/no-fiction",
		icon: "BookText",
	},
	{
		name: "Terror",
		url: "/books/terror",
		icon: "Ghost",
	},
	{
		name: "Young Adult",
		url: "/books/young-adult",
		icon: "Users",
	},
	{
		name: "Ciencia",
		url: "/books/science",
		icon: "Microscope",
	},
	{
		name: "Tecnología",
		url: "/books/technology",
		icon: "Cpu",
	},
	{
		name: "Autoayuda",
		url: "/books/self-help",
		icon: "HeartHandshake",
	},
	{
		name: "Negocios",
		url: "/books/business",
		icon: "TrendingUp",
	},
	{
		name: "Arte",
		url: "/books/art",
		icon: "Palette",
	},
	{
		name: "Filosofía",
		url: "/books/philosophy",
		icon: "Brain",
	},
	{
		name: "Poesía",
		url: "/books/poetry",
		icon: "Quote",
	},
	{
		name: "Teatro",
		url: "/books/theatre",
		icon: "Clapperboard",
	},
	{
		name: "Viajes",
		url: "/books/travel",
		icon: "MapIcon",
	},
	{
		name: "Cocina",
		url: "/books/kitchen",
		icon: "ChefHat",
	}
];

export const genreTranslations: Record<string, string> = {
	// Libros
	'fantasy': 'Fantasía',
	'fiction': 'Ficción',
	'scifi': 'Ciencia Ficción',
	'mystery': 'Misterio',
	'romance': 'Romance',
	'history': 'Historia',
	'biography': 'Biografía',
	'non-fiction': 'No Ficción',
	'terror': 'Terror',
	'young-adult': 'Juvenil',
	'science': 'Ciencia',
	'technology': 'Tecnología',
	'self-help': 'Autoayuda',
	'business': 'Negocios',
	'art': 'Arte',
	'philosophy': 'Filosofía',
	'poetry': 'Poesía',
	'theatre': 'Teatro',
	'travel': 'Viajes',
	'kitchen': 'Cocina',
};

export function translateGenre(englishGenre: string): string {
	return genreTranslations[englishGenre.toLowerCase()] || englishGenre;
}