import { BookOpen, Coffee } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAllBeanNames } from "@/hooks/api/useBeans";
import { useRecentBrews } from "@/hooks/api/useBrews";
import { useBrewCountForBean } from "@/hooks/api/useStats";

export default function Home() {
	const recentBrews = useRecentBrews(5);
	const allBeanNames = useAllBeanNames();
	const [selectedBean, setSelectedBean] = useState<string>();
	const brewCountForSelected = useBrewCountForBean(selectedBean);

	return (
		<div className="w-full mx-auto max-w-5xl px-6 space-y-10">
			{/* Quick Actions */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<Link
					to="/log/brew"
					className="group relative overflow-hidden border border-primary/20 bg-primary-700/10 px-6 py-8 transition-all hover:bg-primary-700/15 hover:border-primary/30"
				>
					<p className="font-Mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
						Quick add
					</p>
					<p className="mt-1 text-4xl tracking-tight font-News text-foreground/90">
						Log a Brew
					</p>
					<Coffee className="absolute right-6 bottom-6 size-8 text-primary/20 group-hover:text-primary/30 transition-colors" />
				</Link>
				<Link
					to="/library"
					className="group relative overflow-hidden border border-border bg-background px-6 py-8 transition-all hover:border-foreground/20"
				>
					<p className="font-Mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
						Your beans and equipment
					</p>
					<p className="mt-1 text-4xl tracking-tight font-News text-foreground/90">
						Library →
					</p>
					<BookOpen className="absolute right-6 bottom-6 size-8 text-muted-foreground/20 group-hover:text-muted-foreground/30 transition-colors" />
				</Link>
			</div>

			{selectedBean}

			{/* Quick settings per Bean */}
			<section className="space-y-4 w-full">
				<div className="flex items-center justify-between">
					<div className="border-l-4 border-primary/30 pl-4">
						<h2 className="font-News text-xl text-foreground/90">
							Quick Settings
						</h2>
					</div>
					<Link
						to="/library"
						className="font-Mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors"
					>
						View all →
					</Link>
				</div>

				{/* Bean selector */}
				<div className="flex flex-row gap-2">
					{allBeanNames.map((name) => (
						<button
							type="button"
							key={name}
							onClick={() => setSelectedBean(name)}
							className="font-Mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors p-2 bg-primary-200/25 border border-primary-700 hover:border-transparent hover:bg-primary-700/25 cursor-pointer"
						>
							{name}
						</button>
					))}
				</div>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{[
						{
							label: "brewsForBean",
							value: String(brewCountForSelected),
							sub: "in library",
						},
						{
							label: "brewsForBean",
							value: String(brewCountForSelected),
							sub: "in library",
						},
					].map(({ label, value, sub }) => (
						<div
							key={label}
							className="space-y-1 border border-border bg-background p-4"
						>
							<p className="font-Mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
								{label}
							</p>
							<p className="font-News text-3xl leading-none text-primary-800 dark:text-primary-100">
								{value}
							</p>
							<p className="font-Mono text-[10px] text-muted-foreground">
								{sub}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Recent Brews */}
			{recentBrews?.length !== 0 && (
				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="border-l-4 border-primary/30 pl-4">
							<h2 className="font-News text-xl text-foreground/90">
								Recent Brews
							</h2>
						</div>
						<Link
							to="/history"
							className="font-Mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors"
						>
							View all →
						</Link>
					</div>
				</section>
			)}

			{/* Empty state */}
			{recentBrews?.length === 0 && (
				<div className="border border-dashed border-border p-12 text-center space-y-3">
					<p className="font-News text-2xl text-foreground/60">No brews yet</p>
					<p className="font-Recursive text-sm text-muted-foreground">
						Log your first brew to start seeing insights here.
					</p>
					<Link
						to="/log/brew"
						className="inline-block mt-2 border border-primary/30 bg-primary-200/15 px-4 py-2 font-Recursive text-sm text-foreground hover:bg-primary-200/25 transition-colors"
					>
						Log a Brew
					</Link>
				</div>
			)}
		</div>
	);
}
