import { cn } from "@/lib/utils";

type LogCardProps = {
	frontContent?: Array<logCardContent>;
	backContent?: Array<logCardContent>;
	className?: string;
};

type logCardContent = {
	title?: string;
	value?: string;
};

export default function LogCard({
	frontContent,
	backContent,
	className,
}: LogCardProps) {
	return (
		<div className={cn("w-48 h-80 perspective-distant group/flip", className)}>
			<div className="relative h-full w-full transform-3d transition-all duration-200 ease-in group-hover/flip:rotate-y-180">
				<article
					className={cn(
						"absolute inset-0 flex flex-col border border-border bg-background-light p-4 shadow-[0_10px_22px_rgba(0,0,0,0.1)] backface-hidden",
					)}
				>
					<div className="flex w-fit border border-dashed border-primary/24 bg-primary-200/24 px-2 py-1 font-Mono text-xs tracking-widest uppercase  text-primary-800 dark:text-primary-100">
						Your brew
					</div>
					<div className="flex flex-col gap-1.5 justify-start pt-8 h-full">
						{/*<p className="font-Mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
							Front
						</p>*/}
						<h2 className="font-News text-lg/6 text-foreground">
							{frontContent?.map((line) => (
								<div key={line.title}>
									<p className="text-xs font-light dark:text-primary-200 text-primary-800/70 tracking-tighter font-Mono underline decoration-2 decoration-dotted mb-0">
										{line.title}
									</p>
									<p className="text-foreground font-medium font-Recursive text-sm tracking-tighter mb-1">
										{line.value}
									</p>
								</div>
							)) || "Untitled card"}
						</h2>
					</div>
					<div className="border-t border-border/70 pt-2 font-Mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
						Hover to flip
					</div>
				</article>
				<article
					className={cn(
						"absolute inset-0 flex flex-col border border-border bg-background-light p-4 shadow-[0_10px_22px_rgba(0,0,0,0.1)] backface-hidden rotate-y-180",
					)}
				>
					<div className="flex w-fit border border-dashed border-primary/24 bg-primary-200/24 px-2 py-1 font-Mono text-xs tracking-widest uppercase text-primary-800/80">
						Notes
					</div>
					<div className="flex flex-col gap-1.5 justify-start pt-8 h-full">
						{/*<p className="font-Mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
							Back
						</p>*/}
						<h2 className="font-News text-lg/6 text-foreground">
							{backContent?.map((line) => (
								<div key={line.title}>
									<p className="text-xs font-light dark:text-primary-200 text-primary-800/70 tracking-tighter font-Mono underline decoration-2 decoration-dotted mb-0">
										{line.title}
									</p>
									<p className="text-foreground font-medium font-Recursive text-sm tracking-tighter mb-1">
										{line.value}
									</p>
								</div>
							)) || "Untitled card"}
						</h2>
					</div>
					<div className="border-t border-border/70 pt-2 font-Mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
						Use this for reminders
					</div>
				</article>
			</div>
		</div>
	);
}
