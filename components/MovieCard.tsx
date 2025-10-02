// components/MovieCard.tsx
import Image from 'next/image';
import { BackgroundGradient } from './background-gradient';

export interface Movie {
	id: number;
	title: string;
	poster: string | null;
	rating: number;
	releaseDate: string;
	overview: string;
}

export function MovieCard({ movie }: { movie: Movie }) {

	const safeRating = isNaN(movie.rating) ? 0 : movie.rating;

	const releaseYear = (() => {
		try {
			const year = new Date(movie.releaseDate).getFullYear();
			return isNaN(year) ? 'N/A' : year;
		} catch {
			return 'N/A';
		}
	})();

	return (
		<BackgroundGradient className="rounded-lg p-1 h-64 bg-black w-44 relative">
			{movie.poster ? (
				<div className="relative w-full h-full">
					<Image
						src={movie.poster}
						alt={movie.title}
						fill
						className="rounded-md object-cover"
						sizes="176px"
					/>
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
						<h3 className="text-white font-semibold text-sm line-clamp-2">
							{movie.title}
						</h3>
						<div className="flex justify-between items-center mt-1">
							<span className="text-yellow-400 text-xs">⭐ {safeRating.toFixed(1)}</span>
							<span className="text-gray-300 text-xs">
								{releaseYear}
							</span>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full h-full bg-gray-800 rounded-md flex items-center justify-center">
					<span className="text-white text-sm text-center px-2">
						{movie.title}
					</span>
				</div>
			)}
		</BackgroundGradient>
	);
}