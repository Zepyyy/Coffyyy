import { useLiveQuery } from "dexie-react-hooks";
import { Check, CircleSmall } from "lucide-react";
import { type ChangeEvent, type MouseEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { addBean } from "@/db/crud/add";
import { db } from "@/db/db";
import { buildBeanSuggestions } from "@/lib/beanSuggestions";

type BeanForm = {
	name: string;
	rating: number;
	status: "Excellent" | "Good" | "Mid" | "Horrible" | "New";
	tastingNotes: string;
	dominantNote: string;
	roastLevel: string;
	origin: string;
	process: "Washed" | "Natural" | "Honey";
	variety: string;
	brand: string;
	botanic: "Arabica" | "Robusta";
	designation: "Pure Origin" | "Blend";
	flavors: string;
};

type SingleSuggestionField =
	| "name"
	| "brand"
	| "status"
	| "dominantNote"
	| "roastLevel"
	| "process"
	| "botanic"
	| "designation";
type MultiSuggestionField = "origin" | "flavors" | "tastingNotes" | "variety";

const INITIAL_FORM: BeanForm = {
	name: "",
	rating: 0,
	status: "New",
	tastingNotes: "",
	dominantNote: "",
	roastLevel: "",
	origin: "",
	process: "Washed",
	variety: "",
	brand: "",
	botanic: "Arabica",
	designation: "Pure Origin",
	flavors: "",
};

const STEPS = [
	{
		title: "Origin & Roast",
		description: "Enter bean Name, Roast profile and origin.",
	},
	{
		title: "Variety & Details",
		description: "Pick variety and details",
	},
	{
		title: "Beans' Flavor Profile",
		description: "Inherent flavors and aromas of the coffee bean.",
	},
	{
		title: "Review",
		description: "Check everything before saving.",
	},
] as const;

const SAVE_MESSAGES = [
	"Logged! ☕ Your palate thanks you.",
	"Bean immortalized. The coffee gods are pleased.",
	"Saved to the sacred bean archive.",
	"Another one for the collection. Legend.",
	"Catalogued with love. Next cup awaits.",
	"Noted. Your future self will thank you.",
	"A fine addition to the archive.",
	"Delicious. Documented. Done.",
	"Saved! May your next cup be even better.",
];

function parseList(value: string) {
	return value
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);
}

function findSuggestionMatch(value: string, suggestions: Array<string>) {
	return suggestions.find(
		(suggestion) =>
			suggestion.toLocaleLowerCase() === value.trim().toLocaleLowerCase(),
	);
}

function selectedFromListInput(input: string, suggestions: Array<string>) {
	const suggestionByKey = new Map(
		suggestions.map((suggestion) => [
			suggestion.toLocaleLowerCase(),
			suggestion,
		]),
	);

	return parseList(input)
		.map((item) => suggestionByKey.get(item.toLocaleLowerCase()))
		.filter((item): item is string => Boolean(item));
}

function StepPill({
	index,
	active,
	title,
}: {
	index: number;
	active: boolean;
	title: string;
}) {
	return (
		<div
			className={[
				"rounded-xl border px-3 py-2 text-xs md:text-sm transition-colors",
				active
					? "border-primary/40 bg-primary/10 text-foreground"
					: "border-border/70 bg-background text-muted-foreground",
			].join(" ")}
		>
			<p className="font-semibold">
				{index + 1}. {title}
			</p>
		</div>
	);
}

