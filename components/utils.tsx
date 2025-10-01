// search by categories

import { BackgroundGradient } from "@/components/background-gradient";

const categories = [
	{
		id: "scifi",
		name: "Ciencia Ficción",
		query: "science fiction",
		color: "blue",
		icon: "🚀"
	},
	{
		id: "fantasy",
		name: "Fantasía",
		query: "fantasy",
		color: "green",
		icon: "🐉"
	},
	{
		id: "mystery",
		name: "Misterio",
		query: "mystery",
		color: "purple",
		icon: "🕵️"
	},
	{
		id: "romance",
		name: "Romance",
		query: "romance",
		color: "pink",
		icon: "💖"
	},
	{
		id: "history",
		name: "Historia",
		query: "history",
		color: "amber",
		icon: "📜"
	},
	{
		id: "science",
		name: "Ciencia",
		query: "science",
		color: "cyan",
		icon: "🔬"
	},
	{
		id: "biography",
		name: "Biografías",
		query: "biography",
		color: "red",
		icon: "👤"
	},
	{
		id: "business",
		name: "Negocios",
		query: "business",
		color: "emerald",
		icon: "💼"
	}
];

export function BookCategories({ onCategorySelect }: { onCategorySelect: (query: string) => void }) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
			{categories.map((category) => (
				<button
					key={category.id}
					onClick={() => onCategorySelect(category.query)}
					className="text-left"
				>
					<BackgroundGradient variant={category.color as "blue" | "green"} className="p-4">
						<div className="text-2xl mb-2">{category.icon}</div>
						<h3 className="font-semibold text-white">{category.name}</h3>
					</BackgroundGradient>
				</button>
			))}
		</div>
	);
}


// search by theme

export const thematicCategories = [
	{
		name: "Distopías",
		query: "dystopian",
		examples: ["1984", "Un mundo feliz", "Fahrenheit 451"]
	},
	{
		name: "Viajes en el Tiempo",
		query: "time travel",
		examples: ["La máquina del tiempo", "El fin de la eternidad"]
	},
	{
		name: "Cyberpunk",
		query: "cyberpunk",
		examples: ["Neuromante", "Snow Crash"]
	},
	{
		name: "Fantasía Urbana",
		query: "urban fantasy",
		examples: ["American Gods", "Neverwhere"]
	},
	{
		name: "Thriller Psicológico",
		query: "psychological thriller",
		examples: ["El silencio de los corderos", "Perdida"]
	},
	{
		name: "Romance Histórico",
		query: "historical romance",
		examples: ["Orgullo y prejuicio", "Lo que el viento se llevó"]
	},
	{
		name: "No Ficción Creativa",
		query: "creative nonfiction",
		examples: ["En el camino", "Ébano"]
	},
	{
		name: "Microhistoria",
		query: "microhistory",
		examples: ["Sal", "Cod", "La historia del mundo en 6 tragos"]
	}
];

//search by region

export const regionalLiterature = {
	latinAmerican: {
		name: "Literatura Latinoamericana",
		query: "latin american literature",
		countries: ["Argentina", "México", "Colombia", "Chile", "Perú"]
	},
	european: {
		name: "Literatura Europea",
		query: "european literature",
		countries: ["Francia", "Reino Unido", "Alemania", "Italia", "Rusia"]
	},
	asian: {
		name: "Literatura Asiática",
		query: "asian literature",
		countries: ["Japón", "China", "India", "Corea"]
	},
	african: {
		name: "Literatura Africana",
		query: "african literature",
		countries: ["Nigeria", "Egipto", "Kenia", "Sudáfrica"]
	}
};