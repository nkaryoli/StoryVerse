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