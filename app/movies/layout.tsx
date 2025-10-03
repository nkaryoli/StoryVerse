"use client"

import CategoryNavbar from '@/components/CategoryNavbar';
import {  Rocket, Sparkles, HatGlasses, Heart, Calendar, UserCircle, List, BookOpen } from 'lucide-react';
import React, { FC, PropsWithChildren } from 'react'

const items = [
	{
		name: "Todos",
		url: "/movies",
		icon: List,
	},
	{
		name: "Acción",
		url: "/movies/accion",
		icon: Sparkles,
	},
	{
		name: "Aventura",
		url: "/movies/aventura",
		icon: BookOpen,
	},
	{
		name: "Animacion",
		url: "/movies/animacion",
		icon: Rocket,
	},
	{
		name: "Comedia",
		url: "/movies/comedia",
		icon: HatGlasses,
	},
	{
		name: "Crimen",
		url: "/movies/crimen",
		icon: Heart,
	},
	{
		name: "Drama",
		url: "/movies/drama",
		icon: Calendar,
	},
	{
		name: "Fantasia",
		url: "/movies/fantasia",
		icon: UserCircle,
	},
	{
		name: "Terror",
		url: "/movies/terror",
		icon: UserCircle,
	},
	{
		name: "Romance",
		url: "/movies/romance",
		icon: UserCircle,
	},
	{
		name: "Ciencia Ficción",
		url: "/movies/ciencia-ficcion",
		icon: UserCircle,
	},
];


const MoviesLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex flex-col p-3 space-y-9'>
			<CategoryNavbar items={items} primaryColor='#41C5FE'/>
			{children}
		</div>
	)
}

export default MoviesLayout;