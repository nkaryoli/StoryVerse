"use client"

import CategoryNavbar from '@/components/CategoryNavbar';
import { BookOpenText, Popcorn } from 'lucide-react';
import React, { FC, PropsWithChildren } from 'react'

const items = [
	{
		name: "Todos",
		url:"/books",
		icon: Popcorn,
	},
	{
		name: "Fantasia",
		url:"/books/fantasy",
		icon: Popcorn,
	},
	{
		name: "Ficción",
		url:"/books/fiction",
		icon: BookOpenText,
	}
	,
	{
		name: "SciFi",
		url:"/books/scifi",
		icon: BookOpenText,
	}
	,
	{
		name: "Mystery",
		url:"/books/mystery",
		icon: BookOpenText,
	}
	,
	{
		name: "Romance",
		url:"/books/romance",
		icon: BookOpenText,
	}
	,
	{
		name: "History",
		url:"/books/history",
		icon: BookOpenText,
	}
	,
	{
		name: "Biography",
		url:"/books/biography",
		icon: BookOpenText,
	}
]

const BooksLayout:FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex flex-col'>
			<CategoryNavbar items={items} className=''/>

			{children}
		</div>
	)
}

export default BooksLayout;