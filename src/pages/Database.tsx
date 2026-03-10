import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { deleteBean } from "@/db/crud/delete";
import { db } from "@/db/db";
import type { Beans } from "@/types/default";

export default function Database() {
	const beans = useLiveQuery(async () => db.Beans.toArray(), []);
	const savedBeans = useMemo(
		() => [...(beans ?? [])].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
		[beans],
	);
	function toDisplayList(value?: Array<string>) {
		if (!value || value.length === 0) return "-";
		return value.join(", ");
	}

	function SavedBeanCard({ bean }: { bean: Beans }) {
		return (
			<article className="rounded-xl border border-border/70 bg-background p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<p className="text-sm font-semibold">
							{bean.name || "Unnamed bean"}
						</p>
						<p className="text-xs text-muted-foreground">{bean.brand || "-"}</p>
					</div>
					{typeof bean.roastLevel === "number" ? (
						<span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
							Roast {bean.roastLevel}
						</span>
					) : null}
					<Button variant="destructive" onClick={() => deleteBean(bean.id)}>
						Delete
					</Button>
				</div>
				<div className="mt-3 grid grid-cols-1 gap-2 text-xs text-muted-foreground md:grid-cols-2">
					<p>Origin: {toDisplayList(bean.origin)}</p>
					<p>Variety: {toDisplayList(bean.variety)}</p>
					<p>Dominant: {bean.dominantNote || "-"}</p>
					<p>Flavors: {toDisplayList(bean.flavors)}</p>
					<p className="md:col-span-2">
						Tasting notes: {toDisplayList(bean.tastingNotes)}
					</p>
				</div>
			</article>
		);
	}

	return (
		<section className="rounded-2xl border border-border bg-card p-5 md:p-6">
			<div className="flex items-center justify-between gap-3">
				<div>
					<h2 className="text-xl font-semibold">Saved Beans</h2>
					<p className="text-sm text-muted-foreground">
						{savedBeans.length} bean{savedBeans.length === 1 ? "" : "s"}
					</p>
				</div>
			</div>

			{savedBeans.length === 0 ? (
				<p className="mt-4 rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
					No beans saved yet. Complete the flow above to add your first bean.
				</p>
			) : (
				<div className="mt-4 grid grid-cols-1 gap-3">
					{savedBeans.map((bean) => (
						<SavedBeanCard
							bean={bean}
							key={bean.id ?? `${bean.name}-${bean.brand}`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
