import { useState } from "react";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type SwatchToken = {
	name: string;
	bgClass: string;
	textClass?: string;
	borderClass?: string;
};

const SEMANTIC_SWATCHES: SwatchToken[] = [
	{
		name: "background",
		bgClass: "bg-background",
		borderClass: "border-border",
	},
	{
		name: "background-light",
		bgClass: "bg-background-light",
		borderClass: "border-border",
	},
	{ name: "foreground", bgClass: "bg-foreground" },
	{ name: "card", bgClass: "bg-card", borderClass: "border-border" },
	{ name: "primary", bgClass: "bg-primary" },
	{
		name: "primary-100",
		bgClass: "bg-primary-100",
		textClass: "text-foreground",
	},
	{
		name: "primary-200",
		bgClass: "bg-primary-200",
		textClass: "text-foreground",
	},
	{
		name: "primary-700",
		bgClass: "bg-primary-700",
		textClass: "text-primary-foreground",
	},
	{
		name: "primary-800",
		bgClass: "bg-primary-800",
		textClass: "text-primary-foreground",
	},
	{ name: "muted", bgClass: "bg-muted", borderClass: "border-border" },
	{ name: "accent", bgClass: "bg-accent", borderClass: "border-border" },
	{ name: "destructive", bgClass: "bg-destructive", textClass: "text-white" },
];

const TAG_SWATCHES: SwatchToken[] = [
	{
		name: "tag-teal-900",
		bgClass: "bg-tag-teal-900",
		textClass: "text-tag-teal-100",
	},
	{
		name: "tag-teal-100",
		bgClass: "bg-tag-teal-100",
		textClass: "text-tag-teal-900",
	},
	{
		name: "tag-green-900",
		bgClass: "bg-tag-green-900",
		textClass: "text-tag-green-100",
	},
	{
		name: "tag-green-100",
		bgClass: "bg-tag-green-100",
		textClass: "text-tag-green-900",
	},
	{
		name: "tag-blue-900",
		bgClass: "bg-tag-blue-900",
		textClass: "text-tag-blue-100",
	},
	{
		name: "tag-blue-100",
		bgClass: "bg-tag-blue-100",
		textClass: "text-tag-blue-900",
	},
	{
		name: "tag-yellow-900",
		bgClass: "bg-tag-yellow-900",
		textClass: "text-tag-yellow-100",
	},
	{
		name: "tag-yellow-100",
		bgClass: "bg-tag-yellow-100",
		textClass: "text-tag-yellow-900",
	},
	{
		name: "tag-red-900",
		bgClass: "bg-tag-red-900",
		textClass: "text-tag-red-100",
	},
	{
		name: "tag-red-100",
		bgClass: "bg-tag-red-100",
		textClass: "text-tag-red-900",
	},
	{
		name: "tag-purple-900",
		bgClass: "bg-tag-purple-900",
		textClass: "text-tag-purple-100",
	},
	{
		name: "tag-purple-100",
		bgClass: "bg-tag-purple-100",
		textClass: "text-tag-purple-900",
	},
	{
		name: "tag-orange-900",
		bgClass: "bg-tag-orange-900",
		textClass: "text-tag-orange-100",
	},
	{
		name: "tag-orange-100",
		bgClass: "bg-tag-orange-100",
		textClass: "text-tag-orange-900",
	},
];

function SwatchCard({ name, bgClass, textClass, borderClass }: SwatchToken) {
	return (
		<div className="rounded-xl border border-border bg-card/50 p-3">
			<div
				className={`h-16 w-full rounded-lg border ${borderClass ?? "border-transparent"} ${bgClass}`}
			/>
			<div className="mt-2 space-y-1">
				<p className="font-Mono text-xs text-muted-foreground">{name}</p>
				<p
					className={`font-Mono text-[11px] ${textClass ?? "text-foreground"}`}
				>
					{textClass ?? "text-foreground"}
				</p>
				<p className="font-Mono text-[11px] text-muted-foreground">{bgClass}</p>
			</div>
		</div>
	);
}

function Section({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-2xl border border-border bg-background-light/60 p-5 md:p-6">
			<div className="mb-4">
				<h2 className="font-News text-2xl md:text-3xl text-primary-800 dark:text-primary-100">
					{title}
				</h2>
				{description ? (
					<p className="mt-1 text-sm md:text-base text-muted-foreground">
						{description}
					</p>
				) : null}
			</div>
			{children}
		</section>
	);
}

