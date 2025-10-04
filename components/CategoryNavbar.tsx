"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavItem {
	name: string
	url: string
	icon?: keyof typeof ICON_MAP
}

interface NavBarProps {
	items: NavItem[]
	className?: string
	primaryColor?: string
}

import {
	BookText, Clapperboard, ChefHat, Quote, Brain, Palette, TrendingUp, HeartHandshake, Cpu, Microscope, Ghost, Users, Map as MapIcon, Star, Sparkles, BookOpen, Rocket, HatGlasses, Heart, Calendar, UserCircle, LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, unknown> = {
	BookText, Clapperboard, ChefHat, Quote, Brain, Palette, TrendingUp, HeartHandshake, Cpu, Microscope, Ghost, Users, MapIcon, Star, Sparkles, BookOpen, Rocket, HatGlasses, Heart, Calendar, UserCircle
};

const CategoryNavbar = ({ items, className, primaryColor = "#FC3FFA" }: NavBarProps) => {
	const pathname = usePathname()
	const [activeTab, setActiveTab] = useState(items[0].name)

	// Sincronizar el tab activo con la URL actual
	useEffect(() => {
		const sortedItems = [...items].sort((a, b) => b.url.length - a.url.length)

		const currentItem = sortedItems.find(item => {
			if (item.name === "Todos") {
				return (pathname === item.url);
			}
			return (pathname === item.url || pathname.startsWith(item.url + '/'));
		})
		if (currentItem) {
			setActiveTab(currentItem.name)
			console.log("active tab: ", currentItem.name);
		}
		console.log("current path:", pathname);
	}, [pathname, items])

	return (
		<div
			className={cn(
				"w-full max-w-6xl  mx-auto bg-background/80 backdrop-blur-lg rounded-md shadow-lg",
				className,
			)}
		>
			<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-2">
				{items.map((item) => {
					if (!item.icon) return null;
					const Icon = ICON_MAP[item.icon] as LucideIcon;
					if (!Icon) return null;
					const isActive = activeTab === item.name

					return (
						<Link
							key={item.name}
							href={item.url}
							onClick={() => setActiveTab(item.name)}
							className={cn(
								"relative cursor-pointer text-sm font-medium py-2 px-3 rounded-md transition-colors flex justify-center items-center gap-2",
								"text-foreground/80 hover:bg-muted/50 border ")}
							style={{
								color: isActive ? primaryColor : undefined,
								borderColor: isActive ? `${primaryColor}20` : undefined
							}}
							onMouseEnter={(e) => {
								if (!isActive) {
									e.currentTarget.style.color = primaryColor;
								}
							}}
							onMouseLeave={(e) => {
								if (!isActive) {
									e.currentTarget.style.color = '';
								}
							}}

						>
							<Icon
								size={18}
								strokeWidth={2.5}
								style={isActive ? { color: primaryColor } : {}}
							/>
							<span className="whitespace-nowrap truncate text-xs sm:text-sm">
								{item.name}
							</span>

							{/* Efecto activo animado */}
							{isActive && (
								<motion.div
									layoutId="active-tab"
									className="absolute inset-0 w-full rounded-md -z-10 border"
									style={{
										backgroundColor: `${primaryColor}10`,
										borderColor: `${primaryColor}20`
									}}
									initial={false}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 30,
									}}
								>
									{/* Efecto de "lámpara" solo en pantallas grandes */}
									<div
										className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-t-full"
										style={{ backgroundColor: primaryColor }}
									>
										<div
											className="absolute w-8 h-4 rounded-full blur-sm -top-1 -left-1"
											style={{ backgroundColor: `${primaryColor}20` }}
										/>
										<div
											className="absolute w-6 h-4 rounded-full blur-sm -top-0.5"
											style={{ backgroundColor: `${primaryColor}20` }}
										/>
									</div>
								</motion.div>
							)}
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default CategoryNavbar