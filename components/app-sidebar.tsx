import { BookOpenText, Clapperboard, Home } from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Books",
		url: "/books",
		icon: BookOpenText,
	},
	{
		title: "Movies",
		url: "/movies",
		icon: Clapperboard,
	}
]

export function AppSidebar() {
	return (
		<Sidebar variant="floating" collapsible="icon" >
			<SidebarContent>
				<SidebarGroup>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}