function FieldLabel({ title, hint }: { title: string; hint?: string }) {
	return (
		<div className="flex items-baseline justify-between gap-3">
			<p className="text-sm font-semibold">{title}</p>
			{hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
		</div>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border border-border/70 bg-background p-3">
			<p className="text-xs uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<p className="mt-1 text-sm font-medium">{value || "-"}</p>
		</div>
	);
}

export default function BeansDB() {
	const [form, setForm] = useState<BeanForm>(INITIAL_FORM);
	const [status, setStatus] = useState<string>("");
	const [isSaving, setIsSaving] = useState(false);
	const [step, setStep] = useState<number>(0);

	const beans = useLiveQuery(async () => db.Beans.toArray(), []);

	const suggestions = useMemo(() => buildBeanSuggestions(beans ?? []), [beans]);

	const selectedBrand =
		findSuggestionMatch(form.brand, suggestions.brands) ?? "";
	const selectedProcesses =
		findSuggestionMatch(form.process, suggestions.processes) ?? "";
	const selectedBotanics =
		findSuggestionMatch(form.botanic, suggestions.botanics) ?? "";
	const selectedDesignations =
		findSuggestionMatch(form.designation, suggestions.designations) ?? "";

	const selectedOrigins = selectedFromListInput(
		form.origin,
		suggestions.origins,
	);
	const selectedVarieties = selectedFromListInput(
		form.variety,
		suggestions.varieties,
	);
	const selectedDominantNote =
		findSuggestionMatch(form.dominantNote, suggestions.dominantNotes) ?? "";
	const selectedFlavors = selectedFromListInput(
		form.flavors,
		suggestions.flavors,
	);
	const selectedTastingNotes = selectedFromListInput(
		form.tastingNotes,
		suggestions.tastingNotes,
	);

	const progress = ((step + 1) / STEPS.length) * 100;
	const canGoNext =
		step === 0 ? form.name.trim().length > 0 : step < STEPS.length - 1;

	const setField =
		(field: keyof BeanForm) => (event: ChangeEvent<HTMLInputElement>) => {
			setForm((current) => ({ ...current, [field]: event.target.value }));
		};

	function setSingleFromToggle(
		field: SingleSuggestionField,
		suggestionsForField: Array<string>,
		value: string,
	) {
		setForm((current) => {
			if (value) return { ...current, [field]: value };
			const currentMatch = findSuggestionMatch(
				current[field],
				suggestionsForField,
			);
			if (!currentMatch) return current;
			return { ...current, [field]: "" };
		});
	}

	function setListFromToggle(
		field: MultiSuggestionField,
		suggestionsForField: Array<string>,
		values: Array<string>,
	) {
		setForm((current) => ({
			...current,
			[field]: [
				...parseList(current[field]).filter(
					(item) => !findSuggestionMatch(item, suggestionsForField),
				),
				...values,
			].join(", "),
		}));
	}

	function clearField(field: MultiSuggestionField) {
		setForm((current) => ({ ...current, [field]: "" }));
	}

	async function saveBean(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		if (step !== 3) return;

		setIsSaving(true);
		setStatus("");
		try {
			const roast = Number(form.roastLevel);

			await addBean({
				name: form.name,
				brand: form.brand,
				rating: form.rating,
				status: form.status,
				process: form.process,
				botanic: form.botanic,
				designation: form.designation,
				origin: parseList(form.origin),
				variety: parseList(form.variety),
				roastLevel: Number.isFinite(roast) ? roast : -1,
				dominantNote: form.dominantNote,
				flavors: parseList(form.flavors),
				tastingNotes: parseList(form.tastingNotes),
				finished: false,
			});
			setForm(INITIAL_FORM);
			setStep(0);
			const msg =
				SAVE_MESSAGES[Math.floor(Math.random() * SAVE_MESSAGES.length)];
			setStatus(msg);
		} catch {
			setStatus("Save failed.");
		} finally {
			setIsSaving(false);
		}
	}

	function goBack() {
		if (step > 0) setStep((current) => current - 1);
	}

	function goNext(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		if (step < STEPS.length - 1 && canGoNext) setStep((current) => current + 1);
	}

	return (
		<div className="mx-auto w-full max-w-4xl space-y-6">
			<section className="flex min-h-[70vh] w-full flex-col rounded-2xl border border-border bg-card">
				<div className="border-b border-border/70 p-5 md:p-6">
					<div className="flex flex-col gap-3">
						<h1 className="text-2xl font-semibold md:text-3xl">Beans</h1>
						{progress} %
						<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full bg-primary transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
							{STEPS.map((item, index) => (
								<div key={item.title} className="relative">
									<StepPill
										key={item.title}
										index={index}
										active={index === step}
										title={item.title}
									/>
									{index < step ? (
										<span className="text-primary-foreground absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 rounded-full px-1 py-px">
											<Check className="w-4 h-4" />
										</span>
									) : (
										<span className="text-primary absolute right-2 top-1/2 -translate-y-1/2 bg-primary/15 rounded-full px-1 py-px">
											<CircleSmall className="w-4 h-4" />
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>

				<form className="flex min-h-0 flex-1 flex-col" onSubmit={saveBean}>
					<div className="flex-1 space-y-5 overflow-y-auto p-5 md:p-6">
						<div className="space-y-1">
							<p className="text-lg font-semibold">{STEPS[step].title}</p>
							<p className="text-sm text-muted-foreground">
								{STEPS[step].description}
							</p>
						</div>
						{step === 0 && (
							<div className="space-y-5">
								<div className="space-y-2">
									<FieldLabel title="Bean name" hint="Required" />
									<input
										className="h-16 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Ex: El Paraiso - Red Berries"
										value={form.name}
										onChange={setField("name")}
										required
									/>
								</div>
								<div className="space-y-2">
									<FieldLabel title="Roaster" hint="Single select available" />
									{suggestions.brands.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="single"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedBrand}
												defaultValue={form.brand[1]}
												onValueChange={(value) =>
													setSingleFromToggle(
														"brand",
														suggestions.brands,
														value,
													)
												}
											>
												{suggestions.brands.map((brand) => (
													<ToggleGroupItem
														key={brand}
														value={brand}
														color="redColored"
														className="px-4"
													>
														{brand}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Brand"
										value={form.brand}
										onChange={setField("brand")}
									/>
								</div>

								<div className="space-y-2">
									<FieldLabel title="Roast level" hint="1 to 10" />
									<input
										type="number"
										min={1}
										max={10}
										className="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm"
										placeholder="Roast level"
										value={form.roastLevel}
										onChange={setField("roastLevel")}
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<FieldLabel title="Origin" hint="Multi select available" />
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => clearField("origin")}
										>
											Clear
										</Button>
									</div>
									{suggestions.origins.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="multiple"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedOrigins}
												onValueChange={(values) =>
													setListFromToggle(
														"origin",
														suggestions.origins,
														values,
													)
												}
											>
												{suggestions.origins.map((origin) => (
													<ToggleGroupItem
														key={origin}
														value={origin}
														color="yellowColored"
														className="px-4"
													>
														{origin}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Origin (comma separated)"
										value={form.origin}
										onChange={setField("origin")}
									/>
								</div>
							</div>
						)}
						{step === 1 && (
							<div className="space-y-5">
								<div className="space-y-2">
									{suggestions.processes.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="single"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedProcesses}
												onValueChange={(value) =>
													setSingleFromToggle(
														"process",
														suggestions.processes,
														value,
													)
												}
											>
												{suggestions.processes.map((process) => (
													<ToggleGroupItem
														key={process}
														value={process}
														color="yellowColored"
														className="px-4"
													>
														{process}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Process (comma separated)"
										value={form.process}
										onChange={setField("process")}
									/>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<FieldLabel title="Variety" hint="Multi select available" />
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => clearField("variety")}
										>
											Clear
										</Button>
									</div>
									{suggestions.varieties.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="multiple"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedVarieties}
												onValueChange={(values) =>
													setListFromToggle(
														"variety",
														suggestions.varieties,
														values,
													)
												}
											>
												{suggestions.varieties.map((variety) => (
													<ToggleGroupItem
														key={variety}
														value={variety}
														color="greenColored"
														className="px-4"
													>
														{variety}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Variety (comma separated)"
										value={form.variety}
										onChange={setField("variety")}
									/>
								</div>
								<div className="space-y-2">
									{suggestions.designations.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="single"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedDesignations}
												onValueChange={(value) =>
													setSingleFromToggle(
														"designation",
														suggestions.designations,
														value,
													)
												}
											>
												{suggestions.designations.map((designation) => (
													<ToggleGroupItem
														key={designation}
														value={designation}
														color="yellowColored"
														className="px-4"
													>
														{designation}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Designation"
										value={form.designation}
										onChange={setField("designation")}
									/>
								</div>
								<div className="space-y-2">
									{suggestions.botanics.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="single"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedBotanics}
												onValueChange={(value) =>
													setSingleFromToggle(
														"botanic",
														suggestions.botanics,
														value,
													)
												}
											>
												{suggestions.botanics.map((botanic) => (
													<ToggleGroupItem
														key={botanic}
														value={botanic}
														color="yellowColored"
														className="px-4"
													>
														{botanic}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Botanic"
										value={form.botanic}
										onChange={setField("botanic")}
									/>
								</div>
							</div>
						)}

						{step === 2 && (
							<div className="space-y-5">
								<div className="space-y-2">
									<FieldLabel
										title="Dominant note"
										hint="Single select available"
									/>
									{suggestions.dominantNotes.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="single"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedDominantNote}
												onValueChange={(value) =>
													setSingleFromToggle(
														"dominantNote",
														suggestions.dominantNotes,
														value,
													)
												}
											>
												{suggestions.dominantNotes.map((note) => (
													<ToggleGroupItem
														key={note}
														value={note}
														color="blueColored"
														className="px-4"
													>
														{note}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Dominant note"
										value={form.dominantNote}
										onChange={setField("dominantNote")}
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<FieldLabel title="Flavors" hint="Multi select available" />
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => clearField("flavors")}
										>
											Clear
										</Button>
									</div>
									{suggestions.flavors.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="multiple"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedFlavors}
												onValueChange={(values) =>
													setListFromToggle(
														"flavors",
														suggestions.flavors,
														values,
													)
												}
											>
												{suggestions.flavors.map((flavor) => (
													<ToggleGroupItem
														key={flavor}
														value={flavor}
														color="purpleColored"
														className="px-4"
													>
														{flavor}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Flavors (comma separated)"
										value={form.flavors}
										onChange={setField("flavors")}
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<FieldLabel
											title="Tasting notes"
											hint="Multi select available"
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => clearField("tastingNotes")}
										>
											Clear
										</Button>
									</div>
									{suggestions.tastingNotes.length > 0 && (
										<div className="rounded-lg border border-border/70 bg-muted/40 p-4">
											<ToggleGroup
												type="multiple"
												size="lg"
												spacing={2}
												className="w-full flex-wrap justify-center"
												value={selectedTastingNotes}
												onValueChange={(values) =>
													setListFromToggle(
														"tastingNotes",
														suggestions.tastingNotes,
														values,
													)
												}
											>
												{suggestions.tastingNotes.map((note) => (
													<ToggleGroupItem
														key={note}
														value={note}
														color="blueColored"
														className="px-4"
													>
														{note}
													</ToggleGroupItem>
												))}
											</ToggleGroup>
										</div>
									)}
									<input
										className="h-11 w-full rounded-lg border border-border/70 bg-background px-4 text-sm text-muted-foreground focus:text-foreground"
										placeholder="Tasting notes (comma separated)"
										value={form.tastingNotes}
										onChange={setField("tastingNotes")}
									/>
								</div>
							</div>
						)}

						{step === 3 && (
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
									<SummaryRow label="Name" value={form.name} />
									<SummaryRow label="Brand" value={form.brand} />
									<SummaryRow label="Process" value={form.process} />
									<SummaryRow label="Origin" value={form.origin} />
									<SummaryRow label="Variety" value={form.variety} />
									<SummaryRow label="Botanic" value={form.botanic} />
									<SummaryRow label="Designation" value={form.designation} />
									<SummaryRow label="Roast" value={form.roastLevel} />
									<SummaryRow label="Dominant note" value={form.dominantNote} />
									<SummaryRow label="Flavors" value={form.flavors} />
									<SummaryRow label="Tasting notes" value={form.tastingNotes} />
								</div>
								{status && (
									<p
										key={status}
										className="text-sm text-muted-foreground animate-fade-slide-up"
									>
										{status}
									</p>
								)}
							</div>
						)}
					</div>

					<div className="sticky bottom-0 border-t border-border/70 bg-card/95 p-4 backdrop-blur md:p-5">
						<div className="mx-auto flex w-full max-w-4xl gap-3">
							<Button
								type="button"
								size="lg"
								variant="outline"
								onClick={goBack}
								disabled={step === 0 || isSaving}
								className="min-h-12 flex-1"
							>
								Back
							</Button>

							{step < 3 ? (
								<Button
									type="button"
									size="lg"
									onClick={goNext}
									disabled={!canGoNext || isSaving}
									className="min-h-12 flex-2"
								>
									Next
								</Button>
							) : (
								<Button
									type="submit"
									size="lg"
									disabled={isSaving}
									className="min-h-12 flex-2"
								>
									{isSaving ? "Saving..." : "Save bean"}
								</Button>
							)}
						</div>
					</div>
				</form>
			</section>
		</div>
	);
}
