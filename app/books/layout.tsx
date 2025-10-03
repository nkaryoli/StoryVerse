"use client"

import CategoryNavbar from '@/components/CategoryNavbar';
import { BookText, Rocket, Sparkles, HatGlasses, Heart, Calendar, UserCircle, List, Clapperboard, ChefHat, Quote, Brain, Palette, TrendingUp, HeartHandshake, Cpu, Microscope, Ghost, Users, BookOpen, Map as MapIcon } from 'lucide-react';
import React, { FC, PropsWithChildren } from 'react'

const items = [
	{
		name: "Todos",
		url: "/books",
		icon: List,
	},
	{
		name: "Fantasia",
		url: "/books/fantasy",
		icon: Sparkles,
	},
	{
		name: "Ficción",
		url: "/books/fiction",
		icon: BookOpen,
	},
	{
		name: "SciFi",
		url: "/books/scifi",
		icon: Rocket,
	},
	{
		name: "Mystery",
		url: "/books/mystery",
		icon: HatGlasses,
	},
	{
		name: "Romance",
		url: "/books/romance",
		icon: Heart,
	},
	{
		name: "History",
		url: "/books/history",
		icon: Calendar,
	},
	{
		name: "Biography",
		url: "/books/biography",
		icon: UserCircle,
	},
	{
		name: "No Ficción",
		url: "/books/no-fiction",
		icon: BookText,
	},
	{
		name: "Terror",
		url: "/books/terror",
		icon: Ghost,
	},
	{
		name: "Young Adult",
		url: "/books/young-adult",
		icon: Users,
	},
	{
		name: "Ciencia",
		url: "/books/science",
		icon: Microscope,
	},
	{
		name: "Tecnología",
		url: "/books/technology",
		icon: Cpu,
	},
	{
		name: "Autoayuda",
		url: "/books/self-help",
		icon: HeartHandshake,
	},
	{
		name: "Negocios",
		url: "/books/business",
		icon: TrendingUp,
	},
	{
		name: "Arte",
		url: "/books/art",
		icon: Palette,
	},
	{
		name: "Filosofía",
		url: "/books/philosophy",
		icon: Brain,
	},
	{
		name: "Poesía",
		url: "/books/poetry",
		icon: Quote,
	},
	{
		name: "Teatro",
		url: "/books/theatre",
		icon: Clapperboard,
	},
	{
		name: "Viajes",
		url: "/books/travel",
		icon: MapIcon,
	},
	{
		name: "Cocina",
		url: "/books/kitchen",
		icon: ChefHat,
	}
];


const BooksLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex flex-col p-3 lg:pt-16 space-y-16'>
			<CategoryNavbar items={items}/>
			{children}
		</div>
	)
}

export default BooksLayout;