import type { MultiTagInputProps } from "@/types/BeanTypes";

export default function MultiTagInput({ tastingNotes }: MultiTagInputProps) {
	return (
		<div className="space-y-2">
			<div className="flex flex-wrap gap-1.5">
				{tastingNotes.map((note) => (
					<div
						className="flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-2.5 py-1 font-Recursive text-xs font-medium text-primary-800 dark:text-primary-200"
						key={note}
					>
						<button type="button" onClick={() => console.log(note)}>
							{note}
						</button>

						<button
							type="button"
							className="opacity-50 hover:opacity-100 leading-none text-sm"
							onClick={() => console.log("unSelect that one")}
						>
							×
						</button>
					</div>
				))}
			</div>
			<div className="flex gap-2">
				<input
					readOnly
					placeholder="Type your own note…"
					className="flex-1 border border-border bg-background px-3 py-1.5 font-Recursive text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 rounded-none"
				/>
				<button
					type="button"
					className="border border-border bg-background px-3 font-Mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
				>
					Add
				</button>
			</div>
		</div>
	);
}