export default function DesignSystem() {
	const [togglePressed, setTogglePressed] = useState(false);
	const [viewMode, setViewMode] = useState("components");

	return (
		<div className="mx-auto max-w-6xl space-y-6">
			<header className="rounded-2xl border border-primary/20 bg-primary-700/10 p-5 md:p-6">
				<p className="font-Mono text-xs md:text-sm uppercase tracking-[0.18em] text-primary-800 dark:text-primary-100/90">
					Coffyyy internal
				</p>
				<h1 className="mt-1 font-News text-4xl md:text-5xl leading-none text-primary-800 dark:text-primary-100">
					Design System
				</h1>
				<p className="mt-3 max-w-3xl text-sm md:text-base text-muted-foreground">
					Living reference for tokens, UI primitives, and visual rhythm. Add new
					colors, components, and usage examples here as the app grows.
				</p>
			</header>

			<Section
				title="Core Colors"
				description="Semantic colors used by the application shell and components."
			>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{SEMANTIC_SWATCHES.map((token) => (
						<SwatchCard key={token.name} {...token} />
					))}
				</div>
			</Section>

			<Section
				title="Tag Palette"
				description="Accent colors used in tags, filters, and statuses."
			>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{TAG_SWATCHES.map((token) => (
						<SwatchCard key={token.name} {...token} />
					))}
				</div>
			</Section>

			<Section
				title="Typography"
				description="Quick visual check of families used in the interface."
			>
				<div className="space-y-3">
					<p className="font-News text-4xl leading-none">Newsreader display</p>
					<p className="font-Bricolage text-xl">Bricolage body copy</p>
					<p className="font-Recursive text-lg">Recursive utility text</p>
					<p className="font-Mono text-sm uppercase tracking-[0.16em]">
						JetBrains mono labels
					</p>
				</div>
			</Section>

			<Section
				title="Components"
				description="Live examples of your reusable primitives."
			>
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<div className="space-y-4 rounded-xl border border-border bg-background p-4">
						<p className="font-Mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
							Buttons
						</p>
						<div className="flex flex-wrap items-center gap-2">
							<Button>Default</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="add">Add</Button>
							<Button variant="destructive">Delete</Button>
							<Button variant="link">Link style</Button>
						</div>
					</div>

					<div className="space-y-4 rounded-xl border border-border bg-background p-4">
						<p className="font-Mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
							Tags
						</p>
						<div className="flex flex-wrap items-center gap-2">
							<Tag variant="default" text="Default" />
							<Tag variant="light" text="Light" />
							<Tag variant="greenColored" text="Green" />
							<Tag variant="yellowColored" text="Yellow" />
							<Tag variant="blueColored" text="Blue" />
							<Tag variant="redColored" text="Red" />
							<Tag variant="purpleColored" text="Purple" />
							<Tag variant="orangeColored" text="Orange" />
						</div>
					</div>

					<div className="space-y-4 rounded-xl border border-border bg-background p-4">
						<p className="font-Mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
							Toggle
						</p>
						<Toggle
							pressed={togglePressed}
							onPressedChange={setTogglePressed}
							color="greenColored"
							aria-label="Sample toggle"
						>
							{togglePressed ? "Enabled" : "Disabled"}
						</Toggle>
					</div>

					<div className="space-y-4 rounded-xl border border-border bg-background p-4">
						<p className="font-Mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
							Toggle Group
						</p>
						<ToggleGroup
							type="single"
							value={viewMode}
							onValueChange={(value) => {
								if (value) setViewMode(value);
							}}
							spacing={2}
							color="purpleColored"
						>
							<ToggleGroupItem value="components">Components</ToggleGroupItem>
							<ToggleGroupItem value="colors">Colors</ToggleGroupItem>
							<ToggleGroupItem value="type">Type</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>
			</Section>

			<Section
				title="Composition Sandbox"
				description="A quick interaction zone to evaluate spacing, borders, and contrast combinations."
			>
				<div className="rounded-xl border border-primary/30 bg-card p-4">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="font-News text-2xl text-primary-800 dark:text-primary-100">
								Sample Card Block
							</p>
							<p className="text-sm text-muted-foreground">
								Use this area to drop new components and compare them in
								context.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Tag variant="blueColored" text="Info" />
							<Button size="sm">Primary action</Button>
						</div>
					</div>
					<Separator className="my-4" />
					<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
						<div className="rounded-lg border border-border bg-background p-3 text-sm">
							Surface A
						</div>
						<div className="rounded-lg border border-primary/20 bg-primary-700/10 p-3 text-sm">
							Surface B
						</div>
						<div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
							Surface C
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
}
