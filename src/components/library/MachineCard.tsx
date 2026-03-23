import { useState } from "react";
import { deleteMachine } from "@/db/crud/delete";
import type { Machines } from "@/types/default";

export default function MachineCard({ machine }: { machine: Machines }) {
	const [confirmDelete, setConfirmDelete] = useState(false);

	return (
		<article className="rounded-xl border border-border bg-card p-4 space-y-3">
			<div className="flex items-start justify-between gap-2">
				<div>
					<p className="font-semibold">{machine.name || "Unnamed machine"}</p>
					{machine.brand && (
						<p className="text-xs text-muted-foreground mt-0.5">
							{machine.brand}
							{machine.model ? ` · ${machine.model}` : ""}
						</p>
					)}
				</div>
				{machine.type && (
					<span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium shrink-0">
						{machine.type}
					</span>
				)}
			</div>

			<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
				{machine.grindRange && (
					<p>
						<span className="text-foreground/50">Grind </span>
						{machine.grindRange}
					</p>
				)}
				{machine.capacity && (
					<p>
						<span className="text-foreground/50">Capacity </span>
						{machine.capacity}
					</p>
				)}
				{machine.purchaseDate && (
					<p>
						<span className="text-foreground/50">Bought </span>
						{machine.purchaseDate}
					</p>
				)}
				{typeof machine.induction === "boolean" && (
					<p>
						<span className="text-foreground/50">Induction </span>
						{machine.induction ? "Yes" : "No"}
					</p>
				)}
			</div>

			<div className="flex justify-end pt-1">
				{confirmDelete ? (
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">Sure?</span>
						<button
							type="button"
							onClick={() => {
								if (typeof machine.id === "number") deleteMachine(machine.id);
							}}
							className="px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs font-medium hover:opacity-90 transition-opacity"
						>
							Delete
						</button>
						<button
							type="button"
							onClick={() => setConfirmDelete(false)}
							className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:text-foreground transition-colors"
						>
							Cancel
						</button>
					</div>
				) : (
					<button
						type="button"
						onClick={() => setConfirmDelete(true)}
						className="px-3 py-1 rounded-lg text-xs text-muted-foreground hover:text-destructive transition-colors"
					>
						Delete
					</button>
				)}
			</div>
		</article>
	);
}
