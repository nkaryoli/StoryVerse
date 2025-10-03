"use client"
import React from 'react';
import { Grid2x2PlusIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem, SearchModal } from '@/components/search-modal';
import Link from 'next/link';

export function Header() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{
			label: 'Libros',
			href: '/books',
		},
		{
			label: 'Películas',
			href: '/movies',
		}
	];

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full border-b backdrop-blur-lg',
				'bg-background/95 supports-[backdrop-filter]:bg-background/80',
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between">
				<Link href="/" className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
					<Grid2x2PlusIcon className="size-6" />
					<p className="font-mono text-lg font-bold">StoryVerse</p>
				</Link>
				<div className="flex items-center gap-2">

					<SearchModal data={blogs}>
						<Button
							variant="outline"
							className="relative size-9 cursor-pointer p-0 md:border xl:h-9 xl:w-60 xl:justify-between xl:px-3 xl:py-2"
						>
							<span className="hidden xl:inline-flex">Search...</span>
							<span className="sr-only">Search</span>
							<SearchIcon className="size-4" />
						</Button>
					</SearchModal>

					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<a
										key={link.href}
										className={buttonVariants({
											variant: 'ghost',
											className: 'justify-start',
										})}
										href={link.href}
									>
										{link.label}
									</a>
								))}
							</div>
							<SheetFooter>
								{/* <Button variant="outline">Sign In</Button>
								<Button>Get Started</Button> */}
							</SheetFooter>
						</SheetContent>
					</Sheet>

					<div className="hidden items-center gap-1 lg:flex">
						{links.map((link, index) => (
							<a
								key={index}
								className={buttonVariants({ variant: 'ghost' })}
								href={link.href}
							>
								{link.label}
							</a>
						))}

					</div>

				</div>
			</nav>
		</header>
	);
}

const blogs: CommandItem[] = [
	{
		id: 'blog-1',
		title: 'The Future of Web Dev',
		description: 'A quick look at upcoming web technologies.',
		category: 'Web Dev',
	},
	{
		id: 'blog-2',
		title: 'Minimalist Design Tips',
		description: 'Learn how less can often be more in UI design.',
		category: 'Design',
	},
	{
		id: 'blog-3',
		title: 'Boosting Page Speed',
		description: 'Simple tricks to make your site load faster.',
		category: 'Performance',
	},
	{
		id: 'blog-4',
		title: 'Intro to TypeScript',
		description: 'Why TypeScript makes JavaScript safer and clearer.',
		category: 'Programming',
	},
	{
		id: 'blog-5',
		title: 'Dark Mode Design',
		description: 'Best practices for building a dark theme UI.',
		category: 'Design',
	},
	{
		id: 'blog-6',
		title: 'Understanding APIs',
		description: 'Breaking down REST and GraphQL for beginners.',
		category: 'Backend',
	},
	{
		id: 'blog-7',
		title: 'CSS Grid Basics',
		description: 'A quick guide to building layouts with CSS Grid.',
		category: 'Frontend',
	},
	{
		id: 'blog-8',
		title: 'React State Management',
		description: 'Exploring useState, Redux, and other options.',
		category: 'Frontend',
	},
	{
		id: 'blog-9',
		title: 'SEO in 2025',
		description: 'Trends and tips to rank higher on Google.',
		category: 'SEO',
	},
	{
		id: 'blog-10',
		title: 'Debugging Like a Pro',
		description: 'Tools and techniques to fix bugs faster.',
		category: 'Programming',
	},
];
