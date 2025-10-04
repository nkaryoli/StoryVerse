import CategoryNavbar from '@/components/CategoryNavbar';
import React from 'react'
import { movieGenresNav } from '@/lib/movie-utils';
import { booksGenresNav } from '@/lib/books-utils';

interface PageProps {
	params: Promise<{
		library: string;
	}>;
	children: React.ReactNode;
}

const LibraryLayout = async ({ params, children }: PageProps) => {
	const resolvedParams = await params;

	const library = resolvedParams.library;

	const filters = library === 'books' ? booksGenresNav : movieGenresNav; 
	const color = library === 'books' ? '#FC3FFA' : '#41C5FE'; 

	return (
		<div className='flex flex-col p-3 lg:pt-16 space-y-16'>
			<CategoryNavbar items={filters} primaryColor={color}/>
			{children}
		</div>
	)
}

export default LibraryLayout